import React from "react";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import ReviewList from "../components/ReviewList";

import { SINGLERESTROOM } from "../util/queries";
import { removeClientSetsFromDocument } from "@apollo/client/utilities";

export default function SingleRestroom() {
  const { restroomId } = useParams();
  const { loading, data } = useQuery(SINGLERESTROOM, {
    variables: { restroomId: restroomId },
  });
  console.log(data)
  const restroom = data?.singleRestroom || {};
console.log(restroom)
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
        </blockquote>
      </div>

      <div className="my-5">
        <ReviewList reviews={restroom.reviews} />
      </div>
    </div>
  );
}
