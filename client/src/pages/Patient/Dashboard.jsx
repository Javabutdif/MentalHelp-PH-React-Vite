import { React, useState, useEffect } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { GrConnect } from "react-icons/gr";
import { FaPeoplePulling } from "react-icons/fa6";
import { getInformationData } from "../../authentication/authentication";
import MatchType from "../../components/modal/MatchType";
import { Link, useActionData } from "react-router-dom";
import {
  retrieveStatus,
  cancelMatch,
  retrieveSchedule,
  setAppointmentStatus,
  handleSetRating,
  changeSchedule,
  getHistory,
} from "../../api/patients";
import LoadingScreen from "../../Loader/LoadingScreen";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import Experience from "../../components/modal/Experience";
import { MdReportProblem } from "react-icons/md";
import ReportModal from "../../components/modal/ReportModal";

const Dashboard = () => {
  const data = getInformationData();
  const [matchModal, setMatchModal] = useState(false);
  const [showStatus, setShowStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cancelConfirm, setCancelConfirm] = useState(false);
  const [cancelData, setCancelData] = useState("");
  const [scheduleData, setScheduleData] = useState([]);
  const [experienceModal, setExperienceModal] = useState(false);
  const [rating, setRating] = useState("5");
  const [scheduleId, setScheduleId] = useState("");
  const [change, setChange] = useState(false);
  const [history, setHistory] = useState([]);
  const [reportModal, setReportModal] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [professionalId, setProfessionalId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [details, setDetails] = useState();

  const handleExperienceModal = () => {
    setExperienceModal(true);
  };
  const handleHideExperienceModal = () => {
    setExperienceModal(false);
  };

  const handleSubmitRating = async () => {
    await handleSetRating(rating, data.id);
  };

  const handleConfirmChange = (schedule_id) => {
    setScheduleId(schedule_id);
    setChange(true);
  };
  const handleHideConfirmChange = () => {
    setChange(false);
  };
  const handleChangeScheduleApi = async () => {
    if (await changeSchedule(scheduleId)) {
      handleHideConfirmChange();
    }
  };

  const handleCancelModal = (id) => {
    setCancelConfirm(true);
    setCancelData(id);
    console.log(cancelData);
  };
  const handleHideCancelModal = () => {
    setCancelConfirm(false);
  };

  const handleMatchModal = () => {
    setMatchModal(true);
  };
  const handleHideMatchModal = () => {
    setMatchModal(false);
    fetchStatus();
  };
  const fetchStatus = async () => {
    const result = await retrieveStatus(data.id);
    setShowStatus(result);
  };
  const fetchSchedule = async () => {
    const result = await retrieveSchedule(data.id);
    setScheduleData(result);
  };
  const fetchHistory = async () => {
    const result = await getHistory(data.id);
    setHistory(result);
  };

  useEffect(() => {
    setLoading(true);
    fetchStatus();
    fetchSchedule();
    setLoading(false);
    console.log(scheduleData);
    scheduleData ? updateAppointmentStatus() : [];
    fetchHistory();
  }, []);

  const handleCancel = async () => {
    await cancelMatch(cancelData);
    fetchStatus();
    handleHideCancelModal();
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

  const handleViewReport = (
    patient_id,
    session_id,
    professional_id,
    details
  ) => {
    setPatientId(patient_id);
    setSessionId(session_id);
    setProfessionalId(professional_id);
    setDetails(details);
    setReportModal(true);
    //alert(patient_id + " " + session_id + " " + professional_id);
  };
  const handleHideReport = () => {
    setReportModal(false);
  };

  return (
    <>
      {loading ? (
        <>
          <div className="relative min-h-screen flex justify-center items-center bg-gray-100 px-4">
            <LoadingScreen />
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="bg-gray-100 min-h-screen p-6 pt-28">
            <header className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <IoPersonSharp className="text-2xl" />
                <h1 className="ml-4 text-xl font-semibold">
                  HELLO {data.name} 👋
                </h1>
              </div>
              <div className="bg-gray-200 p-2 rounded-lg text-sm">
                <p>30% DISCOUNT ON FIRST SESSION</p>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="font-semibold mb-4">Match Status</h2>
                <div
                  className="space-y-2 overflow-y-auto"
                  style={{ maxHeight: "12rem" }}
                >
                  {showStatus ? (
                    showStatus.map((match, index) => (
                      <MatchStatus
                        key={index}
                        type={match.type}
                        name={"Dr. " + match.firstname + " " + match.lastname}
                        status={match.match_status}
                        onCancel={() =>
                          handleCancelModal(match.patient_details_id)
                        }
                      />
                    ))
                  ) : (
                    <p>No matches found.</p>
                  )}
                </div>
              </div>

              {/* Want Someone to Talk To */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="font-semibold mb-4">Want someone to talk to?</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    className="bg-green-600 hover:bg-green-400 text-white p-4 rounded-lg text-center flex flex-col items-center justify-center"
                    onClick={handleMatchModal}
                  >
                    <GrConnect className="text-2xl mb-2" />
                    <p>Match</p>
                  </button>

                  <Link
                    to="/patient/community"
                    className="bg-green-600 hover:bg-green-400 text-white p-4 rounded-lg text-center flex flex-col items-center justify-center"
                  >
                    <IoIosPeople className="text-3xl mb-2" />
                    <p>Community Forum</p>
                  </Link>
                </div>
              </div>

              {/* Task */}
              <div className="bg-green-100 p-4 rounded-lg shadow">
                <h2 className="font-semibold mb-4">Task</h2>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Pray</li>
                  <li>Exercise</li>
                  <li>Make an entry in your journal</li>
                  <li>Read a book</li>
                  <li>Meditate</li>
                </ul>
              </div>

              {/* History */}
              <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2 h-64 overflow-y-auto">
                <h2 className="font-semibold mb-4">History</h2>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b p-2">Date</th>
                      <th className="border-b p-2">Name</th>
                      <th className="border-b p-2">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history
                      ? history.map((entry, index) => (
                          <tr key={index}>
                            <td className="border-b p-2">
                              {new Date(entry.session_end).toLocaleDateString()}
                            </td>
                            <td className="border-b p-2">
                              {entry.professional_firstname +
                                " " +
                                entry.professional_lastname}
                            </td>
                            <td className="border-b p-2">{entry.type}</td>
                            <td>
                              <button
                                onClick={() =>
                                  handleViewReport(
                                    entry.patient_id,
                                    entry.session_id,
                                    entry.professional_id,
                                    entry
                                  )
                                }
                              >
                                <MdReportProblem className="text-2xl text-red-600" />
                              </button>
                            </td>
                          </tr>
                        ))
                      : []}
                  </tbody>
                </table>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="font-semibold mb-4">Appointments</h2>
                <div
                  className="space-y-2 overflow-y-auto"
                  style={{ maxHeight: "12rem" }}
                >
                  {scheduleData
                    ? scheduleData.map((appointment) => {
                        const dateStr = appointment.schedule_date;
                        const timeStr = appointment.schedule_time;

                        const scheduleDate = new Date(dateStr);
                        const currentDate = new Date();
                        const currentTime = currentDate
                          .toTimeString()
                          .split(" ")[0];

                        const scheduleDateOnly = new Date(
                          scheduleDate.toDateString()
                        );
                        const currentDateOnly = new Date(
                          currentDate.toDateString()
                        );

                        const isDateValid = scheduleDateOnly <= currentDateOnly;
                        const isTimeValid =
                          scheduleDateOnly.getTime() ===
                          currentDateOnly.getTime()
                            ? timeStr <= currentTime
                            : true;

                        return (
                          <div
                            key={appointment.schedule_id}
                            className="bg-gray-100 p-2 rounded-lg shadow"
                          >
                            <p>
                              <strong>Professional:</strong>{" "}
                              {appointment.professional_name}
                            </p>
                            <p>
                              <strong>Schedule Date:</strong>{" "}
                              {scheduleDateOnly.toLocaleDateString()}
                            </p>
                            <p>
                              <strong>Schedule Time:</strong>{" "}
                              {appointment.schedule_time}
                            </p>
                            <p
                              className={`${
                                appointment.status === "Active"
                                  ? "text-green-600"
                                  : appointment.status === "Pending"
                                  ? "text-orange-500"
                                  : "text-red-600"
                              }`}
                            >
                              <strong>Status:</strong> {appointment.status}
                            </p>
                            <div className="flex flex-row gap-3">
                              {isDateValid && isTimeValid ? (
                                <Link to="/patient/messages">
                                  <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                    Go to Appointment
                                  </button>
                                </Link>
                              ) : appointment.status === "Pending" ? (
                                <>
                                  <button
                                    onClick={() =>
                                      handleConfirmChange(
                                        appointment.schedule_id
                                      )
                                    }
                                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                  >
                                    Change Schedule
                                  </button>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        );
                      })
                    : []}
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
            {matchModal && (
              <>
                <MatchType onClose={handleHideMatchModal} />
              </>
            )}
            {cancelConfirm && (
              <>
                <ConfirmationModal
                  type="Cancel"
                  person="request"
                  onCancel={handleHideCancelModal}
                  onSubmit={handleCancel}
                />
              </>
            )}
            {change && (
              <>
                <ConfirmationModal
                  type="Change"
                  person="schedule"
                  onCancel={handleHideConfirmChange}
                  onSubmit={handleChangeScheduleApi}
                />
              </>
            )}
            <Experience
              isOpen={experienceModal}
              setIsOpen={handleHideExperienceModal}
              finalRating={setRating}
              onSubmit={handleSubmitRating}
            />
            {reportModal && (
              <>
                <ReportModal
                  patient_id={patientId}
                  professional_id={professionalId}
                  session_id={sessionId}
                  onSubmit={handleHideReport}
                  onCancel={handleHideReport}
                  details={details}
                />
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};
const MatchStatus = ({ type, name, status, onCancel }) => {
  return (
    <div className="flex justify-between items-center border-b py-2 text-xs">
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
      <div className="flex-shrink-0 ml-4">
        <button
          onClick={onCancel}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
