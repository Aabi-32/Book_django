from django.urls import path
from .views import UserRegisterationView ,LoginView , RefreshTokenView , UserProfileView

urlpatterns =[
    path('rigester/', UserRegisterationView.as_view(), name='rigester' ),
    path('login/',   LoginView.as_view() , name ='Login'),
    path('refresh/', RefreshTokenView.as_view(), name= 'refresh'),
    path('Profile/', UserProfileView.as_view(), name= 'Profile' )

]