import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Users, Bed, BarChart3, AlertTriangle, Activity } from 'lucide-react';
import { HospitalAdmin, BedStatus } from '../../types';
import { DOCTORS } from '../../utils/constants';
import DoctorOverview from './DoctorOverview';
import BedAvailability from './BedAvailability';
import AIAnalytics from './AIAnalytics';

interface HospitalDashboardProps {
  admin: HospitalAdmin;
  onLogout: () => void;
}

const HospitalDashboard: React.FC<HospitalDashboardProps> = ({ admin, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const mockBedStatus: BedStatus = {
    totalBeds: 500,
    occupiedBeds: 375,
    availableBeds: 125,
    icuBeds: { total: 50, occupied: 42, available: 8 },
    generalWard: { total: 350, occupied: 280, available: 70 },
    emergencyBeds: { total: 100, occupied: 53, available: 47 }
  };

  const hospitalDoctors = DOCTORS.slice(0, 4); // Mock data
  const emergencyAlerts = 12;
  const todayAppointments = hospitalDoctors.reduce((sum, doctor) => sum + doctor.appointmentsToday, 0);

  const renderOverview = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Total Doctors</h3>
              <p className="text-3xl font-bold">{hospitalDoctors.length}</p>
            </div>
            <Users className="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Available Beds</h3>
              <p className="text-3xl font-bold">{mockBedStatus.availableBeds}</p>
            </div>
            <Bed className="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Today's Appointments</h3>
              <p className="text-3xl font-bold">{todayAppointments}</p>
            </div>
            <Activity className="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Emergency Alerts</h3>
              <p className="text-3xl font-bold">{emergencyAlerts}</p>
            </div>
            <AlertTriangle className="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Bed Occupancy Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Beds</span>
              <span className="font-semibold">{mockBedStatus.totalBeds}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Occupied</span>
              <span className="font-semibold text-red-600">{mockBedStatus.occupiedBeds}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Available</span>
              <span className="font-semibold text-green-600">{mockBedStatus.availableBeds}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-red-500 h-3 rounded-full" 
                style={{ width: `${(mockBedStatus.occupiedBeds / mockBedStatus.totalBeds) * 100}%` }}
              />
            </div>
            <div className="text-sm text-gray-600">
              {Math.round((mockBedStatus.occupiedBeds / mockBedStatus.totalBeds) * 100)}% Occupancy Rate
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-sm">New appointment booked with Dr. Rajesh Kumar</span>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm">Bed released in General Ward</span>
            </div>
            <div className="flex items-center p-3 bg-red-50 rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              <span className="text-sm">Emergency SOS alert received</span>
            </div>
            <div className="flex items-center p-3 bg-purple-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              <span className="text-sm">Dr. Priya Sharma marked as On Duty</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{admin.hospitalName}</h1>
              <p className="text-gray-600">Hospital Management Dashboard</p>
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
              <div>Hospital Code: {admin.hospitalCode}</div>
              <div>Admin: {admin.adminEmail}</div>
            </div>
          </div>
        </motion.div>

        <div className="mb-8">
          <div className="flex space-x-4 border-b border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'doctors', label: 'Doctor Management', icon: Users },
              { id: 'beds', label: 'Bed Availability', icon: Bed },
              { id: 'analytics', label: 'AI Analytics', icon: BarChart3 }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center px-4 py-2 border-b-2 font-medium transition-colors ${
                  activeTab === id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-green-600'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'doctors' && <DoctorOverview doctors={hospitalDoctors} />}
          {activeTab === 'beds' && <BedAvailability bedStatus={mockBedStatus} />}
          {activeTab === 'analytics' && <AIAnalytics />}
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;