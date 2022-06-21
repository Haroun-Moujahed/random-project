import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

import axiosWithAuth from "../../../../Utils/AxiosWithAuth";

import "./Messages.css";

function Messages() {
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    axiosWithAuth
      .get(`${process.env.REACT_APP_API_URL}/admin/reports/`)
      .then((response) => {
        setMessages(response.data.content);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const DetailsBtn = (messageValues) => {
    return (
      <Link
        to={`${messageValues.id}`}
        target="_blank"
        className="detailsBtnLink"
      >
        <Button
          className="p-button-info p-button-rounded p-button-outlined infoBtn"
          icon="pi pi-external-link"
        />
      </Link>
    );
  };

  const MessageStatus = (messageValues) => {
    let toDisplayStatus = "";
    switch (messageValues.reportStatus) {
      case "RESOLVED": {
        toDisplayStatus = "Résolu ✅";
        break;
      }
      case "PENDING": {
        toDisplayStatus = "En Attente ⚠️";
        break;
      }
      case "IGNORED": {
        toDisplayStatus = "Ignoré ⛔";
        break;
      }
      default:
        toDisplayStatus = "None";
    }
    return <p>{toDisplayStatus}</p>;
  };

  return (
    <section className="messagesSection">
      {messages ? (
        <div className="card">
          <div className="p-fluid">
            <DataTable
              value={messages}
              responsiveLayout="scroll"
              id="messagesTable"
            >
              <Column
                field="email"
                header="Email"
                style={{ width: "20%" }}
              ></Column>
              <Column
                field="phone"
                header="Téléphone"
                style={{ width: "20%" }}
              ></Column>
              <Column
                field="subject"
                header="Objet"
                style={{ width: "30%" }}
              ></Column>
              <Column
                field="status"
                header="Statut"
                body={MessageStatus}
                style={{ width: "20%" }}
              ></Column>
              <Column header="Détails" body={DetailsBtn}></Column>
            </DataTable>
          </div>
        </div>
      ) : (
        <div className="spinnerContainer">
          <ProgressSpinner animationDuration="1.5s" strokeWidth="5" />
        </div>
      )}
    </section>
  );
}

export default Messages;
