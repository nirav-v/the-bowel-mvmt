import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

export default function AddReviewForm() {
  const [value, setValue] = React.useState(0);
  return (
    <div>
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
      />
      <TextField
        label="Photo URL"
        placeholder="Input photo URL"
        fullWidth
        id="margin-dense"
        margin="dense"
      />
      <Button size="small" variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </div>
  );
}
