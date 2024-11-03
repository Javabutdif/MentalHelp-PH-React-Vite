import React from "react";
import { LiaIdCard, LiaCalendar } from "react-icons/lia";
import { CgProfile } from "react-icons/cg";
import { MdOutlineMailOutline, MdPhone } from "react-icons/md";
import { IoSchoolOutline, IoLocationOutline } from "react-icons/io5";

function RegistrationConfirmationModal({ formData, onSubmit, onCancel, type }) {
  console.log(formData);
  return (
    <>
      {type === "Register" || type === "Edit" ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
            onClick={onCancel}
          ></div>
          .
          <div className="bg-white rounded-xl shadow-xl min-w-96 md:min-w-[450px] w-fit z-10 overflow-hidden transform transition-all duration-300 scale-95">
            <div className="flex justify-between items-center p-6 bg-navy text-white rounded-t-xl shadow-md">
              <h5 className="text-xl font-primary font-bold">
                Confirm Details
              </h5>
              <button
                type="button"
                className="text-3xl leading-none hover:text-gray-200 focus:outline-none"
                onClick={onCancel}
              >
                &times;
              </button>
            </div>

            <div className="p-6 space-y-3 bg-gray-50 text-gray-800">
              <div className="flex items-center justify-between gap-10">
                <div className="flex items-center space-x-3">
                  <LiaIdCard className="text-xl text-gray-600" size={21} />
                  <span className="pt-1 font-medium font-secondary text-lg text-gray-600">
                    Full Name:
                  </span>
                </div>
                <span className="pt-1 text-gray-900 font-secondary text-lg">
                  {formData.firstName + " " + formData.lastName}
                </span>
              </div>

              <div className="flex items-center justify-between gap-15">
                <div className="flex items-center space-x-3">
                  <MdOutlineMailOutline
                    className="text-xl text-gray-600"
                    size={19}
                  />
                  <span className="pt-1 font-medium font-secondary text-lg text-gray-600">
                    Email Address:
                  </span>
                </div>
                <span className="pt-1 text-gray-900 font-secondary text-lg">
                  {formData.userEmail}
                </span>
              </div>

              <div className="flex items-center justify-between gap-15">
                <div className="flex items-center space-x-3">
                  <CgProfile className="text-xl text-gray-600" size={19} />
                  <span className="pt-1 font-medium font-secondary text-lg text-gray-600">
                    Gender:
                  </span>
                </div>
                <span className="pt-1 text-gray-900 font-secondary text-lg">
                  {formData.userGender}
                </span>
              </div>
              {type === "Register" && (
                <>
                  <div className="flex items-center justify-between gap-10">
                    <div className="flex items-center space-x-3">
                      <LiaCalendar
                        className="text-xl text-gray-600"
                        size={20}
                      />
                      <span className="pt-1 font-medium font-secondary text-lg text-gray-600">
                        Birth Date
                      </span>
                    </div>
                    <span className="pt-1 text-gray-900 font-secondary text-lg">
                      {formData.userBirthDate}
                    </span>
                  </div>
                </>
              )}

              <div className="flex items-center justify-between gap-10">
                <div className="flex items-center space-x-3">
                  <IoLocationOutline
                    className="text-xl text-gray-600"
                    size={20}
                  />
                  <span className="pt-1 font-medium font-secondary text-lg text-gray-600">
                    Address
                  </span>
                </div>
                <span className="pt-1 text-gray-900 font-secondary text-lg">
                  {formData.userAddress}
                </span>
              </div>

              <div className="flex items-center justify-between gap-10">
                <div className="flex items-center space-x-3">
                  <IoSchoolOutline
                    className="text-xl text-gray-600"
                    size={20}
                  />
                  <span className="pt-1 font-medium font-secondary text-lg text-gray-600">
                    Status
                  </span>
                </div>
                <span className="pt-1 text-gray-900 font-secondary text-lg">
                  {formData.userStatus}
                </span>
              </div>

              <div className="flex items-center justify-between gap-10">
                <div className="flex items-center space-x-3">
                  <MdPhone className="text-xl text-gray-600" size={20} />
                  <span className="pt-1 font-medium font-secondary text-lg text-gray-600">
                    Contact Number
                  </span>
                </div>
                <span className="pt-1 text-gray-900 font-secondary text-lg">
                  {formData.userContact}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end p-6 bg-white border-t border-gray-200 rounded-b-xl">
              <button
                type="button"
                className="px-5 py-2 text-red-500 hover:text-white hover:bg-red-700 transition-all focus:outline-none rounded-md border border-red-300 hover:border-red-400"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="ml-3 px-6 py-2 bg-green-600 text-white rounded-md hover:shadow-lg hover:from-primary hover:to-navy focus:outline-none transition-all duration-300 ease-in-out"
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
            onClick={onCancel}
          ></div>

          <div className="bg-white rounded-xl shadow-xl min-w-96 md:min-w-[450px] w-fit z-10 overflow-hidden transform transition-all duration-300 scale-95">
            <div className="flex justify-between items-center p-6 bg-navy text-white rounded-t-xl shadow-md">
              <h5 className="text-xl font-primary font-bold">
                Confirm Details
              </h5>
              <button
                type="button"
                className="text-3xl leading-none hover:text-gray-200 focus:outline-none"
                onClick={onCancel}
              >
                &times;
              </button>
            </div>

            <div className="p-6 space-y-3 bg-gray-50 text-gray-800">
              <div className="flex items-center justify-between gap-10">
                <div className="flex items-center space-x-3">
                  <LiaIdCard className="text-xl text-gray-600" size={21} />
                  <span className="pt-1 font-medium font-secondary text-lg text-gray-600">
                    Full Name:
                  </span>
                </div>
                <span className="pt-1 text-gray-900 font-secondary text-lg">
                  {formData.firstname + " " + formData.lastname}
                </span>
              </div>

              <div className="flex items-center justify-between gap-15">
                <div className="flex items-center space-x-3">
                  <MdOutlineMailOutline
                    className="text-xl text-gray-600"
                    size={19}
                  />
                  <span className="pt-1 font-medium font-secondary text-lg text-gray-600">
                    Email Address:
                  </span>
                </div>
                <span className="pt-1 text-gray-900 font-secondary text-lg">
                  {formData.email}
                </span>
              </div>

              <div className="flex items-center justify-between gap-15">
                <div className="flex items-center space-x-3">
                  <CgProfile className="text-xl text-gray-600" size={19} />
                  <span className="pt-1 font-medium font-secondary text-lg text-gray-600">
                    Profession:
                  </span>
                </div>
                <span className="pt-1 text-gray-900 font-secondary text-lg">
                  {formData.profession}
                </span>
              </div>

              <div className="flex items-center justify-between gap-10">
                <div className="flex items-center space-x-3">
                  <LiaCalendar className="text-xl text-gray-600" size={20} />
                  <span className="pt-1 font-medium font-secondary text-lg text-gray-600">
                    Experience
                  </span>
                </div>
                <span className="pt-1 text-gray-900 font-secondary text-lg">
                  {formData.experience}
                </span>
              </div>

              <div className="flex items-center justify-between gap-10">
                <div className="flex items-center space-x-3">
                  <IoLocationOutline
                    className="text-xl text-gray-600"
                    size={20}
                  />
                  <span className="pt-1 font-medium font-secondary text-lg text-gray-600">
                    License
                  </span>
                </div>
                <span className="pt-1 text-gray-900 font-secondary text-lg">
                  {formData.license}
                </span>
              </div>
              <div className="flex items-center justify-between gap-10">
                <div className="flex items-center space-x-3">
                  <IoLocationOutline
                    className="text-xl text-gray-600"
                    size={20}
                  />
                  <span className="pt-1 font-medium font-secondary text-lg text-gray-600">
                    Address
                  </span>
                </div>
                <span className="pt-1 text-gray-900 font-secondary text-lg">
                  {formData.address}
                </span>
              </div>

              <div className="flex items-center justify-between gap-10">
                <div className="flex items-center space-x-3">
                  <IoSchoolOutline
                    className="text-xl text-gray-600"
                    size={20}
                  />
                  <span className="pt-1 font-medium font-secondary text-lg text-gray-600">
                    Documents
                  </span>
                </div>
                <span className="pt-1 text-gray-900 font-secondary text-lg">
                  {formData.documents && (
                    <ul>
                      {Array.from(formData.documents).map((file) => (
                        <li key={file.name}>{file.name}</li>
                      ))}
                    </ul>
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between gap-10">
                <div className="flex items-center space-x-3">
                  <MdPhone className="text-xl text-gray-600" size={20} />
                  <span className="pt-1 font-medium font-secondary text-lg text-gray-600">
                    Contact Number
                  </span>
                </div>
                <span className="pt-1 text-gray-900 font-secondary text-lg">
                  {formData.contact}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end p-6 bg-white border-t border-gray-200 rounded-b-xl">
              <button
                type="button"
                className="px-5 py-2 text-red-500 hover:text-white hover:bg-red-700 transition-all focus:outline-none rounded-md border border-red-300 hover:border-red-400"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 px-6 py-2 bg-green-600 text-white rounded-md hover:shadow-lg hover:from-primary hover:to-navy focus:outline-none transition-all duration-300 ease-in-out"
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RegistrationConfirmationModal;
