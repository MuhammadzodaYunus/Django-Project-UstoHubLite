def is_customer(user):
    if user.user_type == 'customer':
        return True
    
    return False
    
def is_approved_master(user):
    if user.user_type == 'master' and user.is_master_approved == True:
        return True
    
    return False
    