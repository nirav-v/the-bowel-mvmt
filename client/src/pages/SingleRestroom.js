import React from "react";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import RestroomList from "../components/RestroomList";

import { SINGLERESTROOM } from "../util/queries";

export default function SingleRestroom() {
  const { restroomId } = useParams();
  const { loading, data } = useQuery(SINGLERESTROOM, {
    variables: { restroomId: restroomId },
  });
}
