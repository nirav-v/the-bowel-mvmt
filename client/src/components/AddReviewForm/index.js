import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { ADD_REVIEW } from "../../util/mutations";
import Box from "@mui/material/Box";
import cat from "../../images/cat.gif";
import Swal from "sweetalert2";

const initialFormState = {
  reviewText: "",
};

export default function AddReviewForm() {
  const [value, setValue] = React.useState(0);
  const { restroomId } = useParams();

  const [formState, setFormState] = useState(initialFormState);

  const [addReview, { data, loading, error }] = useMutation(ADD_REVIEW);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(formState);

    try {
      await addReview({
        variables: {
          restroomId: restroomId,
          reviewText: formState.reviewText,
          rating: value,
        },
      });
      // alert("Your review has been added successfully!");
      Swal.fire({
        icon: "success",
        title: "Your review has been added successfully!",
        backdrop: `
          rgba(0,0,123,0.4)
          url(${cat})
          left top
          no-repeat
          `,
      });
    } catch (err) {
      console.log(err);
      // alert("Error, please check your entries or try again later");
      Swal.fire({
        icon: "error",
        title: "Error, please check your entries or try again later",
        // text: error,
        backdrop: `
          rgba(0,0,123,0.4)
          `,
      });
    }

    setFormState({
      reviewText: "",
    });

    setValue(0);
  };

  return (
    <div>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: "1px dotted #1a1a1a" }}
      >
        Add your review
      </h3>
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
        name="reviewText"
        value={formState.reviewText}
        onChange={handleInputChange}
        id="margin-normal"
        margin="normal"
      />
      {/* <TextField
        label="Photo URL"
        placeholder="Input photo URL"
        fullWidth
        id="margin-dense"
        margin="dense"
      /> */}
      <Box textAlign="center">
        <Button
          size="small"
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
}
