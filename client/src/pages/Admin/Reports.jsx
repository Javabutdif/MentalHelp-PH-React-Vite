import React, { useState, useEffect } from "react";
import {
  getUserActivity,
  getProfessionalActivity,
} from "../../api/professionals";
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
        } else {
          setReportData([]); // Default to an empty array for other report types
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };
    fetchData();
  }, [selectedReport]);

  // Define columns based on selected report
  const columns = [
    { name: "Activity ID", selector: (row) => row.activity_id, sortable: true },
    selectedReport === "Patient Activity"
      ? {
          name: "Patient ID",
          selector: (row) => row.patient_id,
          sortable: true,
        }
      : {
          name: "Professional ID",
          selector: (row) => row.professional_id,
          sortable: true,
        },
    { name: "Time In", selector: (row) => row.time_in, sortable: true },
    { name: "Date", selector: (row) => row.date, sortable: true },
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
          <option value="Feedback">Feedback</option>
        </select>
      </div>

      {/* Display DataTable with fetched report data */}
      <div className="mt-6">
        <DataTable
          columns={columns}
          data={reportData}
          pagination
          highlightOnHover
        />
      </div>
    </div>
  );
};

export default Reports;
