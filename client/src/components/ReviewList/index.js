import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Rating from "@mui/material/Rating";

const ReviewList = ({ reviews = [] }) => {
  if (!reviews.length) {
    return <h3>No review for this restroom yet</h3>;
  }

  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: "1px dotted #1a1a1a" }}
      >
        Reviews
      </h3>
      <div className="flex-row my-4">
        {reviews &&
          reviews.map((review) => (
            <div key={review.toString()}>
              <Accordion sx={{ bgcolor: "#C1DEAE", my: 1 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  // aria-controls="panel1a-content"
                  // id="panel1a-header"
                >
                  <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                    User: {review.username}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ mb: 2 }}>
                    <strong>Review: </strong>
                    {review.reviewText}
                  </Typography>
                  <Typography>
                    <strong>Rating: </strong>
                    {review.rating + " stars"}
                  </Typography>
                  <Rating name="read-only" value={review.rating} readOnly />
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
      </div>
    </>
  );
};

export default ReviewList;
