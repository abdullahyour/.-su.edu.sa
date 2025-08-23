// بيانات الطالبة
const studentData = {
    name: 'سديم عمر العصيمي',
    id: '1137739155',
    phone: '0537288590',
    email: 'sadeem.alosaimi@su.edu.sa',
    major: ' (مسار الإدارة المالية) إدارة الاعمال',
    college: 'كلية العلوم والدراسات الإنسانية',
    level: 'السنة الثانية',
    semester: 'الترم الثاني 1447هـ',
    gpa: 0,
    completedHours: 36,
    completedCourses: 12
};

// مقررات السنة الثانية - الترم الثاني
const availableCourses = [
    {
        code: 'تسق 1301',
        title: 'مبادئ التسويق',
        hours: 3,
        type: 'محاضرة (3)',
        prerequisite: '',
        schedule: [
            { day: 'الأحد', time: '08:00-09:30', room: 'قاعة 101' },
            { day: 'الثلاثاء', time: '08:00-09:30', room: 'قاعة 101' }
        ],
        description: 'مقدمة في مبادئ التسويق والمفاهيم الأساسية'
    },
    {
        code: 'حسب 1301',
        title: 'مبادئ المحاسبة المالية',
        hours: 3,
        type: 'محاضرة (2) + تمارين (1)',
        prerequisite: '',
        schedule: [
            { day: 'الاثنين', time: '10:00-11:30', room: 'قاعة 102' },
            { day: 'الأربعاء', time: '10:00-11:30', room: 'قاعة 102' }
        ],
        description: 'أساسيات المحاسبة المالية والقوائم المالية'
    },
    {
        code: 'نجم 1301',
        title: 'اللغة الإنجليزية',
        hours: 3,
        type: 'محاضرة (2) + عملي (2)',
        prerequisite: '',
        schedule: [
            { day: 'الأحد', time: '12:00-13:30', room: 'مختبر اللغات' },
            { day: 'الثلاثاء', time: '12:00-13:30', room: 'مختبر اللغات' }
        ],
        description: 'تطوير مهارات اللغة الإنجليزية للأعمال'
    },
    {
        code: 'مال 1302',
        title: 'رياضيات الأعمال',
        hours: 3,
        type: 'محاضرة (2) + تمارين (1)',
        prerequisite: '',
        schedule: [
            { day: 'الاثنين', time: '14:00-15:30', room: 'قاعة 103' },
            { day: 'الأربعاء', time: '14:00-15:30', room: 'قاعة 103' }
        ],
        description: 'الرياضيات التطبيقية في مجال الأعمال'
    },
    {
        code: 'قصد 1303',
        title: 'مبادئ الاقتصاد الجزئي',
        hours: 3,
        type: 'محاضرة (3)',
        prerequisite: '',
        schedule: [
            { day: 'الأحد', time: '16:00-17:30', room: 'قاعة 104' },
            { day: 'الثلاثاء', time: '16:00-17:30', room: 'قاعة 104' }
        ],
        description: 'مبادئ الاقتصاد الجزئي وسلوك المستهلك'
    },
    {
        code: 'كمي 1304',
        title: 'مبادئ الإحصاء في إدارة الأعمال',
        hours: 3,
        type: 'محاضرة (2) + تمارين (1)',
        prerequisite: '',
        schedule: [
            { day: 'الاثنين', time: '08:00-09:30', room: 'قاعة 105' },
            { day: 'الخميس', time: '08:00-09:30', room: 'قاعة 105' }
        ],
        description: 'الإحصاء التطبيقي في إدارة الأعمال'
    }
];

// الدرجات السابقة
const previousGrades = [
    { code: 'عرب 1201', title: 'المهارات اللغوية', hours: 2, grade: 'أ', points: 4.0, gpa: 8.0 },
    { code: 'نهج 1201', title: 'مهارات جامعية', hours: 2, grade: 'أ-', points: 3.7, gpa: 7.4 },
    { code: 'سلم 1202', title: 'القيم الاجتماعية في الإسلام', hours: 2, grade: 'ب+', points: 3.3, gpa: 6.6 },
    { code: 'تقن 1301', title: 'مهارات الحاسب الآلي', hours: 3, grade: 'أ', points: 4.0, gpa: 12.0 },
    { code: 'دار 1301', title: 'مبادئ إدارة الأعمال', hours: 3, grade: 'أ-', points: 3.7, gpa: 11.1 },
    { code: 'قنن 1301', title: 'القانون التجاري السعودي', hours: 3, grade: 'ب+', points: 3.3, gpa: 9.9 },
    { code: 'مال 1301', title: 'أساسيات تمويل الأعمال', hours: 3, grade: 'أ', points: 4.0, gpa: 12.0 },
    { code: 'سلم 1201', title: 'أصول الإسلام', hours: 2, grade: 'أ-', points: 3.7, gpa: 7.4 },
    { code: 'حسب 2302', title: 'المحاسبة المتوسطة 1', hours: 3, grade: 'ب+', points: 3.3, gpa: 9.9 },
    { code: 'دار 2303', title: 'أساسيات نظم المعلومات الإدارية', hours: 3, grade: 'أ-', points: 3.7, gpa: 11.1 },
    { code: 'حسب 2304', title: 'مبادئ التكاليف والمحاسبة الإدارية', hours: 3, grade: 'ب+', points: 3.3, gpa: 9.9 },
    { code: 'مال 2308', title: 'مبادئ الاستثمار', hours: 3, grade: 'أ', points: 4.0, gpa: 12.0 }
];

