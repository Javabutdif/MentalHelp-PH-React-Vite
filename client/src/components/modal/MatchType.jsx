import React, { useState, useEffect } from "react";
import MatchLoading from "../../Loader/MatchLoading";
import { matchProfessional, requestMatch } from "../../api/patients";
import { getInformationData } from "../../authentication/authentication";
import DisplayMatch from "./DisplayMatch";

function MatchType({ onClose }) {
  const user = getInformationData();
  const [displayResult, setDisplayResult] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [data, setData] = useState("");
  const [issues, setIssues] = useState({
    depression: false,
    anxiety: false,
    stress: false,
  });
  const [description, setDescription] = useState("");
  const [formData, setFormData] = useState({
    profession: selectedType,
    issues: issues,
    age: user.age,
    description: description,
  });
  const [loading, setLoading] = useState(false);
  const [matchRequstForm, setMatchRequestForm] = useState({
    id: user.id,
    issues: issues,
    age: user.age,
    professional_id: data.professional_id,
    description: description,
  });

  useEffect(() => {
    setFormData({
      profession: selectedType,
      issues: issues,
      age: user.age,
      description: description,
    });
    setMatchRequestForm({
      id: user.id,
      issues: issues,
      age: user.age,
      professional_id: data.professional_id,
      description: description,
    });
  }, [selectedType, issues, user.age, data, description]); // Add description to dependencies

  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setIssues((prevState) => ({ ...prevState, [name]: checked }));
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value); // Update description state
  };

  const handleSubmit = async () => {
    console.log("Form Data:", formData);

    setLoading(true);

    try {
      const response = await matchProfessional(formData);
      console.log(response);
      if (response !== null) {
        setData(response);
        setDisplayResult(true);
        console.log(data);
      }
    } catch (error) {
      console.error("Error matching professional:", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelSearch = () => {
    setLoading(false);
  };

  const handleHideDisplayResult = () => {
    setDisplayResult(false);
  };

  const handleMatchRequest = async () => {
    console.log(matchRequstForm);
    if (await requestMatch(matchRequstForm)) {
      handleHideDisplayResult();
      onClose();
    } else {
      handleHideDisplayResult();
    }
  };

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
            <MatchLoading />
            <p className="text-green-700 text-2xl pb-5">
              Finding Suitable Professionals...
            </p>
            <button
              className="text-red-500 hover:bg-red-500 border-2 border-red-500 px-4 mt-4 hover:text-white p-2 rounded-full"
              onClick={cancelSearch}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Choose Type</h2>

            <div className="flex flex-col gap-3 justify-between mb-4">
              <button
                onClick={() => handleTypeSelection("Psychiatrist")}
                className={`px-4 py-2 rounded-md ${
                  selectedType === "Psychiatrist"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 hover:bg-green-200"
                }`}
              >
                Psychiatrist
              </button>
              <button
                onClick={() => handleTypeSelection("Psychologist")}
                className={`px-4 py-2 rounded-md ${
                  selectedType === "Psychologist"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 hover:bg-green-200"
                }`}
              >
                Psychologist
              </button>
            </div>

            <h3 className="font-semibold mb-2">Mental Health Issues</h3>
            <div className="space-y-2 mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="depression"
                  checked={issues.depression}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Depression
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="anxiety"
                  checked={issues.anxiety}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Anxiety
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="stress"
                  checked={issues.stress}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Stress
              </label>
            </div>
            <h3 className="font-semibold mb-2">Describe your condition:</h3>
            <div className="space-y-2 mb-4">
              <textarea
                className="w-full h-40 p-2 border border-gray-300 rounded-md"
                placeholder="Please describe your condition here..."
                value={description} // Set the value of the textarea to the description state
                onChange={handleDescriptionChange} // Handle changes to the textarea
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Proceed
              </button>
            </div>
          </div>
          {displayResult && (
            <>
              <DisplayMatch
                onSearch={handleSubmit}
                data={data}
                onClose={handleHideDisplayResult}
                onRequestMatch={handleMatchRequest}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default MatchType;
