import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";

import axios from "../../axios-instance";
import "./styles/complaints.css";

import Navigate from '../Navigate';

const ConstituentComplaints = () => {
  // function to get complaint account number getting rid of 0 padding:
  let accountNumber = str => {
    let slicedNum = str.slice(4);
    return parseInt(slicedNum);
  };

  // Constituent complaints state:
  const [isLoading, setIsLoading] = useState(true);
  const [constituentComplaints, setConstituentComplaints] = useState([]);

  // Get logged in user's token from local storage to access protected endpoints
  const councilmanToken = localStorage.getItem("councilmanToken");

  // handles getting only non null data values for complaint_type and council_dist data:
  useEffect(() => {
    axios
      .get(`api/complaints/constituentComplaints/`, {
        "Content-Type": "application/json",
        headers: { Authorization: `Token ${councilmanToken}` }
      })
      .then(res => {
        console.log("constituent complaints res: ", res);

        // Set incoming data to state:
        setConstituentComplaints(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log("open complaints err: ", err);
      });
  }, []);

  return (
    <>
    <Navigate />
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
        Complaints by your constituents
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
          {constituentComplaints &&
            constituentComplaints.map(eachConstituentComplaint => {
              // console.log("eachConstituentComplaint council_dist: ", eachConstituentComplaint["council_dist"]);

              // Get number of the district the complaint maker lives in:
              let complaintDistNum = accountNumber(
                eachConstituentComplaint["council_dist"]
              );
              // console.log('complaintDistNum: ', complaintDistNum);

              // Get councilman district:
              let councilmanDistNum = localStorage.getItem(
                "councilmanDistrict"
              );

              // Display complaints from councilman's constituents where complaint council_dist matches councilman's district:
              if (complaintDistNum == parseInt(councilmanDistNum)) {
                // let uniqueKey = accountNumber(eachConstituentComplaint.unique_key);

                return (
                  <>
                    <tr
                      key={accountNumber(eachConstituentComplaint.unique_key)}
                    >
                      <td>{eachConstituentComplaint.unique_key}</td>
                      <td>{eachConstituentComplaint.account}</td>
                      <td>{eachConstituentComplaint.opendate}</td>
                      <td>{eachConstituentComplaint.complaint_type}</td>
                      <td>{eachConstituentComplaint.descriptor}</td>
                      <td>{eachConstituentComplaint.zip}</td>
                      <td>{eachConstituentComplaint.borough}</td>
                      <td>{eachConstituentComplaint.city}</td>
                      <td>{eachConstituentComplaint.council_dist}</td>
                      <td>{eachConstituentComplaint.community_board}</td>
                      <td>{eachConstituentComplaint.closedate}</td>
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

export default withRouter(ConstituentComplaints);
