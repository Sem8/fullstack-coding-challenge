import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import axios from "../../axios-instance";
import "./styles/complaints.css";
import Navigate from "../Navigate";
import LinearProgress from "@material-ui/core/LinearProgress";

const TopComplaints = () => {
  // Function to get the 0 padded version of the district number for numbers less than 0, ex. '1' -> '01'
  let districtPadding = districtNum => {
    if (parseInt(districtNum) < 10) {
      return `0${districtNum}`;
    } else {
      return `${districtNum}`;
    }
  };

  // // function to sort counts of complaints descending:
  // let sortDescending = (a, b) => {
  //   let aCount = a[1].count;
  //   let bCount = b[1].count;

  //   let comparison = 0;

  //   if (aCount > bCount) {
  //     comparison = 1;
  //   } else if (aCount < bCount) {
  //     comparison = -1;
  //   }

  //   return comparison * -1;
  // };

  // // Filter for complaints only from logged in councilman's district:
  // let matchingTopComplaint = (complaints) => {
  //   let userDistrict = accountNumber(complaints[1].account);
  //   let councilmanDistNum = parseInt(localStorage.getItem("councilmanDistrict"));

  //   return userDistrict == councilmanDistNum;

  // }

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
        // console.log("top complaints res: ", res);
        // console.log("top complaints res: ", res.data);
        console.log("top complaint access: ", res.data);

        let councilmanDistrict = districtPadding(
          localStorage.getItem("councilmanDistrict")
        );
        console.log(
          "top complaint access: ",
          res.data[`NYCC${councilmanDistrict}`]
        );
        let topComplaintsData = res.data[`NYCC${councilmanDistrict}`];
        // setTopComplaints(topComplaintsData);

        // sort the top complaints data by the number of counts of complaint type by descending order
        // topComplaintsData.sort(sortDescending);

        // Get the top complaint types that was made in the logged in councilman's district

        setTopComplaints(topComplaintsData);
        // console.log('topComplaints: ', topComplaints);
        setIsLoading(false);
      })
      .catch(err => {
        console.log("open complaints err: ", err);
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
                  // console.log("topComplaintType name: ", topComplaintType[0]);
                  // console.log("topComplaintType count: ", topComplaintType[1]);

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
