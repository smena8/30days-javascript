from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, r'day1\index.html')
