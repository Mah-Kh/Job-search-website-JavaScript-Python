# Final project 

Web Programming with Python and JavaScript

## JobSuche

This is a dynamic website, web application for post jobs, search jobs and apply for jobs. The main aim of this project is to practice the content of all lectures in this course, combine them and add some other features to make it more complex.
This web application utilize Django on the back-end and JavaScript on the front-end.
The back-end contains 2 models in addition of user model. 1) Class Job provides a model to save job informations. 2) Class Apply provides a model to save applicants informations.
There is 2 search boxes in homepage for searching jobs based on the category and citiy. This feature is created with 3 django functions (all, category, city). They are used as internal API and the JSON results of the search is presented by using JavaScript. 
In apply page there is a form to apply with a teaxtarea for writting application letter and an option to uplad CV in Pdf using django.core.files.storage. There is also another form which is pre-filled with the salary of the current job. By click on convert button an external API will run to recieve the current exchange of 1 USD into 1 EUR. After that the salary of the job is divided to the received data by using JavaScript in order to calculate and present the Salary based on USD. 
My Jobs page has four sections based on the users activities to show received applications where the user has post the job and he can see the uploaded files and applications data; a section for all jobs which user has post; a section for users who applied for jobs as well as the last 4 jobs posted. 
In job page users can see the job details and if the current user is the one who posted this job, he can end the job by clicking the close button. After that a message will be shown in this page and the apply button will be deactivated using JavaScript. This job will be removed from homepage as well.
This web application is mobile-responsive by using Bootstrap and scss.

```

## Table of contents

* models.py Contains class User, class Job, class Apply.
* urls.py Contains urlpatterns of all pathes.
* views.py Contains four forms (NewJob, selectCategory, selectCity, ApplyForm) as well as all functions.
* layout.html Contains general structure which is used in all pages. The nav tag has spesific menu items for the users who are signed in.
* index.html Contains two forms as search boxes to select job categoriey and job city. The result is shown dynamically using JavaScript.
* postjob.html Contains a form to post a job.
* apply.html Contains a form to apply for the job with upload file option. Another form is also presented and filled by the salary of the job and by click the button the salary is calculated to USD.
* myjobs.html  Contains four sections; to show the received applications for user who posted jobs; for all jobs that user has posted; for all jobs that user has applied for and to show the four recent posted jobs.
* job.html Contains details of the job and if the user has posted this job he can close the job. After that one message will be shown dynamically in this page and apply button will be deactivated.
* login.html Contains a form to login.
* register.html Contains a form to register.
* index.js Contains API that receives data from posted jobs and show the results of search in homepage based on category and city; calculated part to exchange salary; and deactivate apply button for expired jobs.
* style.scss Contains different css selectores and properties and media query to style for small screens.









