from django.shortcuts import render, redirect
from .forms import RepairRequestForm
from django.contrib.auth.decorators import login_required

@login_required
def repair_create_view(request):
    if request.method == 'POST':
        form = RepairRequestForm(request.POST)
        if form.is_valid():
            repair = form.save(commit=False)
            repair.customer = request.user
            repair.save()
            return redirect('register')
    else:
        form = RepairRequestForm()
    
    return render(request, 'repairs/repair_form.html', {'form': form})

