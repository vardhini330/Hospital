import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Search, Star, Clock, IndianRupee } from 'lucide-react';
import { CITIES, HOSPITALS, DOCTORS } from '../../utils/constants';
import { Patient, Hospital, Doctor, Appointment } from '../../types';
import { generateReferenceId, generateTokenNumber } from '../../utils/helpers';

interface BookAppointmentProps {
  patient: Patient;
  onBack: () => void;
  onConfirm: (appointment: Appointment) => void;
}

const BookAppointment: React.FC<BookAppointmentProps> = ({ patient, onBack, onConfirm }) => {
  const [step, setStep] = useState(1);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [appointmentForm, setAppointmentForm] = useState({
    age: patient.age.toString(),
    gender: '',
    symptoms: ''
  });

  const filteredCities = CITIES.filter(city => 
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableHospitals = selectedCity ? HOSPITALS[selectedCity as keyof typeof HOSPITALS] || [] : [];
  
  const filteredHospitals = availableHospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableDoctors = selectedHospital 
    ? DOCTORS.filter(doctor => doctor.hospitalId === selectedHospital.id)
    : [];

  const filteredDoctors = availableDoctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setSearchTerm('');
    setStep(2);
  };

  const handleHospitalSelect = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setSearchTerm('');
    setStep(3);
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setStep(4);
  };

  const handleConfirmAppointment = () => {
    if (!selectedHospital || !selectedDoctor) return;

    const appointment: Appointment = {
      id: generateReferenceId(),
      patientName: patient.fullName,
      age: parseInt(appointmentForm.age),
      gender: appointmentForm.gender,
      symptoms: appointmentForm.symptoms,
      hospitalName: selectedHospital.name,
      doctorName: selectedDoctor.name,
      appointmentDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      appointmentTime: '10:00 AM',
      tokenNumber: generateTokenNumber(),
      referenceId: generateReferenceId(),
      amount: 500
    };

    onConfirm(appointment);
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Select City</h2>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for your city"
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {filteredCities.map((city) => (
          <motion.button
            key={city}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCitySelect(city)}
            className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-left"
          >
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-blue-500 mr-3" />
              <span className="font-medium">{city}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Select Hospital in {selectedCity}</h2>
        <button
          onClick={() => setStep(1)}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Change City
        </button>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for hospitals"
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredHospitals.map((hospital) => (
          <motion.button
            key={hospital.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleHospitalSelect(hospital)}
            className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-left"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{hospital.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{hospital.address}</p>
                <div className="flex items-center mt-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">Rank #{hospital.popularityRank}</span>
                </div>
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Popular
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Select Doctor</h2>
        <button
          onClick={() => setStep(2)}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Change Hospital
        </button>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800">{selectedHospital?.name}</h3>
        <p className="text-blue-600 text-sm">{selectedHospital?.address}</p>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search doctors by name or specialization"
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredDoctors.map((doctor) => (
          <motion.button
            key={doctor.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleDoctorSelect(doctor)}
            className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-left"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                <p className="text-gray-600 text-sm">{doctor.degree}</p>
                <div className="flex items-center mt-2 space-x-4">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                    {doctor.specialization}
                  </span>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    {doctor.appointmentsToday} appointments today
                  </div>
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
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Appointment Details</h2>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Selected Doctor</h3>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            {selectedDoctor?.name.charAt(3)}
          </div>
          <div>
            <h4 className="font-semibold">{selectedDoctor?.name}</h4>
            <p className="text-sm text-gray-600">{selectedDoctor?.specialization}</p>
            <p className="text-sm text-gray-600">{selectedHospital?.name}</p>
          </div>
        </div>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient Name
          </label>
          <input
            type="text"
            value={patient.fullName}
            disabled
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              value={appointmentForm.age}
              onChange={(e) => setAppointmentForm(prev => ({ ...prev, age: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender (Optional)
            </label>
            <select
              value={appointmentForm.gender}
              onChange={(e) => setAppointmentForm(prev => ({ ...prev, gender: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Symptoms (Optional)
          </label>
          <textarea
            value={appointmentForm.symptoms}
            onChange={(e) => setAppointmentForm(prev => ({ ...prev, symptoms: e.target.value }))}
            placeholder="Describe your symptoms or reason for visit"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-600 mt-2">
            You can also use voice input or detailed text to describe your symptoms
          </p>
        </div>
      </form>

      <div className="bg-green-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-green-800">Consultation Fee</h4>
            <p className="text-sm text-green-600">Includes appointment booking and consultation</p>
          </div>
          <div className="flex items-center text-2xl font-bold text-green-600">
            <IndianRupee className="w-6 h-6" />
            500
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleConfirmAppointment}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Proceed to Payment
      </motion.button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </motion.button>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-800">Book Appointment</h1>
                <div className="text-sm text-gray-600">Step {step} of 4</div>
              </div>
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full ${
                      i <= step ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;