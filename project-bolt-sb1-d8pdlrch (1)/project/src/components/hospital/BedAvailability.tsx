import React from 'react';
import { motion } from 'framer-motion';
import { Bed, TrendingUp, Activity, AlertTriangle } from 'lucide-react';
import { BedStatus } from '../../types';

interface BedAvailabilityProps {
  bedStatus: BedStatus;
}

const BedAvailability: React.FC<BedAvailabilityProps> = ({ bedStatus }) => {
  const occupancyRate = (bedStatus.occupiedBeds / bedStatus.totalBeds) * 100;
  
  const predictedOccupancy = [
    { time: '6:00 AM', occupancy: 70 },
    { time: '12:00 PM', occupancy: 85 },
    { time: '6:00 PM', occupancy: 78 },
    { time: '12:00 AM', occupancy: 65 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Bed Availability Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Total Beds</h3>
              <p className="text-3xl font-bold text-blue-600">{bedStatus.totalBeds}</p>
            </div>
            <Bed className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Occupied</h3>
              <p className="text-3xl font-bold text-red-600">{bedStatus.occupiedBeds}</p>
            </div>
            <Activity className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Available</h3>
              <p className="text-3xl font-bold text-green-600">{bedStatus.availableBeds}</p>
            </div>
            <Bed className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Occupancy Rate</h3>
              <p className="text-3xl font-bold text-purple-600">{Math.round(occupancyRate)}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Bed Category Breakdown</h3>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">ICU Beds</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  bedStatus.icuBeds.available < 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {bedStatus.icuBeds.available < 5 ? 'Critical' : 'Available'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Total: </span>
                  <span className="font-semibold">{bedStatus.icuBeds.total}</span>
                </div>
                <div>
                  <span className="text-gray-600">Occupied: </span>
                  <span className="font-semibold text-red-600">{bedStatus.icuBeds.occupied}</span>
                </div>
                <div>
                  <span className="text-gray-600">Available: </span>
                  <span className="font-semibold text-green-600">{bedStatus.icuBeds.available}</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{ width: `${(bedStatus.icuBeds.occupied / bedStatus.icuBeds.total) * 100}%` }}
                />
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">General Ward</h4>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  Moderate
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Total: </span>
                  <span className="font-semibold">{bedStatus.generalWard.total}</span>
                </div>
                <div>
                  <span className="text-gray-600">Occupied: </span>
                  <span className="font-semibold text-red-600">{bedStatus.generalWard.occupied}</span>
                </div>
                <div>
                  <span className="text-gray-600">Available: </span>
                  <span className="font-semibold text-green-600">{bedStatus.generalWard.available}</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ width: `${(bedStatus.generalWard.occupied / bedStatus.generalWard.total) * 100}%` }}
                />
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">Emergency Beds</h4>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  Good
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Total: </span>
                  <span className="font-semibold">{bedStatus.emergencyBeds.total}</span>
                </div>
                <div>
                  <span className="text-gray-600">Occupied: </span>
                  <span className="font-semibold text-red-600">{bedStatus.emergencyBeds.occupied}</span>
                </div>
                <div>
                  <span className="text-gray-600">Available: </span>
                  <span className="font-semibold text-green-600">{bedStatus.emergencyBeds.available}</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${(bedStatus.emergencyBeds.occupied / bedStatus.emergencyBeds.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Based Bed Occupancy Prediction</h3>
          <div className="space-y-4">
            {predictedOccupancy.map((prediction, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">{prediction.time}</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className={`h-2 rounded-full ${
                        prediction.occupancy > 80 ? 'bg-red-500' :
                        prediction.occupancy > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${prediction.occupancy}%` }}
                    />
                  </div>
                  <span className="font-semibold text-gray-800">{prediction.occupancy}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">Predictive Insights</h4>
                <p className="text-sm text-blue-700">
                  Peak occupancy expected at 12:00 PM (85%). Consider scheduling discharges 
                  in the morning and preparing additional capacity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BedAvailability;