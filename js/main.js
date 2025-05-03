// Mobile Navigation
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('show');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function() {
        if (document.querySelector('nav ul').classList.contains('show')) {
            document.querySelector('nav ul').classList.remove('show');
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form Validation
if (document.getElementById('contactForm')) {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // تحقق محسن من البيانات
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        const isEnglish = localStorage.getItem('language') === 'en';
        
        // التحقق من صحة البريد الإلكتروني
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert(isEnglish ? 'Please enter a valid email address.' : 'الرجاء إدخال بريد إلكتروني صحيح.');
            return;
        }
        
        // التحقق من رقم الهاتف
        const phoneRegex = /^[\d\s+\-()]{8,}$/;
        if (!phoneRegex.test(phone)) {
            alert(isEnglish ? 'Please enter a valid phone number.' : 'الرجاء إدخال رقم هاتف صحيح.');
            return;
        }
        
        if(name && email && phone && subject && message) {
            alert(isEnglish ? 'Thank you for contacting us. We will get back to you as soon as possible.' : 'شكراً لتواصلكم معنا، سنقوم بالرد عليكم في أقرب وقت ممكن.');
            this.reset();
        } else {
            alert(isEnglish ? 'Please fill in all required fields.' : 'الرجاء ملء جميع الحقول المطلوبة.');
        }
    });
}

// Scroll Animation
function animateOnScroll() {
    const elements = document.querySelectorAll('.section, .feature-card, .category-card, .certificate-item, .team-member, .testimonial-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if(elementPosition < screenPosition) {
            element.classList.add('fade-in');
        }
    });
}

// Initial animation check
animateOnScroll();

// Check on scroll
window.addEventListener('scroll', animateOnScroll);

// وظيفة تبديل اللغة
function initializeLanguageToggle() {
    const languageToggle = document.getElementById('languageToggle');
    const htmlElement = document.documentElement;
    
    // تحقق من اللغة المحفوظة
    const savedLanguage = localStorage.getItem('language') || 'ar';
    setLanguage(savedLanguage);
    
    languageToggle.addEventListener('click', () => {
        const currentLanguage = localStorage.getItem('language') || 'ar';
        const newLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
        setLanguage(newLanguage);
    });
}

function setLanguage(language) {
    localStorage.setItem('language', language);
    const htmlElement = document.documentElement;
    
    // تعيين اتجاه النص
    htmlElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    htmlElement.setAttribute('lang', language);
    
    // تحديث جميع العناصر التي تحتوي على ترجمة
    document.querySelectorAll('[data-en]').forEach(element => {
        const arText = element.textContent;
        const enText = element.getAttribute('data-en');
        element.textContent = language === 'ar' ? arText : enText;
        
        if (element.hasAttribute('placeholder')) {
            const arPlaceholder = element.getAttribute('placeholder');
            const enPlaceholder = element.getAttribute('data-en-placeholder');
            element.setAttribute('placeholder', language === 'ar' ? arPlaceholder : enPlaceholder);
        }
    });
    
    // تحديث نص زر تبديل اللغة
    const langButton = document.getElementById('languageToggle');
    if (langButton) {
        langButton.querySelector('.lang-text').textContent = language === 'ar' ? 'English' : 'عربي';
    }
}

// تهيئة وظيفة تبديل اللغة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initializeLanguageToggle);

// وظيفة تبديل الثيم
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const icon = themeToggle.querySelector('i');
    
    // تحقق من الثيم المحفوظ
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = localStorage.getItem('theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });
    
    function setTheme(theme) {
        localStorage.setItem('theme', theme);
        htmlElement.setAttribute('data-theme', theme);
        
        // تغيير الأيقونة
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

// تهيئة وظيفة تبديل الثيم عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    initializeThemeToggle();
});