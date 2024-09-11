from django.urls import path
from .views import getAll,getOne,postOne,checkAnswer
urlpatterns = [
    path("all/<str:cat>",getAll,name="ques-list"),
    path("one/",postOne,name="que-one"),
    path("one/<int:pk>/",getOne,name="ques-single"),
    path("check/<int:pk>/",checkAnswer,name="check-answer"),
]
