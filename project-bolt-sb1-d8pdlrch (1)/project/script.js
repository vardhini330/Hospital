// Application State
let currentScreen = 'splash-screen';
let currentPatient = null;
let currentHospitalAdmin = null;
let currentAppointment = null;
let appointmentStep = 1;
let selectedCity = '';
let selectedHospital = null;
let selectedDoctor = null;

// Screen Management
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenId;
    }
}

function showLoginSelection() {
    showScreen('login-selection');
}

function showPatientLogin() {
    showScreen('patient-login');
}

function showHospitalLogin() {
    showScreen('hospital-login');
}

function showPatientDashboard() {
    if (currentPatient) {
        document.getElementById('patient-name-display').textContent = currentPatient.fullName;
        document.getElementById('patient-phone-display').textContent = currentPatient.contactNumber;
        document.getElementById('patient-age-display').textContent = currentPatient.age;
        showScreen('patient-dashboard');
    }
}

function showHospitalDashboard() {
    if (currentHospitalAdmin) {
        document.getElementById('hospital-name-display').textContent = currentHospitalAdmin.hospitalName;
        document.getElementById('hospital-code-display').textContent = currentHospitalAdmin.hospitalCode;
        document.getElementById('hospital-email-display').textContent = currentHospitalAdmin.adminEmail;
        loadDoctorsGrid();
        showScreen('hospital-dashboard');
    }
}

function showBookAppointment() {
    appointmentStep = 1;
    selectedCity = '';
    selectedHospital = null;
    selectedDoctor = null;
    updateAppointmentStep();
    loadCities();
    showScreen('book-appointment');
}

function showAppointmentConfirmation() {
    if (currentAppointment) {
        displayAppointmentConfirmation();
        showScreen('appointment-confirmation');
    }
}

function logout() {
    currentPatient = null;
    currentHospitalAdmin = null;
    currentAppointment = null;
    showLoginSelection();
}

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    // Show splash screen for 2 seconds
    setTimeout(() => {
        showLoginSelection();
    }, 2000);
    
    // Setup form handlers
    setupFormHandlers();
    setupSearchHandlers();
});

// Form Handlers
function setupFormHandlers() {
    // Patient Login Form
    const patientForm = document.getElementById('patient-form');
    if (patientForm) {
        patientForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                fullName: document.getElementById('patient-name').value,
                age: parseInt(document.getElementById('patient-age').value),
                dateOfBirth: document.getElementById('patient-dob').value,
                contactNumber: document.getElementById('patient-phone').value,
                email: document.getElementById('patient-email').value
            };
            
            if (formData.fullName && formData.age && formData.dateOfBirth && formData.contactNumber && formData.email) {
                currentPatient = formData;
                showPatientDashboard();
            }
        });
    }
    
    // Hospital Login Form
    const hospitalForm = document.getElementById('hospital-form');
    if (hospitalForm) {
        hospitalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                hospitalName: document.getElementById('hospital-name').value,
                hospitalCode: document.getElementById('hospital-code').value,
                adminEmail: document.getElementById('hospital-email').value,
                password: document.getElementById('hospital-password').value
            };
            
            if (formData.hospitalName && formData.hospitalCode && formData.adminEmail && formData.password) {
                currentHospitalAdmin = formData;
                showHospitalDashboard();
            }
        });
    }
    
    // Appointment Form
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            confirmAppointment();
        });
    }
}

// Search Handlers
function setupSearchHandlers() {
    // City Search
    const citySearch = document.getElementById('city-search');
    if (citySearch) {
        citySearch.addEventListener('input', function(e) {
            filterCities(e.target.value);
        });
    }
    
    // Hospital Search
    const hospitalSearch = document.getElementById('hospital-search');
    if (hospitalSearch) {
        hospitalSearch.addEventListener('input', function(e) {
            filterHospitals(e.target.value);
        });
    }
    
    // Doctor Search
    const doctorSearch = document.getElementById('doctor-search');
    if (doctorSearch) {
        doctorSearch.addEventListener('input', function(e) {
            filterDoctors(e.target.value);
        });
    }
}

