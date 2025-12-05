export const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
  'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur'
];

export const HOSPITALS = {
  Mumbai: [
    { id: '1', name: 'Fortis Hospital Mulund', address: 'Mulund West, Mumbai', city: 'Mumbai', popularityRank: 1 },
    { id: '2', name: 'Lilavati Hospital', address: 'Bandra West, Mumbai', city: 'Mumbai', popularityRank: 2 },
    { id: '3', name: 'Kokilaben Dhirubhai Ambani Hospital', address: 'Andheri West, Mumbai', city: 'Mumbai', popularityRank: 3 },
  ],
  Delhi: [
    { id: '4', name: 'All India Institute of Medical Sciences', address: 'Ansari Nagar, Delhi', city: 'Delhi', popularityRank: 1 },
    { id: '5', name: 'Max Super Speciality Hospital', address: 'Saket, Delhi', city: 'Delhi', popularityRank: 2 },
    { id: '6', name: 'Apollo Hospital', address: 'Sarita Vihar, Delhi', city: 'Delhi', popularityRank: 3 },
  ],
  Bangalore: [
    { id: '7', name: 'Manipal Hospital', address: 'HAL Airport Road, Bangalore', city: 'Bangalore', popularityRank: 1 },
    { id: '8', name: 'Fortis Hospital', address: 'Bannerghatta Road, Bangalore', city: 'Bangalore', popularityRank: 2 },
    { id: '9', name: 'Apollo Hospital', address: 'Jayanagar, Bangalore', city: 'Bangalore', popularityRank: 3 },
  ],
};

export const DOCTORS = [
  { id: '1', name: 'Dr. Rajesh Kumar', degree: 'MBBS, MD', specialization: 'Cardiology', hospitalId: '1', hospitalLocation: 'Fortis Hospital Mulund', onDuty: true, appointmentsToday: 12 },
  { id: '2', name: 'Dr. Priya Sharma', degree: 'MBBS, MS', specialization: 'Orthopedics', hospitalId: '1', hospitalLocation: 'Fortis Hospital Mulund', onDuty: true, appointmentsToday: 8 },
  { id: '3', name: 'Dr. Amit Patel', degree: 'MBBS, DM', specialization: 'Neurology', hospitalId: '2', hospitalLocation: 'Lilavati Hospital', onDuty: false, appointmentsToday: 0 },
  { id: '4', name: 'Dr. Sunita Reddy', degree: 'MBBS, MD', specialization: 'Pediatrics', hospitalId: '2', hospitalLocation: 'Lilavati Hospital', onDuty: true, appointmentsToday: 15 },
];