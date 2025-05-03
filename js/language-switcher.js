// Language Toggle
const langSwitcher = document.getElementById('langSwitcher');
let isEnglish = localStorage.getItem('language') === 'en';

// Function to update all translatable elements
function updateLanguage() {
    // Update page title
    const pageTitle = document.querySelector('title');
    if (pageTitle.dataset.en) {
        if (isEnglish) {
            document.title = pageTitle.dataset.en;
        } else {
            document.title = pageTitle.textContent || pageTitle.dataset.en;
        }
    }

    // Update all elements with data-en attribute
    document.querySelectorAll('[data-en]').forEach(element => {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            if (isEnglish) {
                element.placeholder = element.dataset.en;
            } else {
                element.placeholder = element.getAttribute('data-ar') || element.placeholder;
            }
        } else {
            if (isEnglish) {
                element.textContent = element.dataset.en;
            } else {
                element.textContent = element.getAttribute('data-ar') || element.textContent;
            }
        }
    });

    // Update HTML direction and lang attribute
    document.documentElement.lang = isEnglish ? 'en' : 'ar';
    document.documentElement.dir = isEnglish ? 'ltr' : 'rtl';

    // Update text alignment for specific elements
    document.querySelectorAll('.section-title, .testimonial-author').forEach(el => {
        el.style.textAlign = isEnglish ? 'left' : 'right';
    });

    // Save preference
    localStorage.setItem('language', isEnglish ? 'en' : 'ar');
}

// Initialize language
if (localStorage.getItem('language') === 'en') {
    isEnglish = true;
    updateLanguage();
}

// Toggle language on button click
langSwitcher.addEventListener('click', () => {
    isEnglish = !isEnglish;
    updateLanguage();
});

// Apply language on page load
document.addEventListener('DOMContentLoaded', updateLanguage);