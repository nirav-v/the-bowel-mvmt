import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Rating from "@mui/material/Rating";

const ReviewList = ({ reviews = [] }) => {
  if (!reviews.length) {
    return <h3>No Restroom Yet</h3>;
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
            // <div key={review._id} className="col-12 mb-3 pb-3">
            //   <div className="p-3 bg-dark text-light">
            //     <p className="card-body">{review.reviewText}</p>
            //     <p className="card-body">{review.rating + " stars"}</p>
            //   </div>
            // </div>
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
                  <Typography>Review: {review.reviewText}</Typography>
                  <Typography>Rating: {review.rating + " stars"}</Typography>
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
