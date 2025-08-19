// Student data for validation
const studentData = {
    nationalId: '1137739155',
    phone: '053728850',
    name: 'سديم عمر العصيمي',
    major: 'إدارة مالية - شقراء الدوادمي',
    status: 'مقبول'
};

// Application state
let currentSection = 'search-section';
let uploadedFile = null;

// DOM elements
const sections = document.querySelectorAll('.section');
const searchForm = document.getElementById('search-form');
const nationalIdInput = document.getElementById('national-id');
const phoneInput = document.getElementById('phone');
const confirmBtn = document.getElementById('confirm-btn');
const backSearchBtn = document.getElementById('back-search-btn');
const proceedPaymentBtn = document.getElementById('proceed-payment-btn');
const uploadReceiptBtn = document.getElementById('upload-receipt-btn');
const receiptFileInput = document.getElementById('receipt-file');
const uploadArea = document.getElementById('upload-area');
const filePreview = document.getElementById('file-preview');
const previewImage = document.getElementById('preview-image');
const submitReceiptBtn = document.getElementById('submit-receipt-btn');
const newSearchBtn = document.getElementById('new-search-btn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    showSection('search-section');
});

// Initialize all event listeners
function initializeEventListeners() {
    // Search form submission
    searchForm.addEventListener('submit', handleSearch);
    
    // Navigation buttons
    confirmBtn.addEventListener('click', () => showSection('confirmation-section'));
    backSearchBtn.addEventListener('click', () => showSection('search-section'));
    proceedPaymentBtn.addEventListener('click', () => showSection('payment-section'));
    uploadReceiptBtn.addEventListener('click', () => showSection('upload-section'));
    submitReceiptBtn.addEventListener('click', handleSubmitReceipt);
    newSearchBtn.addEventListener('click', resetApplication);
    
    // File upload functionality
    receiptFileInput.addEventListener('change', handleFileSelect);
    uploadArea.addEventListener('click', () => receiptFileInput.click());
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('drop', handleFileDrop);
    uploadArea.addEventListener('dragenter', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    });
    
    // Input formatting
    nationalIdInput.addEventListener('input', formatNationalId);
    phoneInput.addEventListener('input', formatPhone);
    
    // Copy account number functionality
    window.copyAccountNumber = copyAccountNumber;
    window.removeFile = removeFile;
}

// Show specific section
function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
        
        // Scroll to top when changing sections
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Add entrance animation
        targetSection.style.animation = 'none';
        setTimeout(() => {
            targetSection.style.animation = 'fadeInUp 0.6s ease-out';
        }, 10);
    }
}

// Handle search form submission
function handleSearch(e) {
    e.preventDefault();
    
    const nationalId = nationalIdInput.value.trim().replace(/\s/g, '');
    const phone = phoneInput.value.trim().replace(/\s/g, '');
    
    // Validate inputs
    if (!validateNationalId(nationalId)) {
        showAlert('يرجى إدخال رقم هوية صحيح (10 أرقام)', 'error');
        return;
    }
    
    if (!validatePhone(phone)) {
        showAlert('يرجى إدخال رقم هاتف صحيح', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = searchForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري البحث...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        if (nationalId === studentData.nationalId && phone === studentData.phone) {
            showSection('details-section');
            showAlert('تم العثور على طلب التحويل بنجاح', 'success');
        } else {
            showAlert('لم يتم العثور على طلب تحويل بالبيانات المدخلة', 'error');
        }
        
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Validate national ID
function validateNationalId(nationalId) {
    const cleanId = nationalId.replace(/\s/g, '');
    return /^\d{10}$/.test(cleanId);
}

// Validate phone number
function validatePhone(phone) {
    const cleanPhone = phone.replace(/\s/g, '');
    return /^(05|5)\d{8}$/.test(cleanPhone);
}

// Format national ID input
function formatNationalId(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.substring(0, 10);
    }
    
    // Add spaces for better readability
    if (value.length > 0) {
        value = value.replace(/(\d{4})(\d{4})(\d{2})/, '$1 $2 $3');
    }
    
    e.target.value = value;
}

// Format phone input
function formatPhone(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Ensure it starts with 05 or 5
    if (value.length > 0 && !value.startsWith('05') && !value.startsWith('5')) {
        if (value.startsWith('0')) {
            value = '05' + value.substring(1);
        } else {
            value = '05' + value;
        }
    }
    
    if (value.length > 10) {
        value = value.substring(0, 10);
    }
    
    // Add spaces for better readability
    if (value.length > 2) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    }
    
    e.target.value = value;
}

// Handle file selection
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        processFile(file);
    }
}

// Handle drag and drop
function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleFileDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        processFile(files[0]);
    }
}

// Process uploaded file
function processFile(file) {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
        showAlert('نوع الملف غير مدعوم. يرجى اختيار صورة (JPG, PNG) أو ملف PDF', 'error');
        return;
    }
    
    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        showAlert('حجم الملف كبير جداً. يرجى اختيار ملف أقل من 5 ميجابايت', 'error');
        return;
    }
    
    uploadedFile = file;
    
    // Show file preview for images
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            filePreview.style.display = 'block';
            uploadArea.style.display = 'none';
            submitReceiptBtn.disabled = false;
        };
        reader.readAsDataURL(file);
    } else {
        // For PDF files, show file info
        previewImage.style.display = 'none';
        const fileInfo = document.createElement('div');
        fileInfo.className = 'file-info';
        fileInfo.innerHTML = `
            <i class="fas fa-file-pdf" style="font-size: 48px; color: #dc3545; margin-bottom: 10px;"></i>
            <p><strong>${file.name}</strong></p>
            <p>حجم الملف: ${(file.size / 1024 / 1024).toFixed(2)} ميجابايت</p>
        `;
        
        const previewContent = document.querySelector('.preview-content');
        previewContent.innerHTML = '';
        previewContent.appendChild(fileInfo);
        
        filePreview.style.display = 'block';
        uploadArea.style.display = 'none';
        submitReceiptBtn.disabled = false;
    }
    
    showAlert('تم رفع الملف بنجاح', 'success');
}

