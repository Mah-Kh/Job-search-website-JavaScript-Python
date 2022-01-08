from django.shortcuts import render

from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django import forms
from django.forms import ModelForm
from django.core.paginator import Paginator
import sys, json
from django.http import JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
import requests

# for uplad file
from django.conf import settings
from django.core.files.storage import FileSystemStorage


from .models import User, Job, Apply


# Create your views here.

class NewJob(forms.ModelForm):
    class Meta:
        model = Job
        fields = ['title', 'category', 'company', 'salary', 'city', 'description']


class selectCategory(forms.ModelForm):
    class Meta:
        model = Job
        fields = ['category']


class selectCity(forms.ModelForm):
    class Meta:
        model = Job
        fields = ['city']


class ApplyForm(forms.ModelForm):
    class Meta:
        model = Apply
        fields = ('description', 'document')


@login_required(login_url='job:login')
def postjob(request):
    if request.method == "POST":
        form = NewJob(request.POST)
        if form.is_valid():            
            job = form.save(commit=False)           
            job.sender = request.user
            job.save()
            return HttpResponseRedirect(reverse("job:index"))
             
            
    return render(request, "job/postjob.html", {
        "form": NewJob()
    })


def index(request):   
   return render(request, "job/index.html", {
       "categoryform": selectCategory(),
       "cityform": selectCity()
   })


def all(request): 
    jobs = Job.objects.all()       
    return JsonResponse([job.serialize() for job in jobs], safe=False)


def category(request, name):
    if name == 'All':
        jobs = Job.objects.all()
        return JsonResponse([job.serialize() for job in jobs], safe=False)
    elif name != 'All':
        category = name
        jobs = Job.objects.filter(category=category)
        return JsonResponse([job.serialize() for job in jobs], safe=False)


def city(request, name):
    print(type(name))
    if name == 'All':
        jobs = Job.objects.all()
        print(jobs)
        return JsonResponse([job.serialize() for job in jobs], safe=False)
    elif name != 'All':
        city = name.capitalize()
        jobs = Job.objects.filter(city=city)
        return JsonResponse([job.serialize() for job in jobs], safe=False)


@csrf_exempt
@login_required
def job(request, job_id):
    user = request.user
    job = Job.objects.get(id=job_id)
    employer = job.sender

    if request.method == 'POST':
        closejob_btn = request.POST.get('expired')
        if closejob_btn == "Close Job":
            if Job.objects.get(id=job_id).end_job == False:
                id = job_id 
                job_to_end = Job.objects.get(id=id)
                job_to_end.end_job = True
                job_to_end.save()

                test = job_to_end.end_job
                print(test)
                return render(request, "job/job.html", {
                "job": job,
                "message": "This job announcement is expired."
            })
       
            return render(request, "job/job.html", {
                "job": job
            })

    if request.method == 'GET':

        if job.end_job == False:
                if employer == user:
                    return render(request, "job/job.html", {
                        "job": job,                       
                        "employer": user
                    })
                else:
                    return render(request, "job/job.html", {
                        "job": job
                    }) 
        elif job.end_job == True:
            return render(request, "job/job.html", {
                "job": job,
                "message": "This job announcement is expired."
            }) 

# close job
@csrf_exempt
@login_required
def close(request, job_id):
    user = request.user
    job = Job.objects.get(pk=job_id)
    employer = job.sender
    if employer == user:
        job.end_job == True
        job.save()
        #test = job.end_job
        #print(test)

    return render(request, "job/job.html", {
                "job": job,
                #"expired": job
                "message": "This job announcement is expired."
            }) 
 



@csrf_exempt
@login_required
def apply(request, job_id):
    job = Job.objects.get(id=job_id)
    context = {}
    if request.method == 'POST':
        sender = job.sender
        title = Job.objects.get(id=job_id).title

        form = ApplyForm(request.POST, request.FILES)
        if form.is_valid():
            uploaded_file = request.FILES['document']
            fs = FileSystemStorage()
            name = fs.save(uploaded_file.name, uploaded_file)
            context['url'] = fs.url(name) 
            apply = form.save(commit=False)
            apply.job_id = job_id
            apply.job_title = job
            apply.employer = sender
            apply.employee = request.user 
            apply.save()
 
            return render(request, "job/apply.html", {
                "job": job,
                "form": form,
                "message": "You have successfully applied for this job."
            })

        return render(request, "job/index.html") 

    
    if request.method == "GET":
        form = ApplyForm()
        return render(request, "job/apply.html", {
        "job": job,
        "form": form
    }) 


@login_required
def myjobs(request, username):
    if request.method == "GET": 
        user = request.user
        username = user.username

        employer = Job.objects.filter(sender=user)
        employee = Apply.objects.filter(employee=user)
        applications = Apply.objects.filter(employer=user).order_by('-timestamp')
        jobs = Job.objects.filter(sender=user).order_by('-timestamp')
        applies = Apply.objects.filter(employee=user).order_by('-timestamp')
        recents = Job.objects.all().order_by('-timestamp')[:4]

        if user == employer:
            print("employer")
            return render(request, "job/apply.html", {
                "form": form
            }) 

        return render(request, "job/myjobs.html", {
        "employer": employer,
        "applications": applications,
        "employee": employee,
        "jobs": jobs,
        "applies": applies,
        "recents": recents
    }) 




def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("job:index"))
        else:
            return render(request, "job/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "job/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("job:index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "job/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save() 
    
        except IntegrityError:
            return render(request, "job/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("job:index"))
    else:
        return render(request, "job/register.html")