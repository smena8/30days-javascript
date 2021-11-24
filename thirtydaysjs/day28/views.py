from django.shortcuts import render

# Create your views here.


def index(request):
    return render(request, 'day28/index.html', {'app_name': 'day28'})
