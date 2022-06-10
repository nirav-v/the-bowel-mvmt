import React from "react";
import Button from "@mui/material/Button";
import rolls from "../images/toilet_paper_rolls.jpeg";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import ReviewList from "../components/ReviewList";

import { SINGLERESTROOM } from "../util/queries";
import { SAVE_RESTROOM } from "../util/mutations";
import { removeClientSetsFromDocument } from "@apollo/client/utilities";

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

  const handleSaveRestroom = async (restroomId) => {
    try {
      await saveRestroom({
        variables: {
          id: restroomId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };


  const [value, setValue] = React.useState(0);

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
        <Card
          // style={{ maxWidth: 650, padding: "20px 5px", borderRadius: "16px", backgroundColor: 'transparent', }}
          style={{
            maxWidth: 650,
            padding: "20px 5px",
            borderRadius: "16px",
            opacity: 0.9,
          }}
        >
 
          <CardContent>
            <Typography gutterBottom variant="h5">
              Put toilet name here
            </Typography>
            {/* <form onSubmit={handleSubmit}> */}
            <form>
              <div className="my-3">
                <h3 className="card-header bg-dark text-light p-2 m-0">
                  User reviews here
                </h3>
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
                              <Button onClick={() => handleSaveRestroom(restroom._id)}>
            {"Save Restroom"}
          </Button>
                  </blockquote>
                </div>

                <div className="my-5">
                  <ReviewList reviews={restroom.reviews} />
                </div>

                <Typography
                  gutterBottom
                  variant="body2"
                  component="p"
                  color="textSecondary"
                >
                  Tell us how you feel after your visit...
                </Typography>
                <Rating
                  name="size-medium"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
                <TextField
                  label="Your review"
                  placeholder="Insert text to add a review"
                  fullWidth
                  required
                  multiline
                  rows={10}
                  // id="margin-normal"
                  // margin="normal"
                />
                <TextField
                  label="Photo URL"
                  placeholder="Input photo URL"
                  fullWidth
                  // id="margin-normal"
                  // margin="normal"
                  id="margin-dense"
                  margin="dense"
                />
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  type="submit"
                  // justifyContent="flex-end"
                >
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Paper>
  );
}
