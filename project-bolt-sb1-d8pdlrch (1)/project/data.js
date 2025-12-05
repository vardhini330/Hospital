// Application Data
const CITIES = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
    'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur'
];

const HOSPITALS = {
    Mumbai: [
        { id: '1', name: 'Fortis Hospital Mulund', address: 'Mulund West, Mumbai', city: 'Mumbai', popularityRank: 1 },
        { id: '2', name: 'Lilavati Hospital', address: 'Bandra West, Mumbai', city: 'Mumbai', popularityRank: 2 },
        { id: '3', name: 'Kokilaben Dhirubhai Ambani Hospital', address: 'Andheri West, Mumbai', city: 'Mumbai', popularityRank: 3 },
        { id: '4', name: 'Hinduja Hospital', address: 'Mahim, Mumbai', city: 'Mumbai', popularityRank: 4 },
        { id: '5', name: 'Breach Candy Hospital', address: 'Breach Candy, Mumbai', city: 'Mumbai', popularityRank: 5 }
    ],
    Delhi: [
        { id: '6', name: 'All India Institute of Medical Sciences', address: 'Ansari Nagar, Delhi', city: 'Delhi', popularityRank: 1 },
        { id: '7', name: 'Max Super Speciality Hospital', address: 'Saket, Delhi', city: 'Delhi', popularityRank: 2 },
        { id: '8', name: 'Apollo Hospital', address: 'Sarita Vihar, Delhi', city: 'Delhi', popularityRank: 3 },
        { id: '9', name: 'Fortis Hospital', address: 'Shalimar Bagh, Delhi', city: 'Delhi', popularityRank: 4 },
        { id: '10', name: 'Sir Ganga Ram Hospital', address: 'Rajinder Nagar, Delhi', city: 'Delhi', popularityRank: 5 }
    ],
    Bangalore: [
        { id: '11', name: 'Manipal Hospital', address: 'HAL Airport Road, Bangalore', city: 'Bangalore', popularityRank: 1 },
        { id: '12', name: 'Fortis Hospital', address: 'Bannerghatta Road, Bangalore', city: 'Bangalore', popularityRank: 2 },
        { id: '13', name: 'Apollo Hospital', address: 'Jayanagar, Bangalore', city: 'Bangalore', popularityRank: 3 },
        { id: '14', name: 'Narayana Health', address: 'Bommasandra, Bangalore', city: 'Bangalore', popularityRank: 4 },
        { id: '15', name: 'Columbia Asia Hospital', address: 'Whitefield, Bangalore', city: 'Bangalore', popularityRank: 5 }
    ],
    Chennai: [
        { id: '16', name: 'Apollo Hospital', address: 'Greams Road, Chennai', city: 'Chennai', popularityRank: 1 },
        { id: '17', name: 'Fortis Malar Hospital', address: 'Adyar, Chennai', city: 'Chennai', popularityRank: 2 },
        { id: '18', name: 'MIOT International', address: 'Manapakkam, Chennai', city: 'Chennai', popularityRank: 3 }
    ],
    Kolkata: [
        { id: '19', name: 'Apollo Gleneagles Hospital', address: 'EM Bypass, Kolkata', city: 'Kolkata', popularityRank: 1 },
        { id: '20', name: 'Fortis Hospital', address: 'Anandapur, Kolkata', city: 'Kolkata', popularityRank: 2 },
        { id: '21', name: 'AMRI Hospital', address: 'Salt Lake, Kolkata', city: 'Kolkata', popularityRank: 3 }
    ],
    Hyderabad: [
        { id: '22', name: 'Apollo Hospital', address: 'Jubilee Hills, Hyderabad', city: 'Hyderabad', popularityRank: 1 },
        { id: '23', name: 'CARE Hospital', address: 'Banjara Hills, Hyderabad', city: 'Hyderabad', popularityRank: 2 },
        { id: '24', name: 'Continental Hospital', address: 'Gachibowli, Hyderabad', city: 'Hyderabad', popularityRank: 3 }
    ]
};

