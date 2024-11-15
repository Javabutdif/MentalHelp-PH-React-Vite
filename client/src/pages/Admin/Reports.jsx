import React, { useState, useEffect } from "react";
import {
  getUserActivity,
  getProfessionalActivity,
  fetchFeedbackProfessionals,
} from "../../api/professionals";
import { fetchFeedbackPatients } from "../../api/patients";
import DataTable from "react-data-table-component"; // Import DataTable

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState("Session");
  const [reportData, setReportData] = useState([]);

  // Fetch data based on selected report
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedReport === "Patient Activity") {
          const data = await getUserActivity();
          setReportData(data);
        } else if (selectedReport === "Professional Activity") {
          const data = await getProfessionalActivity();
          setReportData(data);
        } else if (selectedReport === "Feedback Patients") {
          const data = await fetchFeedbackPatients();
          setReportData(data);
        } else if (selectedReport === "Feedback Professionals") {
          const data = await fetchFeedbackProfessionals();
          setReportData(data);
        } else {
          setReportData([]);
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };
    fetchData();
  }, [selectedReport]);

  const columns = [
    { name: "Activity ID", selector: (row) => row.activity_id, sortable: true },

    {
      name: "Name",
      selector: (row) => row.firstname + " " + row.lastname,
      sortable: true,
    },
    {
      name: "Time In",
      selector: (row) => new Date(row.time_in).toLocaleTimeString(),
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => new Date(row.date).toLocaleDateString(),
      sortable: true,
    },
  ];

  const columnsFeedback = [
    { name: "ID", selector: (row) => row.experience_id, sortable: true },

    {
      name: "Name",
      selector: (row) => row.firstname + " " + row.lastname,
      sortable: true,
    },
    {
      name: "Rating",
      selector: (row) => row.rating,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => new Date(row.date).toLocaleDateString(),
      sortable: true,
    },
  ];

  // Handle dropdown change
  const handleDropdownChange = (event) => {
    setSelectedReport(event.target.value);
  };

  return (
    <div className="p-6 space-y-6 pt-28">
      {/* Dropdown for selecting report type */}
      <div className="flex items-center space-x-4">
        <label htmlFor="report-select" className="font-medium text-gray-700">
          Select Report Type:
        </label>
        <select
          id="report-select"
          className="p-2 border rounded-md"
          value={selectedReport}
          onChange={handleDropdownChange}
        >
          <option value="Session">Session</option>
          <option value="Patient Activity">Patient Activity</option>
          <option value="Professional Activity">Professional Activity</option>
          <option value="Feedback Patients">Feedback Patients</option>
          <option value="Feedback Professionals">Feedback Professionals</option>
        </select>
      </div>

      {/* Display DataTable with fetched report data */}
      <div className="mt-6">
        <DataTable
          columns={
            selectedReport === "Feedback Patients" ||
            selectedReport === "Feedback Professionals"
              ? columnsFeedback
              : columns
          }
          data={reportData}
          pagination
          highlightOnHover
        />
      </div>
    </div>
  );
};

export default Reports;