// المقررات المسجلة
let registeredCourses = [];

// الجدول الدراسي
const scheduleData = {
    '08:00-09:30': {
        'الأحد': null,
        'الاثنين': null,
        'الثلاثاء': null,
        'الأربعاء': null,
        'الخميس': null
    },
    '10:00-11:30': {
        'الأحد': null,
        'الاثنين': null,
        'الثلاثاء': null,
        'الأربعاء': null,
        'الخميس': null
    },
    '12:00-13:30': {
        'الأحد': null,
        'الاثنين': null,
        'الثلاثاء': null,
        'الأربعاء': null,
        'الخميس': null
    },
    '14:00-15:30': {
        'الأحد': null,
        'الاثنين': null,
        'الثلاثاء': null,
        'الأربعاء': null,
        'الخميس': null
    },
    '16:00-17:30': {
        'الأحد': null,
        'الاثنين': null,
        'الثلاثاء': null,
        'الأربعاء': null,
        'الخميس': null
    }
};

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // التحقق من تسجيل الدخول أولاً
    checkLoginStatus();
    
    initializeNavigation();
    loadAvailableCourses();
    loadGrades();
    updateSchedule();
    updateStudentInfo();
    initializeLogout();
});

// تهيئة التنقل بين التبويبات
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // إزالة الفئة النشطة من جميع العناصر
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            // إضافة الفئة النشطة للعنصر المحدد
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// تحديث معلومات الطالبة
function updateStudentInfo() {
    document.getElementById('student-name').textContent = studentData.name;
    document.getElementById('student-id').textContent = studentData.id;
}

// تحميل المقررات المتاحة
function loadAvailableCourses() {
    const coursesContainer = document.getElementById('available-courses');
    coursesContainer.innerHTML = '';

    availableCourses.forEach(course => {
        const courseCard = createCourseCard(course);
        coursesContainer.appendChild(courseCard);
    });
}

// إنشاء بطاقة مقرر
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.setAttribute('data-course-code', course.code);

    const scheduleItems = course.schedule.map(item => 
        `<div class="schedule-item">${item.day} ${item.time}</div>`
    ).join('');

    card.innerHTML = `
        <div class="course-header">
            <span class="course-code">${course.code}</span>
            <span class="course-hours">${course.hours} ساعات</span>
        </div>
        <div class="course-title">${course.title}</div>
        <div class="course-details">${course.description}</div>
        <div class="course-schedule">
            ${scheduleItems}
        </div>
        <div class="course-actions">
            <span class="course-type">${course.type}</span>
            <button class="btn-register" onclick="registerCourse('${course.code}')">
                <i class="fas fa-plus"></i> تسجيل
            </button>
        </div>
    `;

    return card;
}

// تسجيل مقرر
function registerCourse(courseCode) {
    const course = availableCourses.find(c => c.code === courseCode);
    if (!course) return;

    // التحقق من عدم تسجيل المقرر مسبقاً
    if (registeredCourses.find(c => c.code === courseCode)) {
        showNotification('هذا المقرر مسجل بالفعل', 'warning');
        return;
    }

    // التحقق من الحد الأقصى للساعات
    const totalHours = registeredCourses.reduce((sum, c) => sum + c.hours, 0);
    if (totalHours + course.hours > 18) {
        showNotification('تجاوز الحد الأقصى للساعات المسموح (18 ساعة)', 'error');
        return;
    }

    // التحقق من تعارض الأوقات
    if (hasScheduleConflict(course)) {
        showNotification('يوجد تعارض في الأوقات مع مقرر آخر', 'error');
        return;
    }

    // إضافة المقرر للمقررات المسجلة
    registeredCourses.push(course);
    updateRegisteredCourses();
    updateSchedule();
    updateCourseCard(courseCode, true);
    showNotification(`تم تسجيل مقرر ${course.title} بنجاح`, 'success');
}

// إلغاء تسجيل مقرر
function unregisterCourse(courseCode) {
    const courseIndex = registeredCourses.findIndex(c => c.code === courseCode);
    if (courseIndex === -1) return;

    const course = registeredCourses[courseIndex];
    registeredCourses.splice(courseIndex, 1);
    
    updateRegisteredCourses();
    updateSchedule();
    updateCourseCard(courseCode, false);
    showNotification(`تم إلغاء تسجيل مقرر ${course.title}`, 'info');
}

