import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Calendar, LogOut, MapPin, Phone } from 'lucide-react';
import { Patient } from '../../types';
import { getCurrentLocation } from '../../utils/helpers';

interface PatientDashboardProps {
  patient: Patient;
  onBookAppointment: () => void;
  onLogout: () => void;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ patient, onBookAppointment, onLogout }) => {
  const handleEmergencySOS = async () => {
    try {
      const position = await getCurrentLocation();
      const { latitude, longitude } = position.coords;
      
      // Simulate emergency alert
      alert(`Emergency SOS Alert Sent!\nLocation: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}\nNearest ambulance has been notified.`);
      
      // In a real app, this would send data to emergency services
      console.log('Emergency alert sent with location:', { latitude, longitude });
    } catch (error) {
      alert('Unable to get location. Emergency alert sent with registered address.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Welcome, {patient.fullName}</h1>
              <p className="text-gray-600">Your health is our priority</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>

          <div className="bg-white rounded-lg p-4 mb-8 shadow-sm border">
            <div className="flex items-center text-sm text-gray-600 space-x-6">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                {patient.contactNumber}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Age: {patient.age}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleEmergencySOS}
            className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer p-8 text-white"
          >
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full"
              >
                <AlertTriangle className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-4">Emergency Ambulance SOS</h2>
              <p className="text-red-100 mb-6">
                Tap here for immediate emergency assistance. Your location will be shared with the nearest available ambulance.
              </p>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="flex items-center justify-center text-sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  Location tracking enabled
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBookAppointment}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer p-8 text-white"
          >
            <div className="text-center">
              <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
              <p className="text-green-100 mb-6">
                Schedule an appointment with top doctors at leading hospitals. Easy booking with instant confirmation.
              </p>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-sm space-y-2">
                  <div className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                    Choose from 1000+ doctors
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                    Instant confirmation
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-600">Emergency Service</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">500+</div>
                <div className="text-sm text-gray-600">Hospitals</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">1000+</div>
                <div className="text-sm text-gray-600">Doctors</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">50+</div>
                <div className="text-sm text-gray-600">Cities</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PatientDashboard;