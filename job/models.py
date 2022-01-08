from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    pass


class Job(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(null=True, blank=True)
    company = models.CharField(max_length=150, null=True, blank=True)
    salary = models.IntegerField(blank=True, default=0)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name="job_sender")
    end_job = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    ALL = 'All'
    IT = 'IT'
    ENGINEERING  = 'Engineering'
    MANAGEMENT = 'Management'
    FINANCE = 'Finance'
    category = [
        (ALL, 'All'),
        (IT, 'IT'),
        (ENGINEERING, 'Engineering'),
        (MANAGEMENT, 'Management'),
        (FINANCE, 'Finance'),
    ]
    
    category = models.CharField(
        max_length=15,
        choices=category,
        default=ALL,
        null=True
    )

    ALL = 'All'
    BERLIN = 'Berlin'
    STUTTGART  = 'Stuttgart'
    FRANKFURT = 'Frankfurt'
    city = [
        (ALL, 'All'),
        (BERLIN, 'Berlin'),
        (STUTTGART, 'Stuttgart'),
        (FRANKFURT, 'Frankfurt'),
    ]
    
    city = models.CharField(
        max_length=15,
        choices=city,
        default=ALL,
        null=True
    )

   
    class Meta:
        ordering = ['-timestamp',]
    
    def serialize(self):
        return {
           "id": self.id,
            "title": self.title,
            "description": self.description,
            "company": self.company,
            "category": self.category,
            "city": self.city,
            "salary": self.salary,
            "timestamp": self.timestamp.strftime("%b %-d %Y, %-I:%M %p"),
            #"timestamp": self.timestamp.strftime("%b %#d %Y, %#I:%M %p"),
            "end_job": self.end_job,
        }


    def __str__(self):
        return f"{self.title}"



class Apply(models.Model):
    job_id = models.IntegerField(blank=True, null=True)
    job_title = models.ForeignKey(Job, on_delete=models.CASCADE, blank=True, null=True, related_name="apply_title")
    employer = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name="apply_employer")
    employee = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name="apply_employee")
    description = models.TextField(null=True, blank=True)
    document = models.FileField(upload_to='documents/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    timestamp = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return f"{self.job_title} applied by: {self.employee}"

