from rest_framework import serializers
from .models import CustomUser


class UserRegisterationSeriliazer(serializers.ModelSerializer):
    password2 = serializers.CharField( style={ 'input_type' :'password'}, write_only = True)
    class Meta:
        model = CustomUser
        fields = ['email', 'first_name' , 'last_name' , 'password' , 'password2']
        extra_kwargs= {
          'password' : {'write_only': True}
        }

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')

        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password doesn't match")
        else:
            return attrs
        
    def create(self, validate_data):
        validate_data.pop('password2')
        return CustomUser.objects.create_user(**validate_data)
    
class UserLoginSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(max_length=255)
  password = serializers.CharField(style ={'input_type': 'password'})
  class Meta:
    model = CustomUser
    fields = ['email', 'password']    

class UserProfileSeriliazer(serializers.ModelSerializer):
    
       class Meta:
         model = CustomUser
         fields = ['email', 'first_name', 'last_name',]   