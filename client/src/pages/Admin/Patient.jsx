import React, { useState, useEffect } from "react";
import FormButton from "../../components/Forms/FormButton";
import ButtonsComponent from "../../components/Custom/ButtonsComponent";
import TableComponent from "../../components/Custom/TableComponent";
import PatientRegister from "../../components/modal/PatientRegister";
import {
  getAllPatients,
  handleDeletePatient,
  handleRecoverPatient,
} from "../../api/patients";
import { FaEdit, FaTrash, FaBriefcase } from "react-icons/fa";
import ConfirmationModal from "../../components/common/ConfirmationModal";
//const names = ['name', 'names']
function Patient() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRecoverModal, setShowRecoverModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [recoverId, setRecoverId] = useState("");

  const fetchData = async () => {
    const result = await getAllPatients();

    setData(result);
  };

  useEffect(() => {
    fetchData();
  });

  const editPatient = (id) => {
    console.log(id);
    setEditId(id);
    setShowModal(true);
  };
  const closeEditPatient = () => {
    setEditId("");
    setShowModal(false);
    fetchData();
  };

  const handleDeleteModal = (id) => {
    setShowDeleteModal(true);
    setDeleteId(id);
  };
  const hideDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleRecoverModal = (id) => {
    setRecoverId(id);
    setShowRecoverModal(true);
  };
  const hideRecoverModal = () => {
    setShowRecoverModal(false);
  };

  const handleDeletePatients = async () => {
    await handleDeletePatient(deleteId);
    hideDeleteModal();
  };

  const handleRecoverPatients = async () => {
    await handleRecoverPatient(recoverId);
    hideRecoverModal();
  };

  const columns = [
    {
      key: "patient_id",
      label: "ID",
      selector: (row) => {
        row.patient_id;
      },
      sortable: true,
      cell: (row) => (
        <div className="text-xs">
          <div>{row.patient_id}</div>
        </div>
      ),
    },
    {
      key: "firstname",
      label: "First Name",
      selector: (row) => row.firstname,
      sortable: true,
    },
    {
      key: "lastname",
      label: "Last Name",
      selector: (row) => row.lastname,
      sortable: true,
    },
    {
      key: "email",
      label: "Email Account",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      key: "addresses",
      label: "Address",
      selector: (row) => row.addresses,
      sortable: true,
    },
    {
      key: "gender",
      label: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      key: "age",
      label: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
    {
      key: "patient_status",
      label: "Status",
      selector: (row) => row.patient_status,
      sortable: true,
    },
    {
      key: "account_status",
      label: "Account Status",
      selector: (row) => row.account_status,
      sortable: true,
      cell: (row) => (
        <div className="text-center">
          <span
            className={`px-2 py-1 rounded text-xs ${
              row.account_status === "Active"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {row.account_status === "Delete"
              ? "Deactivate"
              : row.account_status}
          </span>
        </div>
      ),
    },
    {
      key: "contact_number",
      label: "Contact",
      selector: (row) => row.contact_number,
      sortable: true,
    },

    {
      key: "actions",
      label: "Actions",
      cell: (row) => (
        <ButtonsComponent>
          <FormButton
            type="button"
            text="Edit"
            onClick={() => editPatient(row.patient_id)}
            icon={<FaEdit />}
            styles="flex items-center space-x-2 bg-gray-200 text-gray-800 rounded-md px-3 py-1.5 transition duration-150 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            textClass="text-gray-800"
            whileHover={{ scale: 1.02, opacity: 0.95 }}
            whileTap={{ scale: 0.98, opacity: 0.9 }}
          />
          {row.account_status === "Active" ? (
            <>
              <FormButton
                type="button"
                text="Deactivate"
                onClick={() => handleDeleteModal(row.patient_id)}
                icon={<FaTrash />}
                styles="flex items-center space-x-2 bg-gray-200 text-red-800 rounded-md px-3 py-1.5 transition duration-150 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                textClass="text-red-800"
                whileHover={{ scale: 1.02, opacity: 0.95 }}
                whileTap={{ scale: 0.98, opacity: 0.9 }}
              />
            </>
          ) : (
            <>
              <FormButton
                type="button"
                text="Reactivate"
                onClick={() => handleRecoverModal(row.patient_id)}
                icon={<FaBriefcase />}
                styles="flex items-center space-x-2 bg-gray-200 text-green-800 rounded-md px-3 py-1.5 transition duration-150 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                textClass="text-green-800"
                whileHover={{ scale: 1.02, opacity: 0.95 }}
                whileTap={{ scale: 0.98, opacity: 0.9 }}
              />
            </>
          )}
        </ButtonsComponent>
      ),
    },
  ];
  return (
    <div className="pt-20">
      <TableComponent columns={columns} data={data} />
      {showModal && (
        <PatientRegister onCancel={closeEditPatient} type="Edit" id={editId} />
      )}
      {showDeleteModal && (
        <ConfirmationModal
          type="Deactivate"
          person="patient"
          onSubmit={handleDeletePatients}
          onCancel={hideDeleteModal}
        />
      )}
      {showRecoverModal && (
        <>
          <ConfirmationModal
            type="Reactivate"
            person="patient"
            onSubmit={handleRecoverPatients}
            onCancel={hideRecoverModal}
          />
        </>
      )}
    </div>
  );
}

export default Patient;
