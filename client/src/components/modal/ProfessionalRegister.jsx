import React, { useState, useEffect } from "react";
import { professional_register } from "../../api/register";
import RegistrationConfirmationModal from "./RegistrationConfirmationModal";
import {
  sendOtp,
  retrieveSpecificProfessional,
  editProfessional,
} from "../../api/professionals";
import Otp from "./Otp";
import { showToast } from "../utils/alertHelper";

function ProfessionalRegister({ onCancel, type, id }) {
  const [showModal, setShowModal] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
    profession: "Psychologist",
    specialization: "",
    experience: "",
    license: "",
    documents: [],
    bio: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    console.log(formData);
  };

  useEffect(() => {
    if (type === "EditProfessional" && id) {
      const fetchProfessional = async () => {
        try {
          const response = await retrieveSpecificProfessional(id);

          setFormData({
            id: response[0].professional_id,
            firstname: response[0].firstname,
            lastname: response[0].lastname,
            email: response[0].email,
            license: response[0].license,
            experience: response[0].experience,
            profession: response[0].type,
            specialization: response[0].specialization,
            contact: response[0].contact_number,
            bio: response[0].bio,
            address: response[0].address,
          });
        } catch (error) {
          console.error("Error fetching professional data: ", error);
        }
      };
      fetchProfessional();
    }
  }, [type, id]);

  const handleSubmit = async () => {
    if (type === "ProfessionalRegister") {
      await professional_register(formData);

      onCancel();
    } else if (type === "EditProfessional") {
      await editProfessional(formData);

      onCancel();
    }
    setFormData({
      firstname: "",
      lastname: "",
      contact: "",
      email: "",
      password: "",
      confirmPassword: "",
      profession: "",
      specialization: "",
      experience: "",
      license: "",
      documents: [],
      bio: "",
      address: "",
    });
    onCancel();
  };

  const showDetails = () => {
    setShowModal(true);
  };
  const hideDetails = () => {
    setShowModal(false);
  };

  const handleOtp = async () => {
    hideDetails();
    const data = await sendOtp(formData);
    console.log("Handle OTp");
    if (data !== undefined) {
      setOtp(data);
      setShowOtp(true);
    } else {
      handleCloseOtp();
    }
  };
  const handleCloseOtp = () => {
    setShowOtp(false);
  };

  const handleRoute = async () => {
    if (type === "EditProfessional" && id) {
      await handleSubmit();
    } else {
      await handleOtp();
    }
  };

  const handleOtpValidation = async (userOtp) => {
    console.log(userOtp);
    console.log(otp);
    if (String(userOtp) === String(otp)) {
      await handleSubmit();
    } else {
      showToast("error", "Incorrect OTP. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full ">
        <div className="p-4 border-b flex justify-between items-center">
          <h5 className="text-2xl font-bold text-green-600">
            {type === "EditProfessional"
              ? "Edit Information"
              : "Professionals Sign Up"}
          </h5>
          <button
            type="button"
            className="text-gray-600 hover:text-gray-800"
            onClick={onCancel}
          >
            &times;
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2"
        >
          <div>
            <label htmlFor="firstname" className="block text-sm font-medium">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
              placeholder="Enter First Name"
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastname" className="block text-sm font-medium">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
              placeholder="Enter Last Name"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>

          {type === "EditProfessional" && (
            <>
              <div className="form-group my-2">
                <label htmlFor="bio" className="block">
                  Bio
                </label>
                <input
                  type="text"
                  className="form-control w-full rounded-lg px-4 py-2 border border-gray-300"
                  id="bio"
                  placeholder="Enter Bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <div>
            <label htmlFor="contact" className="block text-sm font-medium">
              Contact Number
            </label>
            <input
              type="number"
              id="contact"
              name="contact"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
              placeholder="Enter Contact Number"
              value={formData.contact}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {type !== "EditProfessional" && (
            <>
              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="profession" className="block text-sm font-medium">
              Profession Type
            </label>
            <select
              id="profession"
              name="profession"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
              value={formData.profession}
              onChange={handleChange}
            >
              <option value="Psychologist">Psychologist</option>
              <option value="Psychiatrist">Psychiatrist</option>
            </select>
          </div>
          {formData.profession === "Psychologist" ? (
            <>
              <div>
                <label htmlFor="special" className="block text-sm font-medium">
                  Specialization
                </label>
                <select
                  id="specialization"
                  name="specialization"
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
                  value={formData.specialization}
                  onChange={handleChange}
                >
                  <option value="Counseling">Counseling</option>
                  <option value="Social">Social</option>
                  <option value="Health">Health</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="special" className="block text-sm font-medium">
                  Specialization
                </label>
                <select
                  id="specialization"
                  name="specialization"
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
                  value={formData.specialization}
                  onChange={handleChange}
                >
                  <option value="Geriatric">Geriatric</option>
                  <option value="Child and adolescent">
                    Child and adolescent
                  </option>
                  <option value="Community">Community</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label htmlFor="experience" className="block text-sm font-medium">
              Years of Experience
            </label>
            <input
              type="number"
              id="experience"
              name="experience"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
              placeholder="Enter Years of Experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="license" className="block text-sm font-medium">
              License Number
            </label>
            <input
              type="number"
              id="license"
              name="license"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
              placeholder="Enter License Number"
              value={formData.license}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="license" className="block text-sm font-medium">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          {type !== "EditProfessional" && (
            <>
              <div className="sm:col-span-2">
                <label
                  htmlFor="documents"
                  className="block text-sm font-medium"
                >
                  Upload Valid PRC ID or Valid Certificates
                </label>
                <input
                  type="file"
                  id="documents"
                  name="documents"
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
                  onChange={handleChange}
                  multiple
                />
              </div>
            </>
          )}

          <div className="sm:col-span-2 flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={showDetails}
              className="bg-green-600 rounded-full  text-white px-4 py-2  hover:bg-green-700"
            >
              {type === "EditProfessional" ? "Save Changes" : "Register"}
            </button>
            <button
              type="button"
              className="border-2 rounded-full  text-red-600 px-4 py-2  hover:bg-red-600 hover:text-white"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      {showOtp && (
        <Otp
          onSubmit={handleOtpValidation}
          onClose={handleCloseOtp}
          data={otp}
        />
      )}
      {showModal && (
        <RegistrationConfirmationModal
          formData={formData}
          onCancel={hideDetails}
          type={type}
          onSubmit={handleRoute}
        />
      )}
    </div>
  );
}

export default ProfessionalRegister;
