import React, { useState, useEffect } from "react";
import {
  getUserActivity,
  getProfessionalActivity,
  fetchFeedbackProfessionals,
  getSessionReport,
} from "../../api/professionals";
import { fetchFeedbackPatients } from "../../api/patients";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv"; // Import CSVLink

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
        } else if (selectedReport === "Session") {
          const data = await getSessionReport();
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
    { name: "Rating", selector: (row) => row.rating, sortable: true },
    {
      name: "Date",
      selector: (row) => new Date(row.date).toLocaleDateString(),
      sortable: true,
    },
  ];

  const columnsSession = [
    { name: "ID", selector: (row) => row.session_id, sortable: true },
    {
      name: "Patient",
      selector: (row) => row.patient_firstname + " " + row.patient_lastname,
      sortable: true,
    },
    {
      name: "Professional",
      selector: (row) =>
        row.professional_firstname + " " + row.professional_lastname,
      sortable: true,
    },
    {
      name: "Session Start",
      selector: (row) => new Date(row.session_start).toLocaleString(),
      sortable: true,
    },
    {
      name: "Session End",
      selector: (row) => new Date(row.session_end).toLocaleString(),
      sortable: true,
    },
    { name: "Status", selector: (row) => row.status, sortable: true },
  ];

  const handleDropdownChange = (event) => {
    setSelectedReport(event.target.value);
  };

  // Prepare data for CSV export
  const headers =
    selectedReport === "Feedback Patients" ||
    selectedReport === "Feedback Professionals"
      ? [
          { label: "ID", key: "experience_id" },
          { label: "Name", key: "firstname_lastname" },
          { label: "Rating", key: "rating" },
          { label: "Date", key: "date" },
        ]
      : selectedReport === "Session"
      ? [
          { label: "ID", key: "session_id" },
          { label: "Patient", key: "patient_name" },
          { label: "Professional", key: "professional_name" },
          { label: "Session Start", key: "session_start" },
          { label: "Session End", key: "session_end" },
          { label: "Status", key: "status" },
        ]
      : [
          { label: "Activity ID", key: "activity_id" },
          { label: "Name", key: "firstname_lastname" },
          { label: "Time In", key: "time_in" },
          { label: "Date", key: "date" },
        ];

  const csvData = reportData.map((row) => ({
    ...row,
    firstname_lastname: `${row.firstname} ${row.lastname}`,
    patient_name: `${row.patient_firstname} ${row.patient_lastname}`,
    professional_name: `${row.professional_firstname} ${row.professional_lastname}`,
  }));

  return (
    <div className="p-6 space-y-6 pt-28">
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
        <CSVLink
          data={csvData}
          headers={headers}
          filename={`${selectedReport}_Report.csv`}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Download CSV
        </CSVLink>
      </div>

      <div className="mt-6">
        <DataTable
          columns={
            selectedReport === "Feedback Patients" ||
            selectedReport === "Feedback Professionals"
              ? columnsFeedback
              : selectedReport === "Session"
              ? columnsSession
              : columns
          }
          data={reportData}
          pagination
          highlightOnHover
        />
      </div>

      {/* CSV Export Button */}
      <div className="mt-4"></div>
    </div>
  );
};

export default Reports;
