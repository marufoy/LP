// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');

mobileMenuToggle.addEventListener('click', function() {
    mobileMenu.classList.add('active');
    mobileMenuToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
});

mobileMenuClose.addEventListener('click', function() {
    mobileMenu.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-menu-link').forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    });
});

// Close mobile menu when clicking outside
mobileMenu.addEventListener('click', function(e) {
    if (e.target === mobileMenu) {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Form validation and submit control
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const privacyCheckbox = document.getElementById('privacy');
    const submitBtn = document.querySelector('.submit-btn');
    
    // Function to update submit button state
    function updateSubmitButton() {
        if (privacyCheckbox.checked) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        } else {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.6';
        }
    }
    
    // Initialize button state
    updateSubmitButton();
    
    // Update button state when checkbox changes
    privacyCheckbox.addEventListener('change', updateSubmitButton);
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        if (!privacyCheckbox.checked) {
            e.preventDefault();
            alert('プライバシーポリシーに同意してください。');
            privacyCheckbox.focus();
            return false;
        }
        
        // Show success message (you can customize this)
        alert('お問い合わせありがとうございます。24時間以内にご返信いたします。');
    });
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.problem-item, .stat-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.dataset.suffix || '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.dataset.suffix || '');
        }
    }
    
    updateCounter();
}

// Counter animation with custom suffix handling
function animateCounterWithSuffix(element, target, suffix, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    }
    
    updateCounter();
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                // Handle different number formats
                let number;
                if (text.includes('万')) {
                    number = parseInt(text.replace(/\D/g, '')) * 10000;
                } else {
                    number = parseInt(text.replace(/\D/g, ''));
                }
                const suffix = text.replace(/\d/g, '');
                stat.dataset.suffix = suffix;
                stat.textContent = '0' + suffix;
                
                // Custom animation for different number types
                if (text.includes('万')) {
                    animateCounterWithSuffix(stat, parseInt(text.replace(/\D/g, '')), '万+');
                } else {
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
    // Results section stats animation
    const resultsStats = document.querySelector('.results-stats');
    if (resultsStats) {
        const resultsStatsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const text = stat.textContent;
                        if (text.includes('5000万')) {
                            stat.textContent = '0万+';
                            animateCounterWithSuffix(stat, 5000, '万+');
                        } else if (text.includes('100万')) {
                            stat.textContent = '0万+';
                            animateCounterWithSuffix(stat, 100, '万+');
                        } else if (text.includes('5万')) {
                            stat.textContent = '0万+';
                            animateCounterWithSuffix(stat, 5, '万+');
                        }
                    });
                    resultsStatsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        resultsStatsObserver.observe(resultsStats);
    }
});

// 問い合わせフォーム処理
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータの取得
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // バリデーション
            if (!validateForm(data)) {
                return;
            }
            
            // 送信ボタンの状態変更
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
            submitBtn.disabled = true;
            
            // 実際の送信処理（ここではシミュレーション）
            setTimeout(() => {
                alert('お問い合わせありがとうございます。24時間以内にご返信いたします。');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    function validateForm(data) {
        const required = ['name', 'furigana', 'email', 'message', 'privacy'];
        
        for (let field of required) {
            if (!data[field] || data[field].trim() === '') {
                alert(`${getFieldName(field)}は必須項目です。`);
                return false;
            }
        }
        
        // メールアドレスの形式チェック
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('正しいメールアドレスを入力してください。');
            return false;
        }
        
        return true;
    }
    
    function getFieldName(field) {
        const fieldNames = {
            'name': 'お名前',
            'furigana': 'フリガナ',
            'email': 'メールアドレス',
            'message': 'お問い合わせ内容',
            'privacy': 'プライバシーポリシーへの同意'
        };
        return fieldNames[field] || field;
    }
});

// フォーム入力時のリアルタイムバリデーション
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');
        
        // エラー状態をリセット
        field.classList.remove('error');
        removeErrorMessage(field);
        
        if (isRequired && !value) {
            showFieldError(field, 'この項目は必須です');
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, '正しいメールアドレスを入力してください');
                return false;
            }
        }
        
        return true;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    function removeErrorMessage(field) {
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
});

// FAQ Toggle Function
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Close FAQ when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.faq-item')) {
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
    }
});