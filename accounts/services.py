from .models import EmailVerificationCode
from django.core.mail import send_mail
from django.conf import settings
from secrets import randbelow
from django.utils.timezone import now
from datetime import timedelta


def send_verification_code(user):
    code = str(randbelow(900000) + 100000)
    expires_at = now() + timedelta(minutes=10)
    verification, created = EmailVerificationCode.objects.update_or_create(
        user=user, 
        defaults={
        'code': code,
        'expires_at': expires_at,
    })
  
    send_mail(
        subject="UstoHub email verification",
        message = (
            f"Hello {user.username},\n\n"
            f"Your UstoHub verification code is: {code}\n"
            "This code expires in 10 minutes.\n\n"
            "If you did not create this account, ignore this email."
        ),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email]
    )
    return verification