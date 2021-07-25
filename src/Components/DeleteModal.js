import React, { useState } from "react";
import ModalCompo from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const Modal = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const id = props.id;
  const deleteURL = process.env.REACT_APP_API_URL + `/api/leads/${id}`;
  const update = props.update;
  const handleDelete = async () => {
    const req = await axios.delete(deleteURL);
    update();
    handleClose();
  };
  return (
    <div>
      <Button
        className="delete_lead_modal_btn"
        variant="danger"
        onClick={handleShow}
      >
        Delete
      </Button>
      <form className="delete_load_form">
        <ModalCompo show={show} onHide={handleClose}>
          <ModalCompo.Header closeButton>
            <ModalCompo.Title>
              Do you wish to delete this lead?
            </ModalCompo.Title>
          </ModalCompo.Header>
          <ModalCompo.Footer>
            <Button variant="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="danger"
              class="delete_lead_btn"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </ModalCompo.Footer>
        </ModalCompo>
      </form>
    </div>
  );
};

export default Modal;
