from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from .seriliazer import UserRegisterationSeriliazer , UserLoginSerializer , UserProfileSeriliazer

from rest_framework_simplejwt.tokens import RefreshToken
#from rest_framework.permissions import IsAuthenticated

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserRegisterationView(APIView):

    def post(self, request):
        
       seriliaser = UserRegisterationSeriliazer(data= request.data)
       seriliaser.is_valid(raise_exception = True)
       user =seriliaser.save()
       
       tokens = get_tokens_for_user(user)
       return Response({'tokens': tokens, 'msg':'the user is created'}, status = status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        seriliser = UserLoginSerializer(data = request.data)
        seriliser.is_valid(raise_exception= True)
        
        email = seriliser.validated_data['email']
        password = seriliser.validated_data['password']

        # Authenticate using your custom user model
        user = authenticate(username=email, password=password)
        
        if user:
            tokens = get_tokens_for_user(user)
            return Response({ 'tokens': tokens, 'msg': 'user logged in'})      
        

class RefreshTokenView(APIView):
    def post(self, request):
        refresh_token = request.data.get('refresh')

        if not refresh_token:
          return Response({'error': 'Refresh token is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            refresh = RefreshToken(refresh_token)
            new_token = str(refresh.access_token)
            return Response ( {"access": new_token})
        except Exception as e:
            return Response({'error': 'Invalid or expired refresh token'}, status=status.HTTP_401_UNAUTHORIZED)
            


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        print(f"DEBUG: Request user is -> {request.user}")
        seriliaser = UserProfileSeriliazer( request.user)
         #seriliaser.is_valid(raise_exception = True)
        return Response( seriliaser.data, status= status.HTTP_200_OK)
    
                    