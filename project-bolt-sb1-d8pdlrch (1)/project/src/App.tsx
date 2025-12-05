import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import LoginSelection from './components/LoginSelection';
import PatientLogin from './components/patient/PatientLogin';
import PatientDashboard from './components/patient/PatientDashboard';
import BookAppointment from './components/patient/BookAppointment';
import AppointmentConfirmation from './components/patient/AppointmentConfirmation';
import HospitalLogin from './components/hospital/HospitalLogin';
import HospitalDashboard from './components/hospital/HospitalDashboard';
import { Patient, HospitalAdmin, Appointment } from './types';

type AppState = 'splash' | 'loginSelection' | 'patientLogin' | 'patientDashboard' | 'bookAppointment' | 'appointmentConfirmation' | 'hospitalLogin' | 'hospitalDashboard';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('splash');
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [currentHospitalAdmin, setCurrentHospitalAdmin] = useState<HospitalAdmin | null>(null);
  const [currentAppointment, setCurrentAppointment] = useState<Appointment | null>(null);

  const handleSplashComplete = () => {
    setCurrentState('loginSelection');
  };

  const handlePatientLoginSelect = () => {
    setCurrentState('patientLogin');
  };

  const handleHospitalLoginSelect = () => {
    setCurrentState('hospitalLogin');
  };

  const handlePatientLogin = (patient: Patient) => {
    setCurrentPatient(patient);
    setCurrentState('patientDashboard');
  };

  const handleHospitalLogin = (admin: HospitalAdmin) => {
    setCurrentHospitalAdmin(admin);
    setCurrentState('hospitalDashboard');
  };

  const handleBookAppointment = () => {
    setCurrentState('bookAppointment');
  };

  const handleAppointmentConfirm = (appointment: Appointment) => {
    setCurrentAppointment(appointment);
    setCurrentState('appointmentConfirmation');
  };

  const handleBackToSelection = () => {
    setCurrentState('loginSelection');
    setCurrentPatient(null);
    setCurrentHospitalAdmin(null);
  };

  const handleBackToDashboard = () => {
    if (currentPatient) {
      setCurrentState('patientDashboard');
    } else if (currentHospitalAdmin) {
      setCurrentState('hospitalDashboard');
    }
  };

  const handleLogout = () => {
    setCurrentState('loginSelection');
    setCurrentPatient(null);
    setCurrentHospitalAdmin(null);
    setCurrentAppointment(null);
  };

  const renderCurrentScreen = () => {
    switch (currentState) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      
      case 'loginSelection':
        return (
          <LoginSelection
            onPatientLogin={handlePatientLoginSelect}
            onHospitalLogin={handleHospitalLoginSelect}
          />
        );
      
      case 'patientLogin':
        return (
          <PatientLogin
            onBack={handleBackToSelection}
            onLogin={handlePatientLogin}
          />
        );
      
      case 'patientDashboard':
        return currentPatient ? (
          <PatientDashboard
            patient={currentPatient}
            onBookAppointment={handleBookAppointment}
            onLogout={handleLogout}
          />
        ) : <Navigate to="/login-selection" replace />;
      
      case 'bookAppointment':
        return currentPatient ? (
          <BookAppointment
            patient={currentPatient}
            onBack={handleBackToDashboard}
            onConfirm={handleAppointmentConfirm}
          />
        ) : <Navigate to="/login-selection" replace />;
      
      case 'appointmentConfirmation':
        return currentAppointment ? (
          <AppointmentConfirmation
            appointment={currentAppointment}
            onBackToDashboard={handleBackToDashboard}
          />
        ) : <Navigate to="/login-selection" replace />;
      
      case 'hospitalLogin':
        return (
          <HospitalLogin
            onBack={handleBackToSelection}
            onLogin={handleHospitalLogin}
          />
        );
      
      case 'hospitalDashboard':
        return currentHospitalAdmin ? (
          <HospitalDashboard
            admin={currentHospitalAdmin}
            onLogout={handleLogout}
          />
        ) : <Navigate to="/login-selection" replace />;
      
      default:
        return <Navigate to="/splash" replace />;
    }
  };

  return (
    <div className="App">
      {renderCurrentScreen()}
    </div>
  );
}

export default App;