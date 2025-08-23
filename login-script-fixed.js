// بيانات الطالبة للمصادقة
const validCredentials = {
    studentId: '1137739155',
    password: '1137739155'
};

// تهيئة الصفحة - إصلاح المشكلة الأساسية
function initializePage() {
    console.log('Initializing page...');
    initializeLoginForm();
    addInputAnimations();
    checkRememberedUser();
    console.log('Page initialization complete');
}

// التحقق من حالة DOM وتشغيل التهيئة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    // DOM already loaded
    initializePage();
}

// تهيئة نموذج تسجيل الدخول
function initializeLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const studentIdInput = document.getElementById('studentId');
    const passwordInput = document.getElementById('password');
    
    if (!loginForm || !studentIdInput || !passwordInput) {
        console.error('Required form elements not found');
        return;
    }
    
    console.log('Adding event listeners...');
    
    // إضافة مستمعي الأحداث
    loginForm.addEventListener('submit', handleLogin);
    
    // تحسين تجربة المستخدم
    studentIdInput.addEventListener('input', validateStudentId);
    passwordInput.addEventListener('input', validatePassword);
    
    // إضافة دعم Enter للانتقال بين الحقول
    studentIdInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            passwordInput.focus();
        }
    });
    
    // إضافة أحداث التركيز والنقر
    studentIdInput.addEventListener('focus', function() {
        console.log('Student ID field focused');
        this.parentElement.classList.add('focused');
    });
    
    passwordInput.addEventListener('focus', function() {
        console.log('Password field focused');
        this.parentElement.classList.add('focused');
    });
    
    // إضافة أحداث النقر للتأكد من التفاعل
    studentIdInput.addEventListener('click', function() {
        console.log('Student ID field clicked');
        this.focus();
    });
    
    passwordInput.addEventListener('click', function() {
        console.log('Password field clicked');
        this.focus();
    });
    
    console.log('Event listeners added successfully');
}

// إضافة الرسوم المتحركة للحقول
function addInputAnimations() {
    const inputs = document.querySelectorAll('.form-group input');
    
    inputs.forEach(input => {
        // تأثير التركيز
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // تحديث حالة الحقل عند الكتابة
        input.addEventListener('input', function() {
            if (this.value) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });
    });
}

// التحقق من المستخدم المحفوظ
function checkRememberedUser() {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        try {
            const userData = JSON.parse(rememberedUser);
            const studentIdInput = document.getElementById('studentId');
            const rememberMeCheckbox = document.getElementById('rememberMe');
            
            if (studentIdInput && userData.studentId) {
                studentIdInput.value = userData.studentId;
                studentIdInput.parentElement.classList.add('has-value');
            }
            
            if (rememberMeCheckbox) {
                rememberMeCheckbox.checked = true;
            }
        } catch (e) {
            console.error('Error parsing remembered user data:', e);
            localStorage.removeItem('rememberedUser');
        }
    }
}

// التعامل مع تسجيل الدخول
async function handleLogin(event) {
    event.preventDefault();
    console.log('Login form submitted');
    
    const studentId = document.getElementById('studentId').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // إخفاء الرسائل السابقة
    hideMessages();
    
    // التحقق من صحة البيانات
    if (!validateInputs(studentId, password)) {
        return;
    }
    
    // إظهار حالة التحميل
    showLoading(true);
    
    try {
        // محاكاة عملية المصادقة
        await simulateAuthentication(studentId, password);
        
        // حفظ بيانات المستخدم إذا طلب ذلك
        if (rememberMe) {
            localStorage.setItem('rememberedUser', JSON.stringify({ studentId }));
        } else {
            localStorage.removeItem('rememberedUser');
        }
        
        // حفظ حالة تسجيل الدخول
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('studentData', JSON.stringify({
            studentId: studentId,
            loginTime: new Date().toISOString()
        }));
        
        // إظهار رسالة النجاح
        showSuccessMessage();
        
        // التوجيه إلى بوابة الطالب
        setTimeout(() => {
            window.location.href = 'acadimic.html';
        }, 2000);
        
    } catch (error) {
        showErrorMessage(error.message);
    } finally {
        showLoading(false);
    }
}

// محاكاة عملية المصادقة
function simulateAuthentication(studentId, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (studentId === validCredentials.studentId && password === validCredentials.password) {
                resolve();
            } else {
                reject(new Error('رقم الهوية أو كلمة المرور غير صحيحة'));
            }
        }, 1500); // محاكاة تأخير الشبكة
    });
}

