import React, { useState } from "react";

import { ProgressSpinner } from "primereact/progressspinner";
import { Dropdown } from "primereact/dropdown";
import { toast } from "react-toastify";

import axiosWithAuth from "../../../../../Utils/AxiosWithAuth";
import "./StatusDropdown.css";

function StatusDropdown({ messageId, messageStatus, setMessageValues }) {
  const [showStatusLoading, setShowStatusLoading] = useState(false);

  const statuses = [
    { label: "Résolu ✅", value: "RESOLVED" },
    { label: "Ignoré ⛔", value: "IGNORED" },
    { label: "En Attente ⚠️", value: "PENDING" },
  ];

  const handleStatusChange = (id, status) => {
    setShowStatusLoading(true);
    axiosWithAuth
      .put(`${process.env.REACT_APP_API_URL}/admin/report/${id}`, {
        reportStatus: status.value,
      })
      .then((response) => {
        setShowStatusLoading(false);
        setMessageValues(response.data);
        toast.success("Statut changé avec succès", {
          theme: "light",
        });
      })
      .catch((err) => {
        setShowStatusLoading(false);
        toast.error("Une erreur est survenue", {
          theme: "light",
        });
        throw err;
      });
  };

  return (
    <div className="statusDropdownContainer">
      <Dropdown
        value={messageStatus}
        options={statuses}
        onChange={(status) => handleStatusChange(messageId, status)}
        placeholder="Selectionner un statut"
      />
      {showStatusLoading ? (
        <ProgressSpinner
          className="statusSpinner"
          animationDuration="1.5s"
          strokeWidth="5"
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default StatusDropdown;
