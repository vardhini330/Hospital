import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download, ArrowLeft, Calendar, Clock, MapPin, User, Hash, IndianRupee } from 'lucide-react';
import { Appointment } from '../../types';
import { formatDate, formatTime } from '../../utils/helpers';

interface AppointmentConfirmationProps {
  appointment: Appointment;
  onBackToDashboard: () => void;
}

const AppointmentConfirmation: React.FC<AppointmentConfirmationProps> = ({ appointment, onBackToDashboard }) => {
  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    alert('PDF download feature would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="mb-6"
            >
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Appointment Confirmed!</h1>
              <p className="text-gray-600 mb-8">Your appointment has been successfully booked</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mb-8 text-left"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">Appointment Details</h2>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Hash className="w-5 h-5 text-blue-500 mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Reference ID</div>
                      <div className="font-semibold">{appointment.referenceId}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-blue-500 mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Patient Name</div>
                      <div className="font-semibold">{appointment.patientName}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-blue-500 mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Date & Time</div>
                      <div className="font-semibold">
                        {formatDate(new Date(appointment.appointmentDate))} at {appointment.appointmentTime}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-green-500 mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Doctor</div>
                      <div className="font-semibold">{appointment.doctorName}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-green-500 mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Hospital</div>
                      <div className="font-semibold">{appointment.hospitalName}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-green-500 mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Token Number</div>
                      <div className="font-semibold text-2xl text-green-600">#{appointment.tokenNumber}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <IndianRupee className="w-5 h-5 text-gray-600 mr-2" />
                    <span className="text-gray-600">Consultation Fee Paid</span>
                  </div>
                  <div className="text-xl font-bold text-green-600">₹{appointment.amount}</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="space-y-4"
            >
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">Important Instructions</h3>
                <ul className="text-sm text-yellow-700 space-y-1 text-left">
                  <li>• Please arrive 15 minutes before your appointment time</li>
                  <li>• Bring a valid ID and your reference number</li>
                  <li>• Carry any previous medical reports if available</li>
                  <li>• Your token number will be called for consultation</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownloadPDF}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onBackToDashboard}
                  className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Dashboard
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;