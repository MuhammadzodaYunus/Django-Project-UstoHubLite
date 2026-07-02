from django.shortcuts import render, redirect
from .forms import UserSignupForm, EmailVerificationForm, UserLoginForm
from .services import send_verification_code
from .models import User, EmailVerificationCode
from django.utils import timezone
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from accounts.permissions import is_customer, is_approved_master
from django.contrib import messages

@login_required
def pending_approval_view(request):
    if is_customer(request.user):
        return redirect('repair_list')
    elif is_approved_master(request.user):
        return redirect('professional_request_list')
    elif request.user.user_type == 'master' and not is_approved_master(request.user):
        return render(request, 'accounts/approval_pending.html')
    else:
        return redirect('home')


def register_view(request):
    if request.method == 'POST':
        form = UserSignupForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()
            send_verification_code(user=user)
            messages.info(request, "We sent a verification code to your email.")
            request.session["pending_verification_user_id"] = user.id
            return redirect('verify_email')
    else:
        form = UserSignupForm()

    return render(request, 'accounts/register.html', {'form': form})


def verify_email_view(request):
    user_id = request.session.get("pending_verification_user_id")
    if not user_id:
        return redirect("register")

    user = User.objects.filter(id=user_id).first()

    if not user:
        request.session.pop("pending_verification_user_id", None)
        return redirect("register")

    if request.method == 'POST':
        form = EmailVerificationForm(request.POST)
        if form.is_valid():
            entered_code = form.cleaned_data["code"]
            verification = EmailVerificationCode.objects.filter(user=user).first()

            if not verification:
                form.add_error("code", "Verification code was not found.")

            elif verification.expires_at <= timezone.now():
                form.add_error("code", "This verification code has expired.")

            elif entered_code != verification.code:
                form.add_error("code", "The verification code is incorrect.")

            else:
                user.is_active = True
                user.save(update_fields=["is_active"])

                verification.delete()
                request.session.pop("pending_verification_user_id", None)

                login(request, user)
                messages.success(request, "Your email was verified successfully.")

                if is_customer(request.user):
                    return redirect('repair_list')
                elif is_approved_master(request.user):
                    return redirect('professional_request_list')
                elif request.user.user_type == 'master' and not is_approved_master(request.user):
                    messages.info(request, "Your professional account is waiting for admin approval.")
                    return redirect('approval_pending')
                            
    else:
        form = EmailVerificationForm()

    return render(request, 'accounts/verify_email.html', {'form': form, 'user': user})


def login_view(request):
    
    if request.method == 'POST':
        form = UserLoginForm(request=request, data=request.POST)

        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, "Signed in successfully.")
            if is_customer(request.user):
                return redirect('repair_list')
            elif is_approved_master(request.user):
                return redirect('professional_request_list')
            elif request.user.user_type == 'master' and not is_approved_master(request.user):
                messages.info(request, "Your professional account is waiting for admin approval.")
                return redirect('approval_pending')

    else:
        form = UserLoginForm()

    return render(request, 'accounts/login.html', {'form': form})

def logout_view(request):
    logout(request)
    messages.success(request, "Signed out successfully.")
    return redirect('login')