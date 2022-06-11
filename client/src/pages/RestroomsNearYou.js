import React from "react";
import NearbyRestroomList from "../components/nearbyRestroomsList";
import CssBaseline from "@mui/material/CssBaseline";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
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
    // border: "1px solid red",
    width: "500px",
    // float: "left",
    height: "500px",
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
    // backgroundColor: "rgba(52, 52, 52, 0.8)",
    // color: "white",
    fontSize: "30px",
  },
};

export default function RestroomsNearYou() {
  return (
    <Paper style={styles.paperContainer} sx={{ height: "100%" }}>
      <CssBaseline />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        style={{ minHeight: "100vh" }}
      >
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
        <Card
          // style={{ maxWidth: 650, padding: "20px 5px", borderRadius: "16px", backgroundColor: 'transparent', }}
          style={{
            maxWidth: 650,
            padding: "20px 5px",
            borderRadius: "16px",
            opacity: 0.9,
            marginBottom: 30,
          }}
        >
          <CardContent>
            <div style={styles.divStyle}>
              {/* put components here */}
              <NearbyRestroomList/>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Paper>
  );
}
