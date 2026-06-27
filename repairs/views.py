from django.shortcuts import render, redirect, get_object_or_404
from .models import RepairRequest
from .forms import RepairRequestForm
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST

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

    query = request.GET.get('q', "").strip()
    category = request.GET.get('category', "").strip()
    urgency = request.GET.get('urgency', "").strip()
    status = request.GET.get('status', "").strip()

    if query:
        repairs = repairs.filter(title__icontains=query)

    if category:
        repairs = repairs.filter(category=category)

    if urgency:
        repairs = repairs.filter(urgency=urgency)

    if status:
        repairs = repairs.filter(status=status)

    context = {
    "repairs": repairs,
    "query": query,
    "selected_category": category,
    "selected_urgency": urgency,
    "selected_status": status,
    "category_choices": RepairRequest.CATEGORY_CHOICES,
    "urgency_choices": RepairRequest.URGENCY_CHOICES,
    "status_choices": RepairRequest.STATUS_CHOICES,
    }

    return render(request, 'repairs/repair_list.html', context=context)


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
    

@login_required
def professional_request_list_view(request):
    if request.user.user_type != 'master':
        return redirect('repair_list')
    
    repairs = RepairRequest.objects.filter(status='open').order_by('-created_at')
    return render(request, 'repairs/professional_request_list.html', {'repairs': repairs})


@login_required
@require_POST
def professional_accept_request_view(request, pk):
    if request.user.user_type != 'master':
        return redirect('repair_list')

    repair = get_object_or_404(RepairRequest, pk=pk, status="open", assigned_master__isnull=True)

    if repair:
        repair.assigned_master = request.user
        repair.status = "in_progress"
        repair.save()
        return redirect('professional_request_list')
    
        

@login_required
def professional_assigned_request_list_view(request):
    if request.user.user_type != 'master':
        return redirect('repair_list')
    
    repairs = RepairRequest.objects.filter(
        assigned_master=request.user, 
        status='in_progress').order_by('-created_at')

    return render(request, 'repairs/professional_assigned_request_list.html', {'repairs': repairs})