// التحقق من تعارض الأوقات
function hasScheduleConflict(newCourse) {
    for (const registeredCourse of registeredCourses) {
        for (const newSchedule of newCourse.schedule) {
            for (const existingSchedule of registeredCourse.schedule) {
                if (newSchedule.day === existingSchedule.day && 
                    newSchedule.time === existingSchedule.time) {
                    return true;
                }
            }
        }
    }
    return false;
}

// تحديث بطاقة المقرر
function updateCourseCard(courseCode, isRegistered) {
    const card = document.querySelector(`[data-course-code="${courseCode}"]`);
    if (!card) return;

    const button = card.querySelector('.btn-register');
    
    if (isRegistered) {
        card.classList.add('selected');
        button.innerHTML = '<i class="fas fa-check"></i> مسجل';
        button.disabled = true;
    } else {
        card.classList.remove('selected');
        button.innerHTML = '<i class="fas fa-plus"></i> تسجيل';
        button.disabled = false;
    }
}

// تحديث المقررات المسجلة
function updateRegisteredCourses() {
    const container = document.getElementById('registered-courses');
    const totalHoursSpan = document.getElementById('total-hours');
    const confirmBtn = document.getElementById('confirm-btn');

    if (registeredCourses.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book-open"></i>
                <p>لم يتم تسجيل أي مقررات بعد</p>
            </div>
        `;
        totalHoursSpan.textContent = '0';
        confirmBtn.disabled = true;
        return;
    }

    const totalHours = registeredCourses.reduce((sum, course) => sum + course.hours, 0);
    totalHoursSpan.textContent = totalHours;
    confirmBtn.disabled = totalHours < 12;

    container.innerHTML = registeredCourses.map(course => `
        <div class="registered-course">
            <div class="registered-course-info">
                <div class="registered-course-title">${course.code} - ${course.title}</div>
                <div class="registered-course-details">${course.hours} ساعات - ${course.type}</div>
            </div>
            <button class="btn-remove" onclick="unregisterCourse('${course.code}')">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

// تحديث الجدول الدراسي
function updateSchedule() {
    // إعادة تعيين الجدول
    Object.keys(scheduleData).forEach(time => {
        Object.keys(scheduleData[time]).forEach(day => {
            scheduleData[time][day] = null;
        });
    });

    // إضافة المقررات المسجلة للجدول
    registeredCourses.forEach(course => {
        course.schedule.forEach(item => {
            if (scheduleData[item.time] && scheduleData[item.time][item.day] !== undefined) {
                scheduleData[item.time][item.day] = {
                    code: course.code,
                    title: course.title,
                    room: item.room
                };
            }
        });
    });

    renderScheduleTable();
}

// رسم جدول المحاضرات
function renderScheduleTable() {
    const tbody = document.getElementById('schedule-body');
    tbody.innerHTML = '';

    const times = Object.keys(scheduleData);
    const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];

    times.forEach(time => {
        const row = document.createElement('tr');
        
        // عمود الوقت
        const timeCell = document.createElement('td');
        timeCell.textContent = time;
        timeCell.style.fontWeight = 'bold';
        timeCell.style.backgroundColor = 'var(--light-green)';
        row.appendChild(timeCell);

        // أعمدة الأيام
        days.forEach(day => {
            const cell = document.createElement('td');
            const slot = scheduleData[time][day];
            
            if (slot) {
                cell.innerHTML = `
                    <div class="schedule-slot">
                        <div class="schedule-slot-title">${slot.code}</div>
                        <div class="schedule-slot-title">${slot.title}</div>
                        <div class="schedule-slot-room">${slot.room}</div>
                    </div>
                `;
            }
            
            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });
}

// تحميل الدرجات
function loadGrades() {
    const tbody = document.getElementById('grades-body');
    tbody.innerHTML = '';

    previousGrades.forEach(grade => {
        const row = document.createElement('tr');
        
        const gradeClass = getGradeClass(grade.grade);
        
        row.innerHTML = `
            <td>${grade.code}</td>
            <td>${grade.title}</td>
            <td>${grade.hours}</td>
            <td><span class="${gradeClass}">${grade.grade}</span></td>
            <td>${grade.points}</td>
            <td>${grade.gpa}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// تحديد فئة الدرجة للتنسيق
function getGradeClass(grade) {
    if (grade === 'أ' || grade === 'أ-') return 'grade-excellent';
    if (grade === 'ب+' || grade === 'ب') return 'grade-very-good';
    if (grade === 'ب-' || grade === 'ج+') return 'grade-good';
    return '';
}

// تأكيد التسجيل
function confirmRegistration() {
    if (registeredCourses.length === 0) return;

    const totalHours = registeredCourses.reduce((sum, course) => sum + course.hours, 0);
    
    if (totalHours < 12) {
        showNotification('الحد الأدنى للساعات هو 12 ساعة', 'error');
        return;
    }

    // محاكاة عملية التسجيل
    showNotification('جاري تأكيد التسجيل...', 'info');
    
    setTimeout(() => {
        showNotification('تم تأكيد تسجيل المقررات بنجاح!', 'success');
        document.getElementById('confirm-btn').disabled = true;
        document.getElementById('confirm-btn').innerHTML = '<i class="fas fa-check"></i> تم التأكيد';
    }, 2000);
}

// إضافة مستمع الحدث لزر التأكيد
document.addEventListener('DOMContentLoaded', function() {
    const confirmBtn = document.getElementById('confirm-btn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', confirmRegistration);
    }
});

// عرض الإشعارات
function showNotification(message, type = 'info') {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="closeNotification(this)">
            <i class="fas fa-times"></i>
        </button>
    `;

    // إضافة الأنماط
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;

    // إضافة الإشعار للصفحة
    document.body.appendChild(notification);

    // إزالة الإشعار تلقائياً بعد 5 ثوان
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification.querySelector('.notification-close'));
        }
    }, 5000);
}

// إغلاق الإشعار
function closeNotification(button) {
    const notification = button.parentNode;
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// الحصول على أيقونة الإشعار
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// الحصول على لون الإشعار
function getNotificationColor(type) {
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    return colors[type] || '#17a2b8';
}

// إضافة أنماط الحركة للإشعارات
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: background 0.2s ease;
    }

    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(style);



// التحقق من حالة تسجيل الدخول
function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    
    if (!isLoggedIn || isLoggedIn !== 'true') {
        // إعادة توجيه إلى صفحة تسجيل الدخول
        window.location.href = 'login.html';
        return;
    }
    
    // التحقق من انتهاء صلاحية الجلسة (24 ساعة)
    const studentData = sessionStorage.getItem('studentData');
    if (studentData) {
        const data = JSON.parse(studentData);
        const loginTime = new Date(data.loginTime);
        const currentTime = new Date();
        const timeDiff = currentTime - loginTime;
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        if (hoursDiff > 24) {
            // انتهت صلاحية الجلسة
            logout();
            return;
        }
    }
}

