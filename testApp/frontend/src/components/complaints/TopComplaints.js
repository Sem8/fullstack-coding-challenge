import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import axios from "../../axios-instance";
import "./styles/complaints.css";
import Navigate from "../Navigate";
import LinearProgress from "@material-ui/core/LinearProgress";

const TopComplaints = (props) => {
  // Function to get the 0 padded version of the district number for numbers less than 0, ex. '1' -> '01'
  let districtPadding = districtNum => {
    if (parseInt(districtNum) < 10) {
      return `0${districtNum}`;
    } else {
      return `${districtNum}`;
    }
  };

  // Top complaints state:
  const [isLoading, setIsLoading] = useState(true);
  const [topComplaints, setTopComplaints] = useState([]);

  // Get token from local storage:
  const councilmanToken = localStorage.getItem("councilmanToken");

  // handles getting only open complaints data:
  useEffect(() => {
    axios
      .get(`api/complaints/topComplaints/`, {
        "Content-Type": "application/json",
        headers: { Authorization: `Token ${councilmanToken}` }
      })
      .then(res => {

        // Get 0 padded version of logged in user's district:
        let councilmanDistrict = districtPadding(
          localStorage.getItem("councilmanDistrict")
        );

        // Access the logged in councilman's top complaints based on his district:
        let topComplaintsData = res.data[`NYCC${councilmanDistrict}`];

        // Set the topComplaints data to state and loading to false:
        setTopComplaints(topComplaintsData);
        setIsLoading(false);
      })
      .catch(err => {
        console.log("top complaints err: ", err);

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
            Top 3 complaints in your district
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
                topComplaints.slice(0, 3).map((topComplaintType, index) => {
                  return (
                    <>
                      <tr key={index + 1}>
                        <td>{topComplaintType[0]}</td>
                        <td>{topComplaintType[1]}</td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
          <p>
            * If you don't see any complaints then you had no complaints in your
            district{" "}
          </p>
          <p>
            * If you see less than 3 complaints here then you had less than 3
            complaints in your district{" "}
          </p>
        </>
      )}
    </>
  );
};

export default withRouter(TopComplaints);