// Remove uploaded file
function removeFile() {
    uploadedFile = null;
    filePreview.style.display = 'none';
    uploadArea.style.display = 'block';
    submitReceiptBtn.disabled = true;
    receiptFileInput.value = '';
}

// Handle receipt submission
function handleSubmitReceipt() {
    if (!uploadedFile) {
        showAlert('يرجى رفع إيصال السداد أولاً', 'error');
        return;
    }
    
    // Show loading state
    const originalText = submitReceiptBtn.innerHTML;
    submitReceiptBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
    submitReceiptBtn.disabled = true;
    
    // Simulate file upload
    setTimeout(() => {
        showSection('final-section');
        showAlert('تم إرسال إيصال السداد بنجاح', 'success');
        
        // Reset button state
        submitReceiptBtn.innerHTML = originalText;
        submitReceiptBtn.disabled = false;
    }, 2000);
}

// Copy account number to clipboard
function copyAccountNumber() {
    const accountNumber = 'SA0745000000018516153001';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(accountNumber).then(() => {
            showAlert('تم نسخ رقم الحساب', 'success');
        }).catch(() => {
            fallbackCopyTextToClipboard(accountNumber);
        });
    } else {
        fallbackCopyTextToClipboard(accountNumber);
    }
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showAlert('تم نسخ رقم الحساب', 'success');
    } catch (err) {
        showAlert('فشل في نسخ رقم الحساب', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Reset application to initial state
function resetApplication() {
    // Clear form inputs
    searchForm.reset();
    
    // Reset file upload
    removeFile();
    
    // Show first section
    showSection('search-section');
    
    // Reset state
    uploadedFile = null;
    currentSection = 'search-section';
    
    showAlert('تم إعادة تعيين البوابة', 'info');
}

// Show alert messages
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Create new alert
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <i class="fas ${getAlertIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="alert-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add alert styles
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 500px;
        animation: slideInRight 0.3s ease-out;
        font-family: 'Cairo', sans-serif;
        font-weight: 500;
    `;
    
    // Set alert colors based on type
    const colors = {
        success: { bg: '#d4edda', border: '#c3e6cb', text: '#155724' },
        error: { bg: '#f8d7da', border: '#f5c6cb', text: '#721c24' },
        warning: { bg: '#fff3cd', border: '#ffeaa7', text: '#856404' },
        info: { bg: '#d1ecf1', border: '#bee5eb', text: '#0c5460' }
    };
    
    const color = colors[type] || colors.info;
    alert.style.backgroundColor = color.bg;
    alert.style.border = `1px solid ${color.border}`;
    alert.style.color = color.text;
    
    // Add to document
    document.body.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentElement) {
            alert.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => alert.remove(), 300);
        }
    }, 5000);
}

// Get alert icon based on type
function getAlertIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

// Add CSS animations for alerts
const alertStyles = document.createElement('style');
alertStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .alert-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .alert-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 5px;
        opacity: 0.7;
        transition: opacity 0.2s;
    }
    
    .alert-close:hover {
        opacity: 1;
    }
    
    .file-info {
        text-align: center;
        padding: 20px;
    }
    
    .file-info p {
        margin: 5px 0;
        color: var(--dark-gray);
    }
`;

document.head.appendChild(alertStyles);

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Add loading states for better feedback
function addLoadingState(button, loadingText) {
    const originalText = button.innerHTML;
    button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${loadingText}`;
    button.disabled = true;
    
    return () => {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

// Enhanced form validation with real-time feedback
function addRealTimeValidation() {
    nationalIdInput.addEventListener('blur', function() {
        const value = this.value.replace(/\s/g, '');
        if (value && !validateNationalId(value)) {
            this.style.borderColor = '#dc3545';
            showFieldError(this, 'رقم الهوية يجب أن يكون 10 أرقام');
        } else {
            this.style.borderColor = '#28a745';
            hideFieldError(this);
        }
    });
    
    phoneInput.addEventListener('blur', function() {
        const value = this.value.replace(/\s/g, '');
        if (value && !validatePhone(value)) {
            this.style.borderColor = '#dc3545';
            showFieldError(this, 'رقم الهاتف غير صحيح');
        } else {
            this.style.borderColor = '#28a745';
            hideFieldError(this);
        }
    });
}

function showFieldError(field, message) {
    hideFieldError(field);
    const error = document.createElement('div');
    error.className = 'field-error';
    error.textContent = message;
    error.style.cssText = `
        color: #dc3545;
        font-size: 12px;
        margin-top: 5px;
        display: flex;
        align-items: center;
        gap: 5px;
    `;
    error.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    field.parentElement.appendChild(error);
}

function hideFieldError(field) {
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Initialize real-time validation
document.addEventListener('DOMContentLoaded', function() {
    addRealTimeValidation();
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        const activeSection = document.querySelector('.section.active');
        const primaryButton = activeSection.querySelector('.btn-primary:not(:disabled)');
        if (primaryButton) {
            primaryButton.click();
        }
    }
});

// Add accessibility improvements
function improveAccessibility() {
    // Add ARIA labels
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });
    
    // Add focus management
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.setAttribute('tabindex', '-1');
    });
}

// Initialize accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    improveAccessibility();
});

console.log('بوابة التحويل الداخلي - جامعة شقراء تم تحميلها بنجاح');