// Emergency SOS
async function triggerEmergencySOS() {
    try {
        const position = await getCurrentLocation();
        const { latitude, longitude } = position.coords;
        
        // Simulate emergency alert
        alert(`🚨 Emergency SOS Alert Sent!\n\nLocation: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}\n\nNearest ambulance has been notified and is on the way.\n\nEstimated arrival: 8-12 minutes\n\nStay calm and wait for assistance.`);
        
        // In a real app, this would send data to emergency services
        console.log('Emergency alert sent with location:', { latitude, longitude, patient: currentPatient });
    } catch (error) {
        alert('🚨 Emergency SOS Alert Sent!\n\nUnable to get precise location, but emergency alert has been sent with your registered address.\n\nNearest ambulance has been notified.\n\nStay calm and wait for assistance.');
        console.log('Emergency alert sent without location:', { patient: currentPatient });
    }
}

// Appointment Booking Functions
function loadCities() {
    const citiesList = document.getElementById('cities-list');
    if (!citiesList) return;
    
    citiesList.innerHTML = '';
    CITIES.forEach(city => {
        const cityElement = createCityElement(city);
        citiesList.appendChild(cityElement);
    });
}

function createCityElement(city) {
    const div = document.createElement('div');
    div.className = 'option-item city-option';
    div.onclick = () => selectCity(city);
    div.innerHTML = `
        <i class="fas fa-map-marker-alt"></i>
        <span>${city}</span>
    `;
    return div;
}

