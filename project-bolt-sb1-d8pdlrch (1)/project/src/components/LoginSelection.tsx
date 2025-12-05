import React from 'react';
import { motion } from 'framer-motion';
import { User, Building2, Heart } from 'lucide-react';

interface LoginSelectionProps {
  onPatientLogin: () => void;
  onHospitalLogin: () => void;
}

const LoginSelection: React.FC<LoginSelectionProps> = ({ onPatientLogin, onHospitalLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-red-500 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">HospitalLink 360</h1>
          </div>
          <p className="text-gray-600">Choose your login type to continue</p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onPatientLogin}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer p-8 border border-gray-100"
          >
            <div className="text-center">
              <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full">
                <User className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Login as Patient</h2>
              <p className="text-gray-600 mb-6">
                Book appointments, access emergency services, and manage your healthcare needs
              </p>
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="text-sm text-blue-800 space-y-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Emergency SOS Alert
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Book Appointments
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Find Doctors & Hospitals
                  </div>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Continue as Patient
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onHospitalLogin}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer p-8 border border-gray-100"
          >
            <div className="text-center">
              <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
                <Building2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Login as Hospital Management</h2>
              <p className="text-gray-600 mb-6">
                Manage doctors, monitor bed availability, and access AI-powered analytics
              </p>
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <div className="text-sm text-green-800 space-y-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Doctor Management
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Bed Availability Tracking
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    AI Analytics Dashboard
                  </div>
                </div>
              </div>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Continue as Hospital
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginSelection;