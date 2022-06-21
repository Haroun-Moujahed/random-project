import React, { useEffect } from "react";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { toast } from "react-toastify";

import axiosWithAuth from "../../../../Utils/AxiosWithAuth";

import "./MailsList.css";

function MailsList() {
  const [newMail, setNewMail] = useState("");
  const [mailsList, setMailsList] = useState([]);

  useEffect(() => {
    axiosWithAuth
      .get(`${process.env.REACT_APP_API_URL}/emails`)
      .then((response) => {
        setMailsList(response.data);
      })
      .catch((err) => {
        toast.error("Une erreur est survenue!");
        throw err;
      });
  }, []);

  const handleAddNewMail = (e) => {
    e.preventDefault();
    axiosWithAuth
      .post(`${process.env.REACT_APP_API_URL}/emails`, { email: newMail })
      .then(() => {
        setNewMail("");
        axiosWithAuth
          .get(`${process.env.REACT_APP_API_URL}/emails`)
          .then((response) => {
            setMailsList(response.data);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        toast.error("Email invalide ou existe déjà!");
        throw err;
      });
  };

  const handleUpdateMail = (rowData) => {
    const newData = rowData.newData;
    axiosWithAuth
      .patch(`${process.env.REACT_APP_API_URL}/emails/${newData._id}`, {
        email: newData.email,
      })
      .then(() => {
        axiosWithAuth
          .get(`${process.env.REACT_APP_API_URL}/emails`)
          .then((response) => {
            setMailsList(response.data);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleDeleteEmail = (id) => {
    axiosWithAuth
      .delete(`${process.env.REACT_APP_API_URL}/emails/${id}`)
      .then(() => {
        axiosWithAuth
          .get(`${process.env.REACT_APP_API_URL}/emails`)
          .then((response) => {
            setMailsList(response.data);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  };
  const fieldEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
        style={{ width: "50%" }}
      />
    );
  };

  const DeleteBtn = (rowData) => {
    return (
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger p-button-text"
        aria-label="Cancel"
        onClick={() => handleDeleteEmail(rowData._id)}
      />
    );
  };

  return (
    <section className="mailsSection">
      <div className="mailInputContainer">
        <form onSubmit={handleAddNewMail}>
          <InputText
            value={newMail}
            onChange={(e) => setNewMail(e.target.value)}
            id="mailInput"
            placeholder="Ajouter un nouveau mail ici..."
          />
          <Button label="Ajouter" icon="pi pi-plus" type="submit" />
        </form>
      </div>
      {mailsList ? (
        <div className="card">
          <div className="p-fluid">
            <DataTable
              id="messagesTable"
              value={mailsList}
              responsiveLayout="scroll"
              editMode="row"
              rows={5}
              paginator={true}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              onRowEditComplete={handleUpdateMail}
            >
              <Column
                field="email"
                header="Email"
                style={{ width: "20%" }}
                editor={(options) => fieldEditor(options)}
              ></Column>
              <Column
                rowEditor={true}
                headerStyle={{ width: "1%", minWidth: "8rem" }}
                bodyStyle={{ textAlign: "center" }}
              ></Column>
              <Column headerStyle={{ width: "1%" }} body={DeleteBtn}></Column>
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

export default MailsList;
