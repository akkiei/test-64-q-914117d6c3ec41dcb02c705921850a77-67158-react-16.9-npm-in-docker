import React, { useState } from "react";
import ModalCompo from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const Modal = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const updateTable = props.updateTable;
  const postApi = process.env.REACT_APP_API_URL + "/api/leads/";
  const handleSave = async () => {
    const result = {
      first_name: firstName,
      last_name: lastName,
      mobile: mobile,
      email: email,
      location_type: locationType,
      location_string: locationString,
    };

    console.log(result);
    try {
      const req = await axios.post(postApi, result);
      updateTable();
      handleClose();
    } catch (e) {
      console.log(e);
      alert("Please check your inputs");
    }
  };

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [locationType, setLocationType] = useState("Zip");
  const [locationString, setLocationString] = useState();

  return (
    <div>
      <input
        type="button"
        className="add_lead_modal_btn"
        onClick={handleShow}
        value="Add Lead"
      />
      <ModalCompo show={show} onHide={handleClose}>
        <ModalCompo.Header closeButton>
          <ModalCompo.Title>Add Lead</ModalCompo.Title>
        </ModalCompo.Header>
        <ModalCompo.Body>
          <form className="add_lead_form">
            <label>First Name</label>
            <input
              name="first_name"
              type="text"
              value={firstName}
              required
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
            <label>Last Name</label>
            <input
              name="last_name"
              type="text"
              value={lastName}
              required
              onChange={(e) => setLastName(e.target.value)}
            ></input>
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label>Mobile</label>
            <input
              name="mobile"
              type="num"
              value={mobile}
              required
              onChange={(e) => setMobile(e.target.value)}
            ></input>
            <label>Location Type</label>
            <select
              name="location_type"
              onChange={(e) => {
                console.log(e.target.value);
                setLocationType(e.target.value);
              }}
            >
              <option value="City">City</option>
              <option value="Zip">Zip</option>
              <option value="Country">Country</option>
            </select>
            <label>Location String</label>
            <input
              name="location_string"
              type="text"
              value={locationString}
              required
              onChange={(e) => setLocationString(e.target.value)}
            ></input>
            <ModalCompo.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                className="add_lead_btn"
                onClick={handleSave}
              >
                Save
              </Button>
            </ModalCompo.Footer>
          </form>
        </ModalCompo.Body>
      </ModalCompo>
    </div>
  );
};

export default Modal;
