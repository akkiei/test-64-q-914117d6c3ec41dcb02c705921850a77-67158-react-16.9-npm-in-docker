import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import "../App.css";
import TableRB from "react-bootstrap/Table";
import AddModal from "./AddLeadModal";

const Table = (props) => {
  const [listLeads, setListLeads] = useState([]);
  const [update, setUpdate] = useState(props.update);
  const apiURLGet =
    process.env.REACT_APP_API_URL + "/api/leads/?location_string=India";
  console.log(update);
  const getList = async () => {
    const listOfLeads = await axios.get(apiURLGet);
    setListLeads([...listOfLeads.data]);
  };

  const updateTable = () => {
    setUpdate(update + 1);
    getList();
  };

  useEffect(() => {
    console.log("api call to update table");
    getList();
  }, [update]);

  return (
    <div>
      <AddModal updateTable={updateTable} />
      <div className="leads_table">
        <TableRB striped bordered hover variant="dark">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Num</th>
              <th>Location Type</th>
              <th>Location String</th>
              <th>Action</th>
            </tr>
            {listLeads.map((lead, index) => {
              return (
                <tr key={`${lead}_${index}`}>
                  <td>{lead.first_name + " " + lead.last_name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.mobile}</td>
                  <td>{lead.location_type}</td>
                  <td>{lead.location_string}</td>
                  <td className="sameCell">
                    <UpdateModal
                      id={lead.id}
                      update={updateTable}
                      communication={lead.communication}
                    />
                    <DeleteModal id={lead.id} update={updateTable} />
                  </td>
                  {/* <td></td> */}
                </tr>
              );
            })}
          </tbody>
        </TableRB>
      </div>
    </div>
  );
};

export default Table;