// تهيئة وظيفة تسجيل الخروج
function initializeLogout() {
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showLogoutConfirmation();
        });
    }
}

// إظهار تأكيد تسجيل الخروج
function showLogoutConfirmation() {
    const confirmation = confirm('هل أنت متأكد من رغبتك في تسجيل الخروج؟');
    if (confirmation) {
        logout();
    }
}

// تسجيل الخروج
function logout() {
    // إظهار رسالة تسجيل الخروج
    showNotification('جاري تسجيل الخروج...', 'info');
    
    // محو بيانات الجلسة
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('studentData');
    
    // تأخير قصير لإظهار الرسالة
    setTimeout(() => {
        // إعادة التوجيه إلى صفحة تسجيل الدخول
        window.location.href = 'index.html';
    }, 1000);
}

// تحديث معلومات الطالبة من بيانات الجلسة
function updateStudentInfoFromSession() {
    const studentData = sessionStorage.getItem('studentData');
    if (studentData) {
        const data = JSON.parse(studentData);
        // يمكن استخدام بيانات إضافية من الجلسة إذا لزم الأمر
        console.log('بيانات الطالب من الجلسة:', data);
    }
}

// إضافة مؤقت لتحديث حالة الجلسة
setInterval(() => {
    checkLoginStatus();
}, 60000); // فحص كل دقيقة

// معالجة إغلاق النافذة أو التبويب
window.addEventListener('beforeunload', function(e) {
    // يمكن إضافة تحذير إذا كان هناك بيانات غير محفوظة
    const hasUnsavedData = registeredCourses.length > 0 && 
                          !document.getElementById('confirm-btn').disabled;
    
    if (hasUnsavedData) {
        e.preventDefault();
        e.returnValue = 'لديك مقررات غير مؤكدة. هل أنت متأكد من الخروج؟';
        return e.returnValue;
    }
});

// تحسين أمان الجلسة
function enhanceSessionSecurity() {
    // منع فتح عدة تبويبات لنفس الجلسة
    const sessionId = sessionStorage.getItem('sessionId') || generateSessionId();
    sessionStorage.setItem('sessionId', sessionId);
    
    // التحقق من تغيير التبويب
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            checkLoginStatus();
        }
    });
}

// توليد معرف جلسة فريد
function generateSessionId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// تهيئة أمان الجلسة
document.addEventListener('DOMContentLoaded', function() {
    enhanceSessionSecurity();
});

