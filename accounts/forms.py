from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django import forms

from .models import User


class UserSignupForm(UserCreationForm):
    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "phone_number",
            "user_type",
            "password1",
            "password2",
        ]

class EmailVerificationForm(forms.Form):
    code = forms.CharField(min_length=6, max_length=6)

    def clean_code(self):
        code = self.cleaned_data["code"]

        if not code.isdigit():
            raise forms.ValidationError("Code must contain only numbers.")
        
        return code
    
class UserLoginForm(AuthenticationForm):
    pass