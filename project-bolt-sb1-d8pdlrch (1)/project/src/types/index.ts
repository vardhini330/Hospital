export interface Patient {
  fullName: string;
  age: number;
  dateOfBirth: string;
  contactNumber: string;
  email: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  popularityRank: number;
}

export interface Doctor {
  id: string;
  name: string;
  degree: string;
  specialization: string;
  hospitalId: string;
  hospitalLocation: string;
  onDuty: boolean;
  appointmentsToday: number;
}

export interface Appointment {
  id: string;
  patientName: string;
  age?: number;
  gender?: string;
  symptoms?: string;
  hospitalName: string;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  tokenNumber: number;
  referenceId: string;
  amount: number;
}

export interface HospitalAdmin {
  hospitalName: string;
  hospitalCode: string;
  adminEmail: string;
  password: string;
}

export interface BedStatus {
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  icuBeds: { total: number; occupied: number; available: number };
  generalWard: { total: number; occupied: number; available: number };
  emergencyBeds: { total: number; occupied: number; available: number };
}