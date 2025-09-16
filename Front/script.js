// LÓGICA DO SELETOR DE TEMA
const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;

// Função para aplicar o tema
const applyTheme = (theme) => {
    if (theme === 'light') {
        body.classList.add('light-mode');
        themeSwitcher.checked = true;
    } else {
        body.classList.remove('light-mode');
        themeSwitcher.checked = false;
    }
};

// Verifica o tema salvo no localStorage ao carregar a página
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

// Adiciona o evento de clique no switcher
themeSwitcher.addEventListener('change', () => {
    const newTheme = themeSwitcher.checked ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
});
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.getElementById('password-toggle');

    if (passwordToggle) {
        passwordToggle.addEventListener('click', () => {
            // Verifica o tipo do input de senha
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Troca o ícone do olho
            passwordToggle.classList.toggle('fa-eye');
            passwordToggle.classList.toggle('fa-eye-slash');
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // Lógica para a barra de navegação inferior
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove a classe 'active' de todos os itens
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Adiciona a classe 'active' apenas no item clicado
            item.classList.add('active');
        });
    });

});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');

    form.addEventListener('submit', (e) => {
        if (password.value !== confirmPassword.value) {
            // Impede o envio do formulário
            e.preventDefault(); 
            
            // Alerta o usuário
            alert('As senhas não coincidem. Por favor, tente novamente.');
            
            // (Opcional) Limpa os campos de senha
            password.value = '';
            confirmPassword.value = '';
            password.focus();
        }
    });
});