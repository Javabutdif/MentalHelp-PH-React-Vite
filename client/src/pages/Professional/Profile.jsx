import React, { useEffect, useState } from "react";
import { getInformationData } from "../../authentication/authentication";
import ProfessionalRegister from "../../components/modal/ProfessionalRegister";
import { retrieveSpecificProfessional } from "../../api/professionals";
import ProfilePicture from "../../components/modal/ProfilePicture";
import { IoIosPerson } from "react-icons/io";

const Profile = () => {
  const user = getInformationData();
  const [data, setData] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await retrieveSpecificProfessional(user.id);
      setData(data[0]);
    };
    fetchData();
  }, []);
  const handleEditModal = () => {
    setEditModal(true);
  };
  const handHideEditModal = () => {
    setEditModal(false);
    window.location.reload();
  };

  const handleEditProfile = () => {
    setEditProfile(true);
  };
  const handleHideEditProfile = () => {
    setEditProfile(false);
  };

  return (
    <>
      <div className="">
        <img
          src="/headerp.jpg"
          alt="Header"
          className="w-full h-56 object-cover"
        />
        <div className="mx-20 mt-10 flex flex-row gap-8 text-left">
          <div className="flex flex-col items-center w-1/2">
            {data.photo ? (
              <img
                src={data.photo}
                className="rounded-full object-cover h-36 w-36"
                alt="Profile"
              />
            ) : (
              <IoIosPerson className="h-36 w-36 text-gray-500" />
            )}
            <button
              onClick={handleEditProfile}
              className="mt-4 border px-4 py-2"
            >
              Edit Profile
            </button>
          </div>

          <div className="flex flex-col w-1/2">
            <h2 className="text-xl font-bold">
              {data.firstname + " " + data.lastname}{" "}
            </h2>
            <p className="text-gray-700">Bio: {data.bio}</p>
            <p className="text-gray-700">Experience: {data.experience}</p>
            <p className="text-gray-700">License: {data.license}</p>
            <p className="text-gray-700">Email: {data.email}</p>
            <p className="text-gray-700">Phone: {data.contact_number}</p>
            <p className="text-gray-700">Profession: {data.type}</p>
            <button onClick={handleEditModal} className="mt-4 border px-4 py-2">
              Edit Information
            </button>
          </div>
        </div>
        {editModal && (
          <>
            <ProfessionalRegister
              type="EditProfessional"
              id={data.professional_id}
              onCancel={handHideEditModal}
            />
          </>
        )}
        {editProfile && (
          <>
            <ProfilePicture
              onSubmit={handleHideEditProfile}
						  onCancel={handleHideEditProfile}
						  type="Professional"
            />
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
