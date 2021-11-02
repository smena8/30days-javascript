"""thirtydaysjs URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('gallery.urls'), name='Gallery'),
    path('1/', include('day1.urls'), name='Day1'),
    path('2/', include('day2.urls'), name='Day2'),
    path('3/', include('day3.urls'), name='Day3'),
    path('4/', include('day4.urls'), name='Day4'),
    path('5/', include('day5.urls'), name='Day5'),
    path('6/', include('day6.urls'), name='Day6'),
    path('7/', include('day7.urls'), name='Day7'),
    path('8/', include('day8.urls'), name='Day8'),
    path('9/', include('day9.urls'), name='Day9'),
    path('10/', include('day10.urls'), name='Day10'),
    path('11/', include('day11.urls'), name='Day11'),
    path('12/', include('day12.urls'), name='Day12'),
    path('13/', include('day13.urls'), name='Day13'),
    path('14/', include('day14.urls'), name='Day14'),
    path('15/', include('day15.urls'), name='Day15'),
    path('16/', include('day16.urls'), name='Day16'),
    path('17/', include('day17.urls'), name='Day17'),
    path('18/', include('day18.urls'), name='Day18'),
    path('19/', include('day19.urls'), name='Day19'),
    path('20/', include('day20.urls'), name='Day20'),
    path('21/', include('day21.urls'), name='Day21'),
    path('22/', include('day22.urls'), name='Day22'),
    path('23/', include('day23.urls'), name='Day23'),
    path('24/', include('day24.urls'), name='Day24'),
    path('25/', include('day25.urls'), name='Day25'),
    path('26/', include('day26.urls'), name='Day26'),
    path('27/', include('day27.urls'), name='Day27'),
    path('28/', include('day28.urls'), name='Day28'),
    path('29/', include('day29.urls'), name='Day29'),
    path('30/', include('day30.urls'), name='Day30'),
]
