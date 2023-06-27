from django.urls import path
from Home import views

urlpatterns = [
    
    path('',views.index,name = "Home"),
    path('check',views.check,name = "check"),
    path('login',views.login,name = "login"),
    path('signup',views.signup,name = "signup"),

]