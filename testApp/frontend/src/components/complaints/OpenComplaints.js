import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import axios from "../../axios-instance";
import "./styles/complaints.css";
import Navigate from "../Navigate";
import LinearProgress from "@material-ui/core/LinearProgress";

const OpenComplaints = props => {
  // function to get complaint account number getting rid of 0 padding:
  let accountNumber = str => {
    let slicedNum = str.slice(4);
    return parseInt(slicedNum);
  };

  // Open complaints state:
  const [isLoading, setIsLoading] = useState(true);
  const [openComplaints, setOpenComplaints] = useState([]);

  // Get logged in user's token from local storage to access protected endpoints:
  const councilmanToken = localStorage.getItem("councilmanToken");

  // handles getting only open complaints data:
  useEffect(() => {
    axios
      .get(`api/complaints/openCases/`, {
        "Content-Type": "application/json",
        headers: { Authorization: `Token ${councilmanToken}` }
      })
      .then(res => {
        // Set incoming data to state and loading to false:
        setOpenComplaints(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log("open complaints err: ", err);

        // Redirect to 404 Error Page upon error:
        props.history.push(`/errorpage`);
      });
  }, []);

  return (
    <>
      <Navigate />
      {isLoading ? (
        <LinearProgress color="primary" />
      ) : (
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
            Open complaints in your district
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
                  // Get number of the district complaint is being made in:
                  let complaintDistNum = accountNumber(
                    eachComplaint["account"]
                  );

                  // Get councilman district:
                  let councilmanDistNum = localStorage.getItem(
                    "councilmanDistrict"
                  );

                  // Display open complaints that were made in the logged in councilman's district:
                  if (complaintDistNum == parseInt(councilmanDistNum)) {
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
          <p>
            * If you don't see any complaints then you have no complaints in
            your district{" "}
          </p>
        </>
      )}
    </>
  );
};

export default withRouter(OpenComplaints);