function filterCities(searchTerm) {
    const citiesList = document.getElementById('cities-list');
    if (!citiesList) return;
    
    const filteredCities = CITIES.filter(city => 
        city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    citiesList.innerHTML = '';
    filteredCities.forEach(city => {
        const cityElement = createCityElement(city);
        citiesList.appendChild(cityElement);
    });
}

function selectCity(city) {
    selectedCity = city;
    document.getElementById('selected-city').textContent = city;
    document.getElementById('hospital-search').value = '';
    loadHospitals();
    goToStep(2);
}

function loadHospitals() {
    const hospitalsList = document.getElementById('hospitals-list');
    if (!hospitalsList || !selectedCity) return;
    
    const hospitals = HOSPITALS[selectedCity] || [];
    hospitalsList.innerHTML = '';
    
    hospitals.forEach(hospital => {
        const hospitalElement = createHospitalElement(hospital);
        hospitalsList.appendChild(hospitalElement);
    });
}

function createHospitalElement(hospital) {
    const div = document.createElement('div');
    div.className = 'option-item hospital-option';
    div.onclick = () => selectHospital(hospital);
    div.innerHTML = `
        <h3>${hospital.name}</h3>
        <p>${hospital.address}</p>
        <div class="hospital-rank">
            <i class="fas fa-star"></i>
            <span>Rank #${hospital.popularityRank}</span>
        </div>
    `;
    return div;
}

function filterHospitals(searchTerm) {
    const hospitalsList = document.getElementById('hospitals-list');
    if (!hospitalsList || !selectedCity) return;
    
    const hospitals = HOSPITALS[selectedCity] || [];
    const filteredHospitals = hospitals.filter(hospital =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    hospitalsList.innerHTML = '';
    filteredHospitals.forEach(hospital => {
        const hospitalElement = createHospitalElement(hospital);
        hospitalsList.appendChild(hospitalElement);
    });
}

function selectHospital(hospital) {
    selectedHospital = hospital;
    document.getElementById('selected-hospital-info').innerHTML = `
        <h3>${hospital.name}</h3>
        <p>${hospital.address}</p>
    `;
    document.getElementById('doctor-search').value = '';
    loadDoctors();
    goToStep(3);
}

function loadDoctors() {
    const doctorsList = document.getElementById('doctors-list');
    if (!doctorsList || !selectedHospital) return;
    
    const doctors = DOCTORS.filter(doctor => doctor.hospitalId === selectedHospital.id);
    doctorsList.innerHTML = '';
    
    doctors.forEach(doctor => {
        const doctorElement = createDoctorElement(doctor);
        doctorsList.appendChild(doctorElement);
    });
}

function createDoctorElement(doctor) {
    const div = document.createElement('div');
    div.className = 'option-item doctor-option';
    div.onclick = () => selectDoctor(doctor);
    div.innerHTML = `
        <div class="doctor-header">
            <div class="doctor-info">
                <h3>${doctor.name}</h3>
                <p>${doctor.degree}</p>
            </div>
            <div class="doctor-status ${doctor.onDuty ? 'on-duty' : 'off-duty'}">
                ${doctor.onDuty ? 'On Duty' : 'Off Duty'}
            </div>
        </div>
        <div class="doctor-details">
            <span class="specialization-tag">${doctor.specialization}</span>
            <div class="appointments-info">
                <i class="fas fa-clock"></i>
                ${doctor.appointmentsToday} appointments today
            </div>
        </div>
    `;
    return div;
}

function filterDoctors(searchTerm) {
    const doctorsList = document.getElementById('doctors-list');
    if (!doctorsList || !selectedHospital) return;
    
    const doctors = DOCTORS.filter(doctor => doctor.hospitalId === selectedHospital.id);
    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    doctorsList.innerHTML = '';
    filteredDoctors.forEach(doctor => {
        const doctorElement = createDoctorElement(doctor);
        doctorsList.appendChild(doctorElement);
    });
}

function selectDoctor(doctor) {
    selectedDoctor = doctor;
    document.getElementById('selected-doctor-info').innerHTML = `
        <h2>Selected Doctor</h2>
        <div class="selected-doctor-card">
            <div class="doctor-avatar">${doctor.name.charAt(3)}</div>
            <div>
                <h4>${doctor.name}</h4>
                <p>${doctor.specialization}</p>
                <p>${selectedHospital.name}</p>
            </div>
        </div>
    `;
    
    // Pre-fill appointment form
    if (currentPatient) {
        document.getElementById('appointment-patient-name').value = currentPatient.fullName;
        document.getElementById('appointment-age').value = currentPatient.age;
    }
    
    goToStep(4);
}

function goToStep(step) {
    appointmentStep = step;
    updateAppointmentStep();
}

function updateAppointmentStep() {
    // Update step indicator
    document.getElementById('current-step').textContent = appointmentStep;
    
    // Update progress bar
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        progressFill.style.width = `${(appointmentStep / 4) * 100}%`;
    }
    
    // Show/hide steps
    document.querySelectorAll('.appointment-step').forEach((step, index) => {
        step.classList.toggle('active', index + 1 === appointmentStep);
    });
}

function confirmAppointment() {
    if (!selectedHospital || !selectedDoctor || !currentPatient) return;
    
    const appointmentData = {
        id: generateReferenceId(),
        patientName: currentPatient.fullName,
        age: parseInt(document.getElementById('appointment-age').value),
        gender: document.getElementById('appointment-gender').value,
        symptoms: document.getElementById('appointment-symptoms').value,
        hospitalName: selectedHospital.name,
        hospitalAddress: selectedHospital.address,
        doctorName: selectedDoctor.name,
        doctorSpecialization: selectedDoctor.specialization,
        appointmentDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        appointmentTime: '10:00 AM',
        tokenNumber: generateTokenNumber(),
        referenceId: generateReferenceId(),
        amount: 500
    };
    
    currentAppointment = appointmentData;
    showAppointmentConfirmation();
}

function displayAppointmentConfirmation() {
    const confirmationDetails = document.getElementById('confirmation-details');
    if (!confirmationDetails || !currentAppointment) return;
    
    confirmationDetails.innerHTML = `
        <h2>Appointment Details</h2>
        <div class="details-grid">
            <div class="detail-item">
                <i class="fas fa-hashtag"></i>
                <div class="detail-content">
                    <div class="label">Reference ID</div>
                    <div class="value">${currentAppointment.referenceId}</div>
                </div>
            </div>
            <div class="detail-item">
                <i class="fas fa-user"></i>
                <div class="detail-content">
                    <div class="label">Patient Name</div>
                    <div class="value">${currentAppointment.patientName}</div>
                </div>
            </div>
            <div class="detail-item">
                <i class="fas fa-calendar"></i>
                <div class="detail-content">
                    <div class="label">Date & Time</div>
                    <div class="value">${formatDate(new Date(currentAppointment.appointmentDate))} at ${currentAppointment.appointmentTime}</div>
                </div>
            </div>
            <div class="detail-item">
                <i class="fas fa-user-md"></i>
                <div class="detail-content">
                    <div class="label">Doctor</div>
                    <div class="value">${currentAppointment.doctorName}</div>
                </div>
            </div>
            <div class="detail-item">
                <i class="fas fa-hospital"></i>
                <div class="detail-content">
                    <div class="label">Hospital</div>
                    <div class="value">${currentAppointment.hospitalName}</div>
                </div>
            </div>
            <div class="detail-item">
                <i class="fas fa-clock"></i>
                <div class="detail-content">
                    <div class="label">Token Number</div>
                    <div class="value token-number">#${currentAppointment.tokenNumber}</div>
                </div>
            </div>
        </div>
        <div class="fee-summary">
            <div class="fee-label">
                <i class="fas fa-rupee-sign"></i>
                <span>Consultation Fee Paid</span>
            </div>
            <div class="fee-value">₹${currentAppointment.amount}</div>
        </div>
    `;
}

function downloadPDF() {
    alert('PDF download feature would be implemented here. In a real application, this would generate and download a PDF with all appointment details.');
}

// Hospital Dashboard Functions
function showHospitalTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="showHospitalTab('${tabName}')"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.hospital-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`hospital-${tabName}`).classList.add('active');
}

