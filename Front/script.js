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