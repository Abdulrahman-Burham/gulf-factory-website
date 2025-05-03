// Enhanced Theme Switcher
const themeSwitcher = document.getElementById('themeSwitcher');
let isDarkMode = localStorage.getItem('darkMode') === 'enabled';

// Check for system preference
if (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode = true;
    localStorage.setItem('darkMode', 'enabled');
}

// Apply saved theme
function applyTheme() {
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Initialize theme
applyTheme();

// Toggle theme on button click
themeSwitcher.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    applyTheme();
});

// Watch for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('darkMode')) {
        isDarkMode = e.matches;
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
        applyTheme();
    }
});