function loadDoctorsGrid() {
    const doctorsGrid = document.getElementById('doctors-grid');
    if (!doctorsGrid) return;
    
    // Get first 6 doctors for demo
    const hospitalDoctors = DOCTORS.slice(0, 6);
    doctorsGrid.innerHTML = '';
    
    hospitalDoctors.forEach(doctor => {
        const doctorCard = createDoctorCard(doctor);
        doctorsGrid.appendChild(doctorCard);
    });
}

function createDoctorCard(doctor) {
    const div = document.createElement('div');
    div.className = 'doctor-card';
    div.onclick = () => viewDoctorDetails(doctor);
    div.innerHTML = `
        <div class="doctor-card-header">
            <div class="doctor-basic-info">
                <div class="doctor-avatar">${doctor.name.charAt(3)}</div>
                <div class="doctor-name-info">
                    <h3>${doctor.name}</h3>
                    <p>${doctor.degree}</p>
                </div>
            </div>
            <div class="doctor-status ${doctor.onDuty ? 'on-duty' : 'off-duty'}">
                ${doctor.onDuty ? 'On Duty' : 'Off Duty'}
            </div>
        </div>
        <div class="specialization-tag">${doctor.specialization}</div>
        <div class="doctor-appointments">
            <i class="fas fa-calendar"></i>
            ${doctor.appointmentsToday} appointments today
        </div>
        <a href="#" class="view-patients-btn">View Patient List →</a>
    `;
    return div;
}

function viewDoctorDetails(doctor) {
    alert(`Doctor Details:\n\nName: ${doctor.name}\nSpecialization: ${doctor.specialization}\nDegree: ${doctor.degree}\nStatus: ${doctor.onDuty ? 'On Duty' : 'Off Duty'}\nAppointments Today: ${doctor.appointmentsToday}\n\nIn a real application, this would show detailed patient list and management options.`);
}

// Utility Functions (already defined in data.js but repeated here for completeness)
if (typeof generateReferenceId === 'undefined') {
    function generateReferenceId() {
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const random = Math.random().toString(36).substr(2, 4).toUpperCase();
        return `H360-${date}-${random}`;
    }
}

if (typeof generateTokenNumber === 'undefined') {
    function generateTokenNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }
}

if (typeof formatDate === 'undefined') {
    function formatDate(date) {
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

if (typeof getCurrentLocation === 'undefined') {
    function getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported'));
            }
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }
}