// التحقق من صحة المدخلات
function validateInputs(studentId, password) {
    let isValid = true;
    
    // التحقق من رقم الهوية
    if (!studentId) {
        showErrorMessage('يرجى إدخال رقم الهوية أو رقم الطالب');
        document.getElementById('studentId').focus();
        isValid = false;
    } else if (!validateStudentIdFormat(studentId)) {
        showErrorMessage('رقم الهوية يجب أن يكون 10 أرقام');
        document.getElementById('studentId').focus();
        isValid = false;
    }
    
    // التحقق من كلمة المرور
    if (!password) {
        showErrorMessage('يرجى إدخال كلمة المرور');
        document.getElementById('password').focus();
        isValid = false;
    } else if (password.length < 6) {
        showErrorMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        document.getElementById('password').focus();
        isValid = false;
    }
    
    return isValid;
}

// التحقق من تنسيق رقم الهوية
function validateStudentIdFormat(studentId) {
    return /^\d{10}$/.test(studentId);
}

// التحقق من رقم الهوية أثناء الكتابة
function validateStudentId() {
    const input = document.getElementById('studentId');
    const value = input.value.trim();
    
    // إزالة الأحرف غير الرقمية
    input.value = value.replace(/\D/g, '');
    
    // تحديد الحد الأقصى للأرقام
    if (input.value.length > 10) {
        input.value = input.value.substring(0, 10);
    }
}

// التحقق من كلمة المرور أثناء الكتابة
function validatePassword() {
    const input = document.getElementById('password');
    const value = input.value;
    
    // إضافة مؤشرات بصرية لقوة كلمة المرور
    if (value.length >= 6) {
        input.style.borderColor = '#4CAF50';
    } else if (value.length > 0) {
        input.style.borderColor = '#FF9800';
    } else {
        input.style.borderColor = '#E0E0E0';
    }
}

// تبديل إظهار/إخفاء كلمة المرور
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('passwordToggleIcon');
    
    if (passwordInput && toggleIcon) {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.className = 'fas fa-eye-slash';
        } else {
            passwordInput.type = 'password';
            toggleIcon.className = 'fas fa-eye';
        }
    }
}

// إظهار حالة التحميل
function showLoading(show) {
    const loginBtn = document.getElementById('loginBtn');
    const btnText = loginBtn.querySelector('.btn-text');
    const btnLoader = loginBtn.querySelector('.btn-loader');
    
    if (loginBtn && btnText && btnLoader) {
        if (show) {
            loginBtn.classList.add('loading');
            loginBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-flex';
        } else {
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        }
    }
}

// إظهار رسالة الخطأ
function showErrorMessage(message) {
    const errorDiv = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    if (errorDiv && errorText) {
        errorText.textContent = message;
        errorDiv.style.display = 'flex';
        
        // إخفاء الرسالة تلقائياً بعد 5 ثوان
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
        
        // إضافة تأثير اهتزاز للنموذج
        const loginCard = document.querySelector('.login-card');
        if (loginCard) {
            loginCard.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                loginCard.style.animation = '';
            }, 500);
        }
    }
}

// إظهار رسالة النجاح
function showSuccessMessage() {
    const successDiv = document.getElementById('successMessage');
    if (successDiv) {
        successDiv.style.display = 'flex';
    }
}

// إخفاء جميع الرسائل
function hideMessages() {
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');
    
    if (errorDiv) errorDiv.style.display = 'none';
    if (successDiv) successDiv.style.display = 'none';
}

// إضافة تأثير الاهتزاز
const shakeKeyframes = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}
`;

// إضافة الأنماط المتحركة للرأس
const style = document.createElement('style');
style.textContent = shakeKeyframes;
document.head.appendChild(style);

// إضافة تأثيرات إضافية للتفاعل
function addExtraInteractions() {
    // تأثير النقر على الشعار
    const logo = document.querySelector('.university-logo');
    if (logo) {
        logo.addEventListener('click', function() {
            this.style.transform = 'scale(1.1) rotate(360deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 600);
        });
    }
    
    // تأثير التمرير على الروابط
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // إضافة تفاعل checkbox تذكرني
    const rememberMeLabel = document.querySelector('.remember-me');
    if (rememberMeLabel) {
        rememberMeLabel.addEventListener('click', function(e) {
            if (e.target.tagName !== 'INPUT') {
                const checkbox = this.querySelector('input[type="checkbox"]');
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                }
            }
        });
    }
}

// تشغيل التفاعلات الإضافية بعد تحميل DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addExtraInteractions);
} else {
    addExtraInteractions();
}

// معالجة الأخطاء العامة
window.addEventListener('error', function(event) {
    console.error('خطأ في الصفحة:', event.error);
    showErrorMessage('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
});

// منع إرسال النموذج عند الضغط على Enter في حقول معينة
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && event.target.type !== 'submit') {
        const form = event.target.closest('form');
        if (form && event.target.id === 'studentId') {
            event.preventDefault();
            const passwordField = document.getElementById('password');
            if (passwordField) {
                passwordField.focus();
            }
        }
    }
});

// تحسين الأداء - تأخير تحميل الرسوم المتحركة
setTimeout(() => {
    document.body.classList.add('animations-loaded');
}, 100);

console.log('Login script loaded successfully');

