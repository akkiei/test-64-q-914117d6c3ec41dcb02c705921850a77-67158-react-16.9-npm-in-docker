import React, { useState } from "react";
import ModalCompo from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const Modal = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [comm, setComm] = useState(props.communication || "");
  const id = props.id;
  const update = props.update;
  const updateURL = process.env.REACT_APP_API_URL + `/api/mark_lead/${id}`;
  const handleSave = async () => {
    //
    const req = await axios.put(updateURL, {
      communication: comm,
    });
    update();
    handleClose();
  };
  return (
    <div>
      <Button
        className="update_lead_modal_btn"
        variant="primary"
        onClick={handleShow}
      >
        Mark Update
      </Button>
      <form className="update_lead_form">
        <ModalCompo show={show} onHide={handleClose}>
          <ModalCompo.Header closeButton>
            <ModalCompo.Title>Mark Communication</ModalCompo.Title>
          </ModalCompo.Header>
          <ModalCompo.Body>
            Communication
            <textarea
              name="communication"
              type="textarea"
              rows="3"
              cols="50"
              value={comm}
              onChange={(e) => setComm(e.target.value)}
            />
          </ModalCompo.Body>
          <ModalCompo.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="success"
              className="update_lead_btn"
              onClick={handleSave}
            >
              Save
            </Button>
          </ModalCompo.Footer>
        </ModalCompo>
      </form>
    </div>
  );
};

export default Modal;
