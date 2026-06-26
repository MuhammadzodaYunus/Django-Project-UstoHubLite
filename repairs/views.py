from django.shortcuts import render, redirect, get_object_or_404
from .models import RepairRequest
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
            return redirect('repair_list')
    else:
        form = RepairRequestForm()
    
    return render(request, 'repairs/repair_form.html', {'form': form})

@login_required
def repair_list_view(request):
    repairs = RepairRequest.objects.filter(customer=request.user).order_by("-created_at")

    return render(request, 'repairs/repair_list.html', {'repairs': repairs})


@login_required
def repair_detail_view(request, pk):
    repair = get_object_or_404(RepairRequest, pk=pk, customer=request.user)

    return render(request, 'repairs/repair_detail.html', {'repair': repair})

@login_required
def repair_update_view(request, pk):
    repair = get_object_or_404(RepairRequest, pk=pk, customer=request.user)

    if request.method == 'POST':
        form = RepairRequestForm(request.POST, instance=repair)
        if form.is_valid():
            form.save()
            return redirect('repair_detail', pk=repair.pk)
    
    else:
        form = RepairRequestForm(instance=repair)

    return render(request, 'repairs/repair_form.html', {'form': form})


@login_required
def repair_delete_view(request, pk):
    repair = get_object_or_404(RepairRequest, pk=pk, customer=request.user)

    if request.method == 'POST':
        repair.delete()
        return redirect('repair_list')
    
    else:
        return render(request, 'repairs/repair_confirm_delete.html', {'repair': repair})