import React, { useState, useEffect } from "react";

import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";

import { toast } from "react-toastify";

import axiosWithAuth from "../../../../Utils/AxiosWithAuth";

import "./MailSend.css";

function MailSend() {
  const [mailsList, setMailsList] = useState([]);
  const [suggestionMails, setSuggestionMails] = useState([]);
  const [selectedMails, setSelectedMails] = useState([]);
  const [mailSubject, setMailSubject] = useState("");
  const [mailContent, setMailContent] = useState("");
  const [attachments, setAttachments] = useState(null);
  const [sendToAll, setSendToAll] = useState(false);

  useEffect(() => {
    axiosWithAuth
      .get(`${process.env.REACT_APP_API_URL}/emails`)
      .then((response) => {
        setMailsList(response.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const handleFilesUpload = (event) => {
    setAttachments(event.files);
  };

  const handleRecipientChange = (e) => {
    setSelectedMails(e.value);
  };

  const completeMailSuggestions = (event) => {
    const searchRegex = new RegExp(event.query, "i");
    let filteredMails = mailsList
      .filter((mailData) => mailData.email.match(searchRegex))
      .map((mailData) => mailData.email);
    setSuggestionMails(filteredMails);
  };

  const handleFileRemove = (event) => {
    setAttachments(
      attachments.filter(
        (attachment) => attachment.objectURL !== event.file.objectURL
      )
    );
  };

  const handleSubmit = () => {
    if (!sendToAll && !selectedMails.length) {
      toast.error(
        "L'adresse mail du destinataire est vide ou n'existe pas dans la liste"
      );
    } else {
      var formData = new FormData();
      formData.append("attachments", attachments);
      formData.append("subject", mailSubject);
      formData.append("content", mailContent);
      selectedMails.forEach((mail) => {
        formData.append("to", mail);
      });
      if (attachments) {
        attachments.forEach((attachment) => {
          formData.append("attachments", attachment);
        });
      }
      axiosWithAuth
        .post(`${process.env.REACT_APP_API_URL}/admin/send-email`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast.success("Votre mail a ??t?? envoy?? avec succ??s");
          console.log("mail sent successfully!");
        })
        .catch((err) => {
          toast.error("Une erreur est survenue!");
          throw err;
        });
    }
  };
  const chooseOptions = { label: "Selectionnez", icon: "pi pi-fw pi-folder" };
  return (
    <section className="mailSendSection">
      <div id="mailForm">
        <div id="sendToAllCheckBox">
          <Checkbox
            onChange={(e) => setSendToAll(e.checked)}
            checked={sendToAll}
          ></Checkbox>
          <label className="p-checkbox-label">Envouyer ?? tous</label>
        </div>
        <AutoComplete
          disabled={sendToAll ? true : false}
          multiple
          value={selectedMails}
          suggestions={suggestionMails}
          completeMethod={completeMailSuggestions}
          onChange={handleRecipientChange}
          className="mailAutoComplete"
          placeholder="Envoyer ??"
        />
        <InputText
          placeholder="Entrez l'objet du mail"
          value={mailSubject}
          onChange={(e) => setMailSubject(e.target.value)}
        />

        <InputTextarea
          placeholder="Entrez le contenu du mail"
          value={mailContent}
          onChange={(e) => setMailContent(e.target.value)}
        />

        <FileUpload
          name="demo[]"
          url="./upload"
          multiple
          auto
          customUpload
          uploadHandler={handleFilesUpload}
          emptyTemplate="Pi??ces jointes (drag and drop to upload)"
          chooseOptions={chooseOptions}
          onRemove={handleFileRemove}
        />
        <div className="sendBtnContainer">
          <Button label="Envoyez" icon="pi pi-send" onClick={handleSubmit} />
        </div>
      </div>
    </section>
  );
}

export default MailSend;