const DOCTORS = [
    { id: '1', name: 'Dr. Rajesh Kumar', degree: 'MBBS, MD', specialization: 'Cardiology', hospitalId: '1', hospitalLocation: 'Fortis Hospital Mulund', onDuty: true, appointmentsToday: 12 },
    { id: '2', name: 'Dr. Priya Sharma', degree: 'MBBS, MS', specialization: 'Orthopedics', hospitalId: '1', hospitalLocation: 'Fortis Hospital Mulund', onDuty: true, appointmentsToday: 8 },
    { id: '3', name: 'Dr. Amit Patel', degree: 'MBBS, DM', specialization: 'Neurology', hospitalId: '2', hospitalLocation: 'Lilavati Hospital', onDuty: false, appointmentsToday: 0 },
    { id: '4', name: 'Dr. Sunita Reddy', degree: 'MBBS, MD', specialization: 'Pediatrics', hospitalId: '2', hospitalLocation: 'Lilavati Hospital', onDuty: true, appointmentsToday: 15 },
    { id: '5', name: 'Dr. Vikram Singh', degree: 'MBBS, MS', specialization: 'General Surgery', hospitalId: '3', hospitalLocation: 'Kokilaben Dhirubhai Ambani Hospital', onDuty: true, appointmentsToday: 6 },
    { id: '6', name: 'Dr. Meera Joshi', degree: 'MBBS, MD', specialization: 'Dermatology', hospitalId: '3', hospitalLocation: 'Kokilaben Dhirubhai Ambani Hospital', onDuty: true, appointmentsToday: 10 },
    { id: '7', name: 'Dr. Arjun Mehta', degree: 'MBBS, DM', specialization: 'Gastroenterology', hospitalId: '6', hospitalLocation: 'AIIMS Delhi', onDuty: true, appointmentsToday: 14 },
    { id: '8', name: 'Dr. Kavya Nair', degree: 'MBBS, MD', specialization: 'Psychiatry', hospitalId: '7', hospitalLocation: 'Max Super Speciality Hospital', onDuty: true, appointmentsToday: 9 },
    { id: '9', name: 'Dr. Rohit Gupta', degree: 'MBBS, MS', specialization: 'Ophthalmology', hospitalId: '11', hospitalLocation: 'Manipal Hospital Bangalore', onDuty: true, appointmentsToday: 11 },
    { id: '10', name: 'Dr. Anita Desai', degree: 'MBBS, MD', specialization: 'Gynecology', hospitalId: '12', hospitalLocation: 'Fortis Hospital Bangalore', onDuty: true, appointmentsToday: 13 }
];

// Mock patient data for hospital dashboard
const MOCK_PATIENTS = [
    { id: 1, name: 'Rahul Sharma', symptoms: 'Chest pain, shortness of breath', tokenNumber: 15, referenceId: 'H360-20250101-ABC1', doctorId: '1' },
    { id: 2, name: 'Priya Patel', symptoms: 'High fever, headache', tokenNumber: 16, referenceId: 'H360-20250101-ABC2', doctorId: '1' },
    { id: 3, name: 'Amit Kumar', symptoms: 'Back pain, muscle stiffness', tokenNumber: 17, referenceId: 'H360-20250101-ABC3', doctorId: '2' },
    { id: 4, name: 'Sneha Gupta', symptoms: 'Skin rash, itching', tokenNumber: 18, referenceId: 'H360-20250101-ABC4', doctorId: '6' },
    { id: 5, name: 'Ravi Krishnan', symptoms: 'Stomach pain, nausea', tokenNumber: 19, referenceId: 'H360-20250101-ABC5', doctorId: '5' }
];

// Utility functions
function generateReferenceId() {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `H360-${date}-${random}`;
}

function generateTokenNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function formatDate(date) {
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(date) {
    return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported'));
        }
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}