document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('languageToggle');
    const htmlElement = document.documentElement;
    
    // تحقق من اللغة المحفوظة
    const savedLanguage = localStorage.getItem('language') || 'ar';
    setLanguage(savedLanguage);
    
    // إضافة مستمع حدث للزر
    languageToggle.addEventListener('click', () => {
        const currentLanguage = localStorage.getItem('language') || 'ar';
        const newLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
        setLanguage(newLanguage);
    });
});

function setLanguage(language) {
    localStorage.setItem('language', language);
    const htmlElement = document.documentElement;
    
    // تعيين اتجاه النص واللغة
    htmlElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    htmlElement.setAttribute('lang', language);
    
    // تحديث جميع العناصر التي تحتوي على ترجمة
    document.querySelectorAll('[data-en]').forEach(element => {
        const arText = element.textContent;
        const enText = element.getAttribute('data-en');
        
        // تحديث النص
        element.textContent = language === 'ar' ? arText : enText;
        
        // تحديث النص البديل للصور إذا كان موجوداً
        if (element.hasAttribute('alt')) {
            const arAlt = element.getAttribute('alt');
            const enAlt = element.getAttribute('data-en-alt');
            if (enAlt) {
                element.setAttribute('alt', language === 'ar' ? arAlt : enAlt);
            }
        }
        
        // تحديث النص المؤقت للنماذج
        if (element.hasAttribute('placeholder')) {
            const arPlaceholder = element.getAttribute('placeholder');
            const enPlaceholder = element.getAttribute('data-en-placeholder');
            if (enPlaceholder) {
                element.setAttribute('placeholder', language === 'ar' ? arPlaceholder : enPlaceholder);
            }
        }
    });
    
    // تحديث نص زر تبديل اللغة
    const langButton = document.getElementById('languageToggle');
    if (langButton) {
        const langText = langButton.querySelector('.lang-text');
        langText.textContent = language === 'ar' ? 'English' : 'عربي';
    }
}