import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";

import axios from '../../axios-instance';
import "./styles/complaints.css";

const OpenComplaints = props => {

  // function to get complaint account number:
  let accountNumber = str => {
    let slicedNum = str.slice(4);
    return parseInt(slicedNum);
  };

  // All complaints state:
  const [isLoading, setIsLoading] = useState(true);
  const [openComplaints, setOpenComplaints] = useState([]);

  const councilmanToken = localStorage.getItem("councilmanToken");

  // handles getting only open complaints data:
  useEffect(() => {
    axios
      .get(`api/complaints/openCases/`, {
        "Content-Type": "application/json",
        headers: { Authorization: `Token ${councilmanToken}` }
      })
      .then(res => {
        console.log("open complaints res: ", res);

        setOpenComplaints(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log("open complaints err: ", err);
      });
  }, []);

  return (
    <>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          background: "#3f51b5",
          color: "white",
          width: "800px",
          margin: "20px auto",
          padding: "10px",
          borderRadius: "20px"
        }}
      >
        All complaints in your district
      </h1>
      <table id="complaints">
        <thead>
          <tr>
            <th>Unique Key</th>
            <th>Complaint Account District</th>
            <th>Open Date</th>
            <th>Complaint Type</th>
            <th>Descriptor</th>
            <th>Zip Code</th>
            <th>Borough</th>
            <th>City</th>
            <th>Complaint Council District</th>
            <th>Community Board</th>
            <th>Closed Date</th>
          </tr>
        </thead>
        <tbody>
          {openComplaints &&
            openComplaints.map(eachComplaint => {
              // console.log("eachComplaint account: ", eachComplaint["account"]);

              // Get number of the district complaint is being made in
              let complaintDistNum = accountNumber(eachComplaint["account"]);
              // console.log('complaintDistNum: ', complaintDistNum);

              // Get councilman district
              let councilmanDistNum = localStorage.getItem(
                "councilmanDistrict"
              );

              // Display open complaints that were made in the logged in councilman's district
              if (complaintDistNum == parseInt(councilmanDistNum)) {
                // let uniqueKey = accountNumber(eachComplaint.unique_key);

                return (
                  <>
                    <tr key={accountNumber(eachComplaint.unique_key)}>
                      <td>{eachComplaint.unique_key}</td>
                      <td>{eachComplaint.account}</td>
                      <td>{eachComplaint.opendate}</td>
                      <td>{eachComplaint.complaint_type}</td>
                      <td>{eachComplaint.descriptor}</td>
                      <td>{eachComplaint.zip}</td>
                      <td>{eachComplaint.borough}</td>
                      <td>{eachComplaint.city}</td>
                      <td>{eachComplaint.council_dist}</td>
                      <td>{eachComplaint.community_board}</td>
                      <td>{eachComplaint.closedate}</td>
                    </tr>
                  </>
                );
              }
            })}
        </tbody>
      </table>
    </>
  );
};


export default withRouter(OpenComplaints);
