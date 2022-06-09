import React from "react";
// import {
//   StyleSheet,
//   Text,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
// } from "react-native";

import toiletPaper from "../images/toilet_paper_rolls.jpeg";
import Paper from "@mui/material/Paper";

const styles = {
  formControl: {
    display: "flex",
    padding: "0.25em",
  },
  label: {
    flex: "0 1 6em",
    paddingRight: "0.25em",
  },
  paperContainer: {
    backgroundImage: `url(${toiletPaper})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    // height: 1300,
  },
  divStyle: {
    overflowY: "scroll",
    border: "1px solid red",
    width: "500px",
    // float: "left",
    height: "500px",
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    color: "white",
    fontSize: "30px",
  },
};

export default function RestroomsNearYou() {
  return (
    <Paper style={styles.paperContainer} sx={{ height: "100%" }}>
      <h1
        style={{
          textAlignVertical: "center",
          textAlign: "center",
          backgroundColor: "rgba(52, 52, 52, 0.8)",
          color: "white",
        }}
      >
        Login or Sign up to add a new restroom OR leave a review
      </h1>
      <div style={styles.divStyle}>
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
        scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet
        fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
        commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis
        consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
        facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur
        ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
        nisl consectetur et.
      </div>
    </Paper>
  );
}
