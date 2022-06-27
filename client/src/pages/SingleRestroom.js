import React from "react";
import Button from "@mui/material/Button";
import rolls from "../images/toilet_paper_rolls.jpeg";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import cat from "../images/cat.gif";
import Swal from "sweetalert2";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import ReviewList from "../components/ReviewList";

import { SINGLERESTROOM } from "../util/queries";
import { SAVE_RESTROOM } from "../util/mutations";
// import { removeClientSetsFromDocument } from "@apollo/client/utilities";
import AddReviewForm from "../components/AddReviewForm/index";
// import { VariablesInAllowedPositionRule } from "graphql";

const styles = {
  paperContainer: {
    backgroundImage: `url(${rolls})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
};

export default function SingleRestroom() {
  const [saveRestroom, saveRestroomState] = useMutation(SAVE_RESTROOM);
  const { restroomId } = useParams();
  const { loading, data } = useQuery(SINGLERESTROOM, {
    variables: { restroomId: restroomId },
  });

  const restroom = data?.singleRestroom || {};
  console.log(restroom);
  const reviews = data?.singleRestroom.reviews || {};
  console.log(reviews);

  // logic for getting average rating
  if (reviews.length) {
    let total = 0;
    for (let i = 0; i < reviews.length; i++) {
      total += reviews[i].rating;
    }
    var avgRating = total / reviews.length; // had to use var for avgRating to be globally available outside the conditional
  }

  const handleSaveRestroom = async (restroomId) => {
    try {
      await saveRestroom({
        variables: {
          id: restroomId,
        },
      });
      // alert("Restroom has been saved successfully!");
      Swal.fire({
        icon: "success",
        title: "Restroom has been saved successfully!",
        backdrop: `
          rgba(0,0,123,0.4)
          url(${cat})
          left top
          no-repeat
          `,
      });
    } catch (error) {
      console.log(error);
      // alert("Error, please try again later");
      Swal.fire({
        icon: "error",
        title: "Error, please try again later",
        // text: error,
        backdrop: `
          rgba(0,0,123,0.4)
          `,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
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
        <Alert
          icon={false}
          severity="warning"
          style={{
            fontSize: "20px",
            margin: "15px",
          }}
        >
          <strong>View Restroom And Reviews</strong>
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
            <div style={{ textAlign: "center" }}>
              <Typography gutterBottom>
                <strong>Location: </strong>
                {restroom.areaDescription}
              </Typography>
              <Typography gutterBottom>
                <strong>Key/Code Required: </strong>{" "}
                {restroom.keyRequired === true ? "Yes" : "No"}
              </Typography>
              <Typography gutterBottom>
                <strong>Changing Station: </strong>{" "}
                {restroom.changingStation === true ? "Yes" : "No"}
              </Typography>
              <Typography gutterBottom>
                <strong>ADA Accessible: </strong>
                {restroom.adaAccessible === true ? "Yes" : "No"}
              </Typography>
              <Typography gutterBottom>
                <strong>Average Rating: </strong>{" "}
                {avgRating ? avgRating + " out of 5 stars" : "No Reviews Yet"}
              </Typography>
              <Rating
                name="read-only"
                value={avgRating ? avgRating : null}
                precision={0.1}
                readOnly
              />
            </div>
            <form>
              <div className="my-3">
                <div className="bg-light py-4">
                  <blockquote
                    className="p-4"
                    style={{
                      fontSize: "30px",
                      fontStyle: "italic",
                      border: "2px dotted #1a1a1a",
                      lineHeight: "1.5",
                      textAlign: "center",
                    }}
                  >
                    <strong>{restroom.areaDescription}</strong>
                  </blockquote>
                  <Box textAlign="center">
                    <Button
                      variant="contained"
                      sx={{ textTransform: "capitalize" }}
                      onClick={() => handleSaveRestroom(restroom._id)}
                    >
                      Save Restroom
                    </Button>
                  </Box>
                </div>
                <div className="my-5">
                  <ReviewList reviews={restroom.reviews} />
                </div>
                {/* Review form from component */}
                <AddReviewForm />
              </div>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Paper>
  );
}
