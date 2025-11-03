const validCredentials = [
    { id: 'STU001', pass: 'password123', name: 'Ann Nyakio' },
    { id: 'STU002', pass: 'school2024', name: 'John Kamau' },
    { id: 'admin', pass: 'admin123', name: 'Admin User' }
]

const courses = [
    {
        id: 1,
        icon: '💻',
        title: 'Web Development Fundamentals',
        description: 'Learn the basics of HTML, CSS, and JavaScript to build modern websites.',
        duration: '8 weeks',
        topics: [
            'HTML5 structure and semantics',
            'CSS styling and layouts',
            'JavaScript basics and DOM manipulation',
            'Responsive web design',
            'Web accessibility principles'
        ]
    },
    {
        id: 2,
        icon: '🎨',
        title: 'Digital Design Principles',
        description: 'Master the fundamentals of design thinking and user interface design.',
        duration: '6 weeks',
        topics: [
            'Color theory and typography',
            'Layout and composition',
            'User experience (UX) basics',
            'Design tools and workflows',
            'Creating design systems'
        ]
    },
    {
        id: 3,
        icon: '📊',
        title: 'Data Science Essentials',
        description: 'Introduction to data analysis, visualization, and basic statistics.',
        duration: '10 weeks',
        topics: [
            'Statistical analysis fundamentals',
            'Data visualization techniques',
            'Python for data science',
            'Working with datasets',
            'Basic machine learning concepts'
        ]
    },
    {
        id: 4,
        icon: '🚀',
        title: 'Mobile App Development',
        description: 'Build cross-platform mobile applications using modern frameworks.',
        duration: '12 weeks',
        topics: [
            'Mobile UI/UX design patterns',
            'React Native fundamentals',
            'State management in apps',
            'API integration',
            'App deployment and testing'
        ]
    }
]

let currentUser = null
let completedCourses = new Set()

const loginPage = document.getElementById('loginPage')
const portalPage = document.getElementById('portalPage')
const loginForm = document.getElementById('loginForm')
const studentIdInput = document.getElementById('studentId')
const passwordInput = document.getElementById('password')
const loginBtn = document.getElementById('loginBtn')
const btnText = loginBtn.querySelector('.btn-text')
const btnLoading = loginBtn.querySelector('.btn-loading')
const errorMessage = document.getElementById('errorMessage')
const successMessage = document.getElementById('successMessage')
const welcomeUser = document.getElementById('welcomeUser')
const logoutBtn = document.getElementById('logoutBtn')
const coursesList = document.getElementById('coursesList')
const courseModal = document.getElementById('courseModal')
const courseDetails = document.getElementById('courseDetails')
const closeModal = document.querySelector('.close-modal')

function showLoading() {
    btnText.style.display = 'none'
    btnLoading.style.display = 'inline'
    loginBtn.disabled = true
}

function hideLoading() {
    btnText.style.display = 'inline'
    btnLoading.style.display = 'none'
    loginBtn.disabled = false
}

function showError() {
    errorMessage.style.display = 'block'
    successMessage.style.display = 'none'
}

function showSuccess() {
    errorMessage.style.display = 'none'
    successMessage.style.display = 'block'
}

function clearMessages() {
    errorMessage.style.display = 'none'
    successMessage.style.display = 'none'
}

function validateCredentials(studentId, password) {
    return validCredentials.find(cred =>
        cred.id === studentId && cred.pass === password
    )
}

function simulateLogin(studentId, password) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const user = validateCredentials(studentId, password)
            resolve(user)
        }, 1000)
    })
}

function showPortal() {
    loginPage.classList.remove('active')
    portalPage.classList.add('active')
    welcomeUser.textContent = `Welcome, ${currentUser.name}`
    renderCourses()
}

function showLogin() {
    portalPage.classList.remove('active')
    loginPage.classList.add('active')
    currentUser = null
    loginForm.reset()
    clearMessages()
}

function renderCourses() {
    coursesList.innerHTML = courses.map(course => `
        <div class="course-card ${completedCourses.has(course.id) ? 'completed' : ''}" data-course-id="${course.id}">
            <div class="course-icon">${course.icon}</div>
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <div class="course-meta">
                <span class="course-duration">⏱️ ${course.duration}</span>
                <span class="completion-badge">✓ Completed</span>
            </div>
        </div>
    `).join('')

    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', () => {
            const courseId = parseInt(card.dataset.courseId)
            showCourseDetail(courseId)
        })
    })
}

function showCourseDetail(courseId) {
    const course = courses.find(c => c.id === courseId)
    const isCompleted = completedCourses.has(courseId)

    courseDetails.innerHTML = `
        <div class="course-detail-header">
            <div class="course-detail-icon">${course.icon}</div>
            <h2>${course.title}</h2>
            <p>${course.description}</p>
        </div>

        <div class="course-detail-info">
            <h3>What you'll learn:</h3>
            <ul>
                ${course.topics.map(topic => `<li>${topic}</li>`).join('')}
            </ul>
        </div>

        <div class="course-detail-info">
            <p><strong>Duration:</strong> ${course.duration}</p>
            <p><strong>Status:</strong> ${isCompleted ? '✓ Completed' : 'Not started'}</p>
        </div>

        <div class="course-actions">
            <button class="btn-complete" id="completeBtn" ${isCompleted ? 'disabled' : ''}>
                ${isCompleted ? '✓ Already Completed' : 'Mark as Completed'}
            </button>
            <button class="btn-close" id="closeDetailBtn">Close</button>
        </div>
    `

    courseModal.classList.add('active')

    const completeBtn = document.getElementById('completeBtn')
    const closeDetailBtn = document.getElementById('closeDetailBtn')

    if (!isCompleted) {
        completeBtn.addEventListener('click', () => {
            completedCourses.add(courseId)
            renderCourses()
            showCourseDetail(courseId)
        })
    }

    closeDetailBtn.addEventListener('click', closeCourseModal)
}

function closeCourseModal() {
    courseModal.classList.remove('active')
}

async function handleLogin(event) {
    event.preventDefault()

    const studentId = studentIdInput.value.trim()
    const password = passwordInput.value.trim()

    clearMessages()

    if (!studentId || !password) {
        errorMessage.textContent = 'Please fill in all fields'
        errorMessage.style.display = 'block'
        return
    }

    showLoading()

    try {
        const user = await simulateLogin(studentId, password)

        if (user) {
            currentUser = user
            showSuccess()

            setTimeout(() => {
                showPortal()
            }, 1500)
        } else {
            showError()
            hideLoading()
        }
    } catch (error) {
        console.error('Login error:', error)
        errorMessage.textContent = 'An error occurred. Please try again.'
        showError()
        hideLoading()
    }
}

loginForm.addEventListener('submit', handleLogin)
studentIdInput.addEventListener('input', clearMessages)
passwordInput.addEventListener('input', clearMessages)
logoutBtn.addEventListener('click', showLogin)
closeModal.addEventListener('click', closeCourseModal)

courseModal.addEventListener('click', (e) => {
    if (e.target === courseModal) {
        closeCourseModal()
    }
})
