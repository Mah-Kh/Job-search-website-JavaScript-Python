from django.contrib import admin
from .models import User, Job, Apply

# Register your models here.
admin.site.register(User)
admin.site.register(Job)
admin.site.register(Apply)
