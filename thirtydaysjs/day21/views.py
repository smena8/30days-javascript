from django.shortcuts import render

# Create your views here.


def index(request):
    return render(request, 'day21/index.html', {'app_name': 'day21'})
