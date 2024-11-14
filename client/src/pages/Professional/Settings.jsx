import React, { useState, useEffect } from "react";
import { getInformationData } from "../../authentication/authentication";
import {
  setUpdateProfessionalPreferences,
  getProfessionalPreferences,
} from "../../api/professionals";

const Settings = () => {
  const user = getInformationData();
  const [formData, setFormData] = useState({
    issues: {
      depression: false,
      anxiety: false,
      stress: false,
    },
    id: user.id,
    service_fee: "",
  });
  const [ageRange, setAgeRange] = useState(""); // Separate state for ageRange

  useEffect(() => {
    const fetchPreferences = async () => {
      const data = await getProfessionalPreferences(user.id);
      console.log(data);

      const issuesArray = data.preferences[0].mental_issue
        .split(", ")
        .filter(Boolean);
      const issuesObject = {
        depression: issuesArray.includes("depression"),
        anxiety: issuesArray.includes("anxiety"),
        stress: issuesArray.includes("stress"),
      };

      setFormData((prevData) => ({
        ...prevData,
        issues: issuesObject,
        service_fee: data.service_fee,
      }));
      setAgeRange(
        data.preferences[0].start_age + "-" + data.preferences[0].end_age
      );
    };
    fetchPreferences();
  }, [user.id]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [startAge, endAge] = ageRange.split("-").map(Number);

    const updatedFormData = {
      ...formData,
      startAge,
      endAge,
    };

    console.log(updatedFormData);
    await setUpdateProfessionalPreferences(updatedFormData);
  };

  const handleAgeRangeChange = (e) => {
    setAgeRange(e.target.value); // Update the ageRange state
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      issues: {
        ...prevData.issues,
        [name]: checked,
      },
    }));
  };
  const handleFeeChange = (event) => {
    setFormData({
      ...formData,
      service_fee: event.target.value,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto my-6 pt-28">
      <h2 className="text-xl font-semibold mb-4">Professional Preferences</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block">
            <span className="text-gray-700">Age Range</span>
            <select
              value={ageRange}
              onChange={handleAgeRangeChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-200 rounded-md"
            >
              <option value="">Select an age range</option>
              <option value="18-25">18-25</option>
              <option value="26-40">26-40</option>
              <option value="40-100">40 and above</option>
            </select>
          </label>
        </div>

        <h3 className="font-semibold mb-2">Mental Health Issues</h3>
        <div className="space-y-2 mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="depression"
              checked={formData.issues.depression}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            Depression
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="anxiety"
              checked={formData.issues.anxiety}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            Anxiety
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="stress"
              checked={formData.issues.stress}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            Stress
          </label>
        </div>
        <h3 className="font-semibold mb-2">Service Fee</h3>
        <div className="space-y-2 mb-4">
          <input
            type="number"
            name="fee"
            value={formData.service_fee} // use `value` for a text input
            onChange={handleFeeChange}
            className="mr-2"
            placeholder="Enter service fee"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
