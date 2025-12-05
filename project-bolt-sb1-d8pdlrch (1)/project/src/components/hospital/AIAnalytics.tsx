import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, AlertTriangle, Activity, Brain, BarChart3 } from 'lucide-react';

const AIAnalytics: React.FC = () => {
  const emergencyAlerts = [
    { time: '10:30 AM', location: 'Andheri West', status: 'Dispatched' },
    { time: '11:15 AM', location: 'Bandra East', status: 'En Route' },
    { time: '12:45 PM', location: 'Powai', status: 'Completed' },
  ];

  const diseaseData = [
    { disease: 'Hypertension', percentage: 35, trend: 'up' },
    { disease: 'Diabetes', percentage: 28, trend: 'stable' },
    { disease: 'Respiratory Issues', percentage: 22, trend: 'down' },
    { disease: 'Cardiac Issues', percentage: 15, trend: 'up' },
  ];

  const feedbackData = [
    { category: 'Treatment Quality', score: 4.6, sentiment: 'positive' },
    { category: 'Wait Time', score: 3.8, sentiment: 'neutral' },
    { category: 'Staff Behavior', score: 4.8, sentiment: 'positive' },
    { category: 'Facilities', score: 4.2, sentiment: 'positive' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center mb-6">
        <Brain className="w-8 h-8 text-purple-500 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">AI Analytics & Intelligence</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Queue Prediction</h3>
              <p className="text-3xl font-bold">45 min</p>
              <p className="text-sm opacity-80">Avg wait time</p>
            </div>
            <TrendingUp className="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Patient Flow</h3>
              <p className="text-3xl font-bold">127</p>
              <p className="text-sm opacity-80">Today's admissions</p>
            </div>
            <Users className="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Efficiency Score</h3>
              <p className="text-3xl font-bold">89%</p>
              <p className="text-sm opacity-80">Operational efficiency</p>
            </div>
            <Activity className="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Emergency Alerts</h3>
              <p className="text-3xl font-bold">12</p>
              <p className="text-sm opacity-80">Today</p>
            </div>
            <AlertTriangle className="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
            Emergency SOS Alerts Today
          </h3>
          <div className="space-y-3">
            {emergencyAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-800">{alert.time}</div>
                  <div className="text-sm text-gray-600">{alert.location}</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  alert.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  alert.status === 'En Route' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {alert.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <BarChart3 className="w-6 h-6 text-purple-500 mr-2" />
            Disease Trend Heatmap
          </h3>
          <div className="space-y-4">
            {diseaseData.map((disease, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">{disease.disease}</span>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-800 mr-2">{disease.percentage}%</span>
                    <div className={`w-4 h-4 rounded-full ${
                      disease.trend === 'up' ? 'bg-red-500' :
                      disease.trend === 'down' ? 'bg-green-500' : 'bg-yellow-500'
                    }`} />
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full" 
                    style={{ width: `${disease.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Feedback Sentiment Analysis</h3>
          <div className="space-y-4">
            {feedbackData.map((feedback, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-800">{feedback.category}</div>
                  <div className="text-sm text-gray-600">Score: {feedback.score}/5.0</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  feedback.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                  feedback.sentiment === 'neutral' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {feedback.sentiment}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Real-Time Analytics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">156</div>
              <div className="text-sm text-gray-600">Active Patients</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">23</div>
              <div className="text-sm text-gray-600">Discharged Today</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">8</div>
              <div className="text-sm text-gray-600">Surgeries Scheduled</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">94%</div>
              <div className="text-sm text-gray-600">Bed Utilization</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">AI Recommendations</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Increase ICU staff for evening shift based on predicted admissions</li>
              <li>• Schedule preventive maintenance for equipment during low-usage hours</li>
              <li>• Optimize appointment slots to reduce wait times by 15%</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIAnalytics;