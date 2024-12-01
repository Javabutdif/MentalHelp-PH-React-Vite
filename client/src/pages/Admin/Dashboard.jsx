import React, { useEffect, useState } from "react";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import { getCountPatients } from "../../api/patients";
import {
  getCountActiveProfessionals,
  getCountPendingProfessionals,
  getAllDeclineProfessionals,
  getReportCount,
} from "../../api/professionals";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [patientsCount, setPatientCount] = useState(0);
  const [activeProfessionalCount, setActiveProfessionalCount] = useState(0);
  const [pendingProfessionalsCount, setPendingProfessionalCount] = useState(0);
  const [declineProfessionalsCount, setDeclineProfessionalCount] = useState(0);
  const [report, setReport] = useState([]);

  // Modify data for the bar chart to use report data
  const data = {
    labels: report.map((item) => item.professional_name), // Use professional_name from report as labels
    datasets: [
      {
        label: "Number of reports",
        data: report.map((item) => item.professional_count), // Use professional_count from report as data
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.raw; // Only show the raw value (professional_count)
          },
        },
      },
    },
  };

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const patientCount = await getCountPatients();
        const activeCount = await getCountActiveProfessionals();
        const pendingCount = await getCountPendingProfessionals();
        const declineCount = await getAllDeclineProfessionals();
        const report = await getReportCount();

        setPatientCount(patientCount);
        setActiveProfessionalCount(activeCount);
        setPendingProfessionalCount(pendingCount);
        setDeclineProfessionalCount(declineCount);
        setReport(report);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCount();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen pt-28">
      <DashboardCard
        patientsCount={patientsCount}
        activeProfessionalsCount={activeProfessionalCount}
        pendingProfessionalsCount={pendingProfessionalsCount}
        declineProfessionalsCount={declineProfessionalsCount}
      />
      <h1 className="text-2xl font-bold my-2">Reported Accounts</h1>
      <Bar data={data} options={options} />
    </div>
  );
}

export default Dashboard;
