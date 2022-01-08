
from django.urls import path

from . import views

app_name ="job"

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("postjob", views.postjob, name="postjob"),
    path("apply/<job_id>", views.apply, name="apply"),
    path("job/<job_id>", views.job, name="job"),
    path("close/<job_id>", views.close, name="close"),
    path("myjobs/<str:username>", views.myjobs, name="myjobs"),
    
    
    # API Route
    path("all", views.all, name="all"),
    path("category/<str:name>", views.category, name="category"),
    path("city/<str:name>", views.city, name="city"),
]




