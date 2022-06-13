import React from "react";
import NearbyRestroomList from "../components/nearbyRestroomsList";
import CssBaseline from "@mui/material/CssBaseline";
import Alert from "@mui/material/Alert";
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
  },
  divStyle: {
    overflowY: "scroll",
    width: "500px",
    height: "500px",
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#F9F9F9",
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
        <Alert variant="filled" severity="info" sx={{ mb: 2 }}>
          Login or Sign up to add a new restroom OR leave a review
        </Alert>
        <Card
          style={{
            maxWidth: 650,
            padding: "20px 5px",
            borderRadius: "16px",
            opacity: 0.9,
            marginBottom: 30,
          }}
        >
          <CardContent>
            <NearbyRestroomList />
          </CardContent>
        </Card>
      </Grid>
    </Paper>
  );
}
