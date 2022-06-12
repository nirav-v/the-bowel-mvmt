import React from "react";
import Button from "@mui/material/Button";
import rolls from "../images/toilet_paper_rolls.jpeg";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Rating from '@mui/material/Rating';

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import ReviewList from "../components/ReviewList";

import { SINGLERESTROOM } from "../util/queries";
import { SAVE_RESTROOM } from "../util/mutations";
import { removeClientSetsFromDocument } from "@apollo/client/utilities";
import AddReviewForm from "../components/AddReviewForm/index";
import { VariablesInAllowedPositionRule } from "graphql";

const styles = {
  paperContainer: {
    backgroundImage: `url(${rolls})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    // height: 1300,
  },
};

export default function SingleRestroom() {
  const [saveRestroom, saveRestroomState] = useMutation(SAVE_RESTROOM);
  const { restroomId } = useParams();
  const { loading, data } = useQuery(SINGLERESTROOM, {
    variables: { restroomId: restroomId },
  });

  const restroom = data?.singleRestroom || {};
  console.log(restroom)
   const reviews = data?.singleRestroom.reviews || {};
   console.log(reviews)

  // // logic for getting average rating
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
      alert("Restroom has been saved successfully!");
    } catch (error) {
      console.log(error);
      alert("Error, please try again later");
    }
  };

  // const [value, setValue] = React.useState(0);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Paper style={styles.paperContainer} sx={{ height: "100%" }}>
      <CssBaseline />
      <Typography
        gutterBottom
        variant="h5"
        sx={{ fontWeight: "bold", py: 2 }}
        style={{
          textAlignVertical: "center",
          textAlign: "center",
        }}
      >
        View restroom and reviews
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        style={{ minHeight: "100vh" }}
      >
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
            <div>
              <Typography gutterBottom>
                Location: {restroom.areaDescription}
              </Typography>
              <Typography gutterBottom>
                Key/Code Required:{" "}
                {restroom.keyRequired === true ? "Yes" : "No"}
              </Typography>
              <Typography gutterBottom>
                Changing Station:{" "}
                {restroom.changingStation === true ? "Yes" : "No"}
              </Typography>
              <Typography gutterBottom>
                ADA Accessible: {restroom.adaAccessible === true ? "Yes" : "No"}
              </Typography>
              <Typography gutterBottom>
                Average Rating: {avgRating? avgRating + " out of 5 stars" : "No Reviews Yet"}
                  <Rating name="read-only" value={avgRating? avgRating: null} precision={0.1} readOnly />
              </Typography>
            </div>
            {/* <form onSubmit={handleSubmit}> */}
            <form>
              <div className="my-3">
                {/* <h3 className="card-header bg-dark text-light p-2 m-0">
                  User reviews here
                </h3> */}
                <div className="bg-light py-4">
                  <blockquote
                    className="p-4"
                    style={{
                      fontSize: "1.5rem",
                      fontStyle: "italic",
                      border: "2px dotted #1a1a1a",
                      lineHeight: "1.5",
                    }}
                  >
                    {restroom.areaDescription}
                    <Button
                      variant="contained"
                      sx={{ textTransform: "capitalize" }}
                      onClick={() => handleSaveRestroom(restroom._id)}
                    >
                      {"Save Restroom"}
                    </Button>
                  </blockquote>
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
