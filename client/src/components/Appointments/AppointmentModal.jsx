import React, { useState } from "react";
import {
  setAppointment,
  changeScheduleAppointment,
} from "../../api/professionals";
const AppointmentModal = ({
  patient_id,
  professional_id,
  schedule_id,
  isOpen,
  closeModal,
}) => {
  const [formData, setFormData] = useState({
    patient_id: patient_id,
    professional_id: professional_id,
    schedule_id: schedule_id,
    scheduleDate: "",
    scheduleTime: "",
  });
  console.log(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.schedule_id) {
      await setAppointment(formData);
      console.log(formData);
      closeModal();
    } else {
      await changeScheduleAppointment(formData);
      console.log(formData);
      closeModal();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Schedule Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="scheduleDate"
              className="block text-sm font-medium text-gray-700"
            >
              Schedule Date
            </label>
            <input
              type="date"
              id="scheduleDate"
              name="scheduleDate"
              value={formData.scheduleDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="scheduleTime"
              className="block text-sm font-medium text-gray-700"
            >
              Schedule Time
            </label>
            <input
              type="time"
              id="scheduleTime"
              name="scheduleTime"
              value={formData.scheduleTime}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="mr-2 py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
