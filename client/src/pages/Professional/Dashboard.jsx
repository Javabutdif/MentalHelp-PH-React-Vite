import React, { useEffect, useState } from "react";
import { getInformationData } from "../../authentication/authentication";
import ProfessionalPreferences from "../../components/modal/ProfessionalPreferences";
import {
  checkProfessionalPreferences,
  retrieveSpecificProfessional,
  retrievePatientRequest,
  acceptRequest,
  cancelRequest,
  handleSetRating,
  fetchProfessionalSchedule,
} from "../../api/professionals";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import ViewConditionModal from "../../components/modal/ViewConditionModal";
import AppointmentModal from "../../components/Appointments/AppointmentModal";
import Experience from "../../components/modal/Experience";
import { Link } from "react-router-dom";
import CancelModal from "../../components/modal/CancelModal";

const Dashboard = () => {
  const user = getInformationData();
  const [data, setData] = useState([]);
  const [showStatus, setShowStatus] = useState([]);
  const [dataRetrieve, setDataRetrieve] = useState(false);
  const [matchId, setMatchId] = useState("");
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [type, setType] = useState("");
  const [viewCondition, setViewCondition] = useState(false);
  const [viewData, setViewData] = useState("");
  const [viewAppointments, setViewAppointments] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [experienceModal, setExperienceModal] = useState(false);
  const [rating, setRating] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [viewCancelModal, setCancelModal] = useState(false);
  const [reason, setReason] = useState("");

  const handleExperienceModal = () => {
    setExperienceModal(true);
  };

  const fetchSchedule = async () => {
    try {
      const result = await fetchProfessionalSchedule(user.id);
      setSchedule(result);
      console.log(schedule);
    } catch (error) {
      console.error("Error retrieving the schedule");
    }
  };
  const handleHideExperienceModal = () => {
    setExperienceModal(false);
  };

  const handleSubmitRating = async () => {
    console.log(rating);
    await handleSetRating(rating, user.id);
  };

  const fetchStatus = async () => {
    const result = await retrievePatientRequest(user.id);
    setShowStatus(result);
  };
  const fetchPreferences = async () => {
    const result = await checkProfessionalPreferences(user.id);
    setDataRetrieve(result);
  };
  const fetchData = async () => {
    const data = await retrieveSpecificProfessional(user.id);
    setData(data[0]);
  };
  useEffect(() => {
    fetchPreferences();
    fetchStatus();
    fetchData();
    fetchSchedule();
  }, [user.id]);

  const handleCancelRequest = (id) => {
    setMatchId(id);
    setConfirmationModal(true);
    setType("Cancel");
    fetchPreferences();
    fetchStatus();
    fetchData();
  };
  const handleHideCancelRequest = () => {
    setConfirmationModal(false);
  };
  const handleHideAcceptRequest = () => {
    setConfirmationModal(false);
  };
  const handleAcceptRequest = (id, patient_id) => {
    console.log(patient_id);
    setMatchId(id);
    setPatientId(patient_id);
    setConfirmationModal(true);
    setType("Accept");
    fetchPreferences();
    fetchStatus();
    fetchData();
  };

  const acceptRequestApi = async () => {
    await acceptRequest(matchId);
    handleHideAcceptRequest();
    //setViewAppointments
    setViewAppointments(true);
  };
  const cancelRequestApi = async () => {
    await cancelRequest(matchId, reason);
    handleHideCancelRequest();
  };

  const handleViewCondition = (data) => {
    setViewData(data);
    setViewCondition(true);
  };
  const handleHideViewCondition = () => {
    setViewCondition(false);
  };

  const handleCancelModalView = () => {
    setCancelModal(true);
    handleHideCancelRequest();
  };
  const handleCloseCancelModal = () => {
    setCancelModal(false);
  };
  const handleCancelRequestWithReason = (reasons) => {
    setReason(reasons); // Update the state
    console.log("Cancellation Reason:", reason);
    console.log("Match ID:", matchId);
    cancelRequestApi();
  };

  return (
    <div className="container mx-auto p-4 pt-28">
      {!dataRetrieve && <ProfessionalPreferences />}

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <img
            src={data.photo}
            alt="Doctor"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-500">{user.type}</p>
          </div>
        </div>

        <div className="flex space-x-4">
          {/* Statistic Cards */}
          <div className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-lg font-semibold">Successful Consultation</h2>
            <p className="text-2xl font-bold">85</p>
            <p className="text-sm text-gray-500">by 5 months</p>
          </div>
          <div className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-lg font-semibold">Earnings</h2>
            <p className="text-2xl font-bold">140K</p>
            <p className="text-sm text-gray-500">by 5 months</p>
          </div>
          <div className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-lg font-semibold">Total Consultation</h2>
            <p className="text-2xl font-bold">116</p>
            <p className="text-sm text-gray-500">by 5 months</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {/* Appointments Section */}
        <div className="col-span-1">
          <h3 className="font-semibold mb-2">Appointments</h3>
          <div className="space-y-4">
            {schedule ? (
              schedule.map((scheduleMap, index) => (
                <Link to="/professional/messages">
                  <div
                    key={scheduleMap}
                    className={`bg-${
                      scheduleMap.status === "Pending"
                        ? "orange"
                        : scheduleMap.status === "Active"
                        ? "blue"
                        : "red"
                    }-100 p-4 rounded-md shadow-md`}
                  >
                    <p className="font-bold">
                      {new Date(scheduleMap.schedule_date).toLocaleDateString()}
                    </p>
                    <p>{scheduleMap.schedule_time}</p>
                    <p>{scheduleMap.patient_name}</p>
                    <div className="flex flex-col ">
                      <p
                        className={`text-${
                          scheduleMap.status === "Pending"
                            ? "orange"
                            : scheduleMap.status === "Active"
                            ? "blue"
                            : "red"
                        }-500 `}
                      >
                        {scheduleMap.status}
                      </p>
                      {scheduleMap.status === "Change" ? (
                        <div>
                          <button
                            onClick={() =>
                              handleConfirmChange(appointment.schedule_id)
                            }
                            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Change Schedule
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <>
                <p>No appointments found.</p>
              </>
            )}
          </div>
        </div>

        {/* Match Request Section */}
        <div className="mt-8">
          <h3 className="font-semibold mb-2">Match Request</h3>
          <div
            className="bg-white shadow-md rounded-md p-4 space-y-4 overflow-y-auto"
            style={{ maxHeight: "12rem" }}
          >
            {showStatus ? (
              showStatus.map((request, index) => (
                <MatchStatus
                  onView={() => handleViewCondition(request.description)}
                  key={index}
                  type={request.mental_issues}
                  name={`${request.firstname + " " + request.lastname}, ${
                    request.age
                  }, ${request.gender}`}
                  status={request.match_status}
                  onCancel={() =>
                    handleCancelRequest(request.patient_details_id)
                  }
                  onSubmit={() =>
                    handleAcceptRequest(request.match_id, request.patient_id)
                  }
                />
              ))
            ) : (
              <p>No match requests found.</p>
            )}
          </div>
        </div>

        {/* Patient History Section */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="font-semibold mb-2">Patient History</h3>
          <table className="min-w-full bg-white shadow-md rounded-md">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Age</th>
                <th className="py-2 px-4">Gender</th>
                <th className="py-2 px-4">Condition</th>
                <th className="py-2 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "Naomi",
                  age: 21,
                  gender: "Female",
                  condition: "Anxiety",
                  date: "02-07-24",
                },
                {
                  name: "Randy",
                  age: 33,
                  gender: "Male",
                  condition: "Anxiety",
                  date: "02-07-24",
                },
                {
                  name: "Krisha",
                  age: 18,
                  gender: "Female",
                  condition: "Depression",
                  date: "02-07-24",
                },
              ].map((patient, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{patient.name}</td>
                  <td className="py-2 px-4">{patient.age}</td>
                  <td className="py-2 px-4">{patient.gender}</td>
                  <td className="py-2 px-4">{patient.condition}</td>
                  <td className="py-2 px-4">{patient.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <footer className="pt-2">
        <div className="bg-blue-100 border border-blue-300 text-blue-800 p-4 rounded-lg shadow-lg flex items-center justify-between">
          <p className="font-semibold">
            How’s your experience using our website?
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm"
            onClick={() => handleExperienceModal()}
          >
            Give Feedback
          </button>
        </div>
      </footer>
      {confirmationModal && type === "Accept" && (
        <>
          <ConfirmationModal
            type={type}
            person="request"
            onSubmit={() => acceptRequestApi(matchId)}
            onCancel={handleHideAcceptRequest}
          />
        </>
      )}

      {confirmationModal && type === "Cancel" && (
        <>
          <ConfirmationModal
            type={type}
            person="request"
            onSubmit={() => handleCancelModalView()}
            onCancel={handleHideCancelRequest}
          />
        </>
      )}
      {viewCondition && (
        <>
          <ViewConditionModal
            data={viewData}
            onClose={handleHideViewCondition}
          />
        </>
      )}
      {viewAppointments && (
        <>
          <AppointmentModal
            patient_id={patientId}
            professional_id={user.id}
            isOpen={true}
            closeModal={() => setViewAppointments(false)}
          />
        </>
      )}
      {viewCancelModal && (
        <>
          <CancelModal
            onSubmit={handleCancelRequestWithReason}
            onClose={handleCloseCancelModal}
          />
        </>
      )}
      <Experience
        isOpen={experienceModal}
        setIsOpen={handleHideExperienceModal}
        finalRating={setRating}
        onSubmit={handleSubmitRating}
      />
    </div>
  );
};

const MatchStatus = ({ onView, type, name, status, onCancel, onSubmit }) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-2 rounded-md shadow-sm border-b py-2 text-xs">
      <div className="flex-1">
        <p>{type}</p>
      </div>
      <div className="flex-1 text-center">
        <p>{name}</p>
      </div>
      <div className="flex-1 text-center">
        <p
          className={`font-semibold text-xs ${
            status === "Accepted" ? "text-green-500" : "text-red-500"
          }`}
        >
          {status}
        </p>
      </div>
      <div className="flex-shrink-2 ml-4">
        <div className="flex gap-4">
          <button
            onClick={onView}
            className="px-2 py-1 bg-blue-500 text-white rounded"
          >
            View
          </button>
          <button
            onClick={onSubmit}
            className="px-2 py-1 bg-green-500 text-white rounded"
          >
            Accept
          </button>
          <button
            onClick={onCancel}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
