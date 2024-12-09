from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login 
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import logout




# Função de login
def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('index')  # Redireciona para a URL com nome 'index'
        else:
            messages.error(request, 'Usuário ou senha inválidos.')
    return render(request, 'login.html')

# Função de índice (tela principal)
@login_required
def index_view(request):
    return render(request, 'index.html')

def register_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        confirm_password = request.POST['confirm_password']

        if password != confirm_password:
            messages.error(request, 'As senhas não coincidem.')
            return redirect('register')

        if User.objects.filter(username=username).exists():
            messages.error(request, 'Este nome de usuário já está em uso.')
            return redirect('register')

        try:
            user = User.objects.create_user(username=username, password=password)
            user.save()
            messages.success(request, 'Conta criada com sucesso! Faça login.')
            return redirect('login')
        except Exception as e:
            messages.error(request, f'Erro ao criar conta: {str(e)}')

    return render(request, 'register.html')

def logout_view(request):
    logout(request)  # Faz o logout do usuário
    return redirect('login')