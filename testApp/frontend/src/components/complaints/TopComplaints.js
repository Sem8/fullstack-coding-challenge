import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";

import axios from '../../axios-instance';
import "./styles/complaints.css";

const TopComplaints = () => {
  // function to get complaint account number:
  let accountNumber = str => {
    let slicedNum = str.slice(4);
    return parseInt(slicedNum);
  };

  // All complaints state:
  const [isLoading, setIsLoading] = useState(true);
  const [topComplaints, setTopComplaints] = useState([]);

  const councilmanToken = localStorage.getItem("councilmanToken");

  // handles getting only open complaints data:
  useEffect(() => {
    axios
      .get(`api/complaints/topComplaints/`, {
        "Content-Type": "application/json",
        headers: { Authorization: `Token ${councilmanToken}` }
      })
      .then(res => {
        console.log("open complaints res: ", res);

        setTopComplaints(res.data);
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
        Top complaints in your district
      </h1>
      <table id="complaints">
        <thead>
          <tr>
            <th>Complaint Type</th>
            <th>Number of Complaints Made</th>

          </tr>
        </thead>
        <tbody>
          {topComplaints &&
            topComplaints.map((topComplaintType, index) => {
              // console.log("topComplaintType account: ", topComplaintType["account"]);

              // Get number of the district complaint is being made in
              let complaintDistNum = accountNumber(topComplaintType[1]["account"]);
              console.log('complaintDistNum: ', complaintDistNum);

              console.log('topComplaintName: ', topComplaintType[0]);
              console.log('topComplaintCount: ', topComplaintType[1]['count']);

              // Get councilman district
              let councilmanDistNum = localStorage.getItem(
                "councilmanDistrict"
              );

              // Display top complaints that were made in the logged in councilman's district
              if (complaintDistNum == parseInt(councilmanDistNum)) {

                return (
                  <>
                    <tr key={index + 1}>
                      <td>{topComplaintType[0]}</td>
                      <td>{topComplaintType[1]['count']}</td> 
                    </tr>
                  </>
                );
              }
            })}
        </tbody>
      </table>
    </>
  );
}

export default withRouter(TopComplaints);
