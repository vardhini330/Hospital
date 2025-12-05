import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Clock, Calendar, Phone } from 'lucide-react';
import { Doctor } from '../../types';

interface DoctorOverviewProps {
  doctors: Doctor[];
}

const DoctorOverview: React.FC<DoctorOverviewProps> = ({ doctors }) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const mockPatients = [
    { id: 1, name: 'Rahul Sharma', symptoms: 'Chest pain, shortness of breath', tokenNumber: 15, referenceId: 'H360-20250101-ABC1' },
    { id: 2, name: 'Priya Patel', symptoms: 'High fever, headache', tokenNumber: 16, referenceId: 'H360-20250101-ABC2' },
    { id: 3, name: 'Amit Kumar', symptoms: 'Back pain, muscle stiffness', tokenNumber: 17, referenceId: 'H360-20250101-ABC3' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {!selectedDoctor ? (
        <>
          <h2 className="text-2xl font-bold text-gray-800">Doctor Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <motion.div
                key={doctor.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedDoctor(doctor)}
                className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {doctor.name.charAt(3)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.degree}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    doctor.onDuty 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {doctor.onDuty ? 'On Duty' : 'Off Duty'}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                    {doctor.specialization}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mt-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {doctor.appointmentsToday} appointments today
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    View Patient List →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Doctor Overview
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                {selectedDoctor.name.charAt(3)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedDoctor.name}</h2>
                <p className="text-gray-600">{selectedDoctor.degree}</p>
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium inline-block mt-2">
                  {selectedDoctor.specialization}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{selectedDoctor.appointmentsToday}</div>
                <div className="text-sm text-gray-600">Today's Appointments</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{selectedDoctor.onDuty ? 'On' : 'Off'}</div>
                <div className="text-sm text-gray-600">Duty Status</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">8</div>
                <div className="text-sm text-gray-600">Hours Today</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">4.8</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Today's Patient List</h3>
            <div className="space-y-4">
              {mockPatients.map((patient) => (
                <div key={patient.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <User className="w-5 h-5 text-blue-500 mr-2" />
                        <h4 className="font-semibold text-gray-800">{patient.name}</h4>
                        <div className="ml-4 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          Token #{patient.tokenNumber}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{patient.symptoms}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        Reference: {patient.referenceId}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                        Call Patient
                      </button>
                      <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DoctorOverview;