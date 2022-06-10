import React from "react";
import Button from "@mui/material/Button";
// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import ReviewList from "../components/ReviewList";

import { SINGLERESTROOM } from "../util/queries";
import { SAVE_RESTROOM } from "../util/mutations";
import { removeClientSetsFromDocument } from "@apollo/client/utilities";

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

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        Put toilet name here...
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
    </div>
  );
}
