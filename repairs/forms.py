from django import forms
from .models import RepairRequest

class RepairRequestForm(forms.ModelForm):
    class Meta:
        model = RepairRequest
        fields = [
            'title',
            'description',
            'category',
            'urgency',
            'address',
        ]