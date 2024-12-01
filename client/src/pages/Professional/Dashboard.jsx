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
  declineChangeSchedule,
  getProfessionalHistory,
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
  const [rating, setRating] = useState("5");
  const [schedule, setSchedule] = useState([]);
  const [viewCancelModal, setCancelModal] = useState(false);
  const [reason, setReason] = useState("");
  const [schedId, setSchedId] = useState("");
  const [declineModal, setDeclineModal] = useState(false);
  const [history, setHistory] = useState([]);
  const [changeSched, setChangeSched] = useState(false);
  const [changeSchedId, setChangeSchedId] = useState("");

  const handleExperienceModal = () => {
    setExperienceModal(true);
  };
  console.log("Professional ID: " + user.id);
  const fetchHistory = async () => {
    try {
      const result = await getProfessionalHistory(user.id);
      console.log("History: " + result);
      setHistory(result);
    } catch (error) {
      console.error(error);
    }
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
    fetchHistory();
    schedule ? updateAppointmentStatus() : [];
  }, []);

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

  const handleDeclineModal = (id) => {
    setSchedId(id);
    setDeclineModal(true);
  };
  const handleHideDeclineModal = () => {
    setDeclineModal(false);
  };
  const declineRequestApi = async () => {
    if (await declineChangeSchedule(schedId)) {
      handleHideDeclineModal();
    }
  };
  const handleChangeSchedule = async (id) => {
    setChangeSched(true);
    setChangeSchedId(id);
  };

  const updateAppointmentStatus = async () => {
    const currentDate = new Date();
    const currentTime = currentDate.toTimeString().split(" ")[0];

    console.log("Updating appointment status...");

    scheduleData.forEach(async (appointment) => {
      const scheduleDate = new Date(appointment.schedule_date);
      const scheduleDateOnly = new Date(scheduleDate.toDateString());
      const currentDateOnly = new Date(currentDate.toDateString());

      const isDateValid = scheduleDateOnly <= currentDateOnly;
      const isTimeValid =
        scheduleDateOnly.getTime() === currentDateOnly.getTime()
          ? appointment.schedule_time <= currentTime
          : true;

      if (isDateValid && isTimeValid && appointment.status === "Pending") {
        await setAppointmentStatus(appointment.schedule_id);
        fetchSchedule();
      }
    });
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

        {/* Statistic Cards */}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {/* Appointments Section */}
        <div className="col-span-1">
          <h3 className="font-semibold mb-2">Appointments</h3>
          <div
            className="space-y-4 overflow-y-auto"
            style={{ maxHeight: "400px" }}
          >
            {schedule ? (
              schedule.map((scheduleMap, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center bg-${
                    scheduleMap.status === "Pending"
                      ? "orange"
                      : scheduleMap.status === "Active"
                      ? "blue"
                      : "red"
                  }-100 p-4 rounded-md shadow-md`}
                >
                  {/* Left Section: Information */}
                  <div>
                    <p className="font-bold">
                      {new Date(scheduleMap.schedule_date).toLocaleDateString()}
                    </p>
                    <p>{scheduleMap.schedule_time}</p>
                    <p>{scheduleMap.patient_name}</p>
                    <p
                      className={`text-${
                        scheduleMap.status === "Pending"
                          ? "orange"
                          : scheduleMap.status === "Active"
                          ? "blue"
                          : "red"
                      }-500`}
                    >
                      {scheduleMap.status}
                    </p>
                  </div>

                  {/* Right Section: Buttons */}
                  <div className="flex flex-col items-end gap-2">
                    {scheduleMap.status === "Active" && (
                      <Link to="/professional/messages">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                          Go to Appointment
                        </button>
                      </Link>
                    )}
                    {scheduleMap.status === "Change" && (
                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            handleChangeSchedule(scheduleMap.schedule_id)
                          }
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Change Schedule
                        </button>
                        <button
                          onClick={() =>
                            handleDeclineModal(scheduleMap.schedule_id)
                          }
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No appointments found.</p>
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
          <div className="overflow-x-auto max-h-96">
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
                {history
                  ? history.map((entry, index) => (
                      <tr key={index}>
                        <td className="border-b p-2">
                          {entry.firstname + " " + entry.lastname}
                        </td>
                        <td className="border-b p-2">{entry.age}</td>
                        <td className="border-b p-2">{entry.gender}</td>
                        <td className="border-b p-2">{entry.mental_issues}</td>
                        <td className="border-b p-2">
                          {new Date(entry.schedule_date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  : []}
              </tbody>
            </table>
          </div>
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
      {declineModal && (
        <>
          <ConfirmationModal
            type="Decline"
            person="schedule"
            onSubmit={() => declineRequestApi()}
            onCancel={handleHideDeclineModal}
          />
        </>
      )}
      {changeSched && (
        <>
          <AppointmentModal
            schedule_id={changeSchedId}
            isOpen={true}
            closeModal={() => setChangeSched(false)}
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
