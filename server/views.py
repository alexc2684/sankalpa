from django.shortcuts import render
from django.http import HttpResponse

# a function that returns an HTML view of the home page using HttpResponse
def index(request):
    return HttpResponse("<h1>Social Scheduler</h1>")
