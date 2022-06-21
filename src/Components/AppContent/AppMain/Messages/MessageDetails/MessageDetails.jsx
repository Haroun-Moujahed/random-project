import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

import { Panel } from "primereact/panel";
import { ProgressSpinner } from "primereact/progressspinner";

import momentLoadFR from "../../../../../Utils/momentFR";
import axiosWithAuth from "../../../../../Utils/AxiosWithAuth";
import PanelHeader from "../../../../../Utils/PanelHeader/PanelHeader";

import StatusDropdown from "../StatusDropdown/StatusDropdown";

function MessageDetails() {
  momentLoadFR();
  const params = useParams();
  const [messageValues, setMessageValues] = useState(null);

  useEffect(() => {
    axiosWithAuth
      .get(`${process.env.REACT_APP_API_URL}/admin/reports/${params.id}`)
      .then((response) => {
        setMessageValues(response.data);
      })
      .catch((err) => {
        throw err;
      });
  }, [params.id]);

  return (
    <section className="detailsSection">
      {messageValues ? (
        <>
          <div className="detailsCreatedDate">
            <p>
              Envoyé le:{" "}
              {moment(messageValues?.createdAt).format("DD MMMM YYYY, h:mm:ss")}{" "}
            </p>
          </div>
          <Panel
            headerTemplate={() => PanelHeader("Email:", "email", messageValues)}
            className="detailsPanel"
          >
            <p>{messageValues.email}</p>
          </Panel>

          <Panel
            headerTemplate={() =>
              PanelHeader("Téléphone:", "phone", messageValues)
            }
            className="detailsPanel"
            fieldToCopy="phone"
          >
            <p>{messageValues.phone}</p>
          </Panel>
          <Panel
            headerTemplate={() =>
              PanelHeader("Sujet:", "subject", messageValues)
            }
            className="detailsPanel"
          >
            <p>{messageValues.subject}</p>
          </Panel>
          <Panel
            headerTemplate={() =>
              PanelHeader("Meesage:", "message", messageValues)
            }
            className="detailsPanel"
          >
            <p>{messageValues.message}</p>
          </Panel>

          <div className="dropdownContainer">
            <h3>Statut:</h3>
            <StatusDropdown
              messageId={params.id}
              messageStatus={messageValues.reportStatus}
              setMessageValues={setMessageValues}
            />
          </div>
        </>
      ) : (
        <div className="spinnerContainer">
          <ProgressSpinner animationDuration="1.5s" strokeWidth="5" />
        </div>
      )}
    </section>
  );
}

export default MessageDetails;
