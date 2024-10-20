import { React, useState, useEffect } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { GrConnect } from "react-icons/gr";
import { FaPeoplePulling } from "react-icons/fa6";
import { getInformationData } from "../../authentication/authentication";
import MatchType from "../../components/modal/MatchType";
import { Link, useActionData } from "react-router-dom";
import { retrieveStatus, cancelMatch } from "../../api/patients";
import LoadingScreen from "../../Loader/LoadingScreen";
import ConfirmationModal from "../../components/common/ConfirmationModal";

const Dashboard = () => {
  const data = getInformationData();
  const [matchModal, setMatchModal] = useState(false);
  const [showStatus, setShowStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cancelConfirm, setCancelConfirm] = useState(false);
  const [cancelData, setCancelData] = useState("");

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
  useEffect(() => {
    setLoading(true);
    fetchStatus();
    setLoading(false);
  }, []);

  const handleCancel = async () => {
    await cancelMatch(cancelData);
    fetchStatus();
    handleHideCancelModal();
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
                        onCancel={() => handleCancelModal(match.match_id)}
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
              <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2">
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
                    <tr>
                      <td className="border-b p-2">08-05-2024</td>
                      <td className="border-b p-2">Dr. Hyahay</td>
                      <td className="border-b p-2">Psychologist</td>
                    </tr>
                    <tr>
                      <td className="border-b p-2">06-05-2024</td>
                      <td className="border-b p-2">Dr. Hyahay</td>
                      <td className="border-b p-2">Psychologist</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="font-semibold mb-4">Metric Stats</h2>
                <div className="flex justify-between">
                  <div className="bg-blue-200 w-8 h-20" />
                  <div className="bg-blue-200 w-8 h-16" />
                  <div className="bg-blue-200 w-8 h-24" />
                  <div className="bg-blue-200 w-8 h-28" />
                  <div className="bg-blue-200 w-8 h-12" />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Positive & Negative
                </p>
              </div>
            </div>
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
