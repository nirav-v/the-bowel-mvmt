import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { Rating } from "@mui/material";
import AccessibleIcon from "@mui/icons-material/Accessible";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import KeyIcon from "@mui/icons-material/Key";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { NEARBY_RESTROOMS } from "../util/queries";

export const useCoords = () => {
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState(null);
  const [pending, setPending] = useState(true);
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const browserLon = position.coords.longitude;
        const browserLat = position.coords.latitude;
        const coords = { lat: browserLat, lon: browserLon };
        setCoords(coords);
        setPending(false);
      },
      (error) => {
        setError(error);
      }
    );
  } else {
    setError(new Error("geolocation api unavailable"));
  }
  return { error, coords, pending };
};

export default function NearbyRestroomList() {
  // we have getUserLocation returning a promise that we can access the coordinates from
  const userCoords = useCoords();

  // we only want to set our restrooms state after the NEARBY_RESTROOMS query has finished loading the data
  const [getNearbyRestrooms, { loading, error, data }] =
    useLazyQuery(NEARBY_RESTROOMS);

  // useEffect prevents getUserLocation() from recursively running after each re-render of NearbyRestroomList component
  // we call the getNearbyRestrooms lazy query which returns an object with a nearbyRestrooms property containing our array of nearby restrooms
  useEffect(() => {
    if (userCoords.coords) {
      const { lat, lon } = userCoords.coords;
      getNearbyRestrooms({
        variables: { lat, lon },
      });
    }
  }, [userCoords.coords, getNearbyRestrooms]);

  if (userCoords.pending) {
    return <h2>your location is needed to find nearby restrooms</h2>;
  }

  if (error || userCoords.error) {
    // alert("unexpected server error, redirecting to home page...");
    Swal.fire({
      icon: "error",
      title: "Unexpected server error, redirecting to home page...",
      // text: error,
      backdrop: `
        rgba(0,0,123,0.4)
        `,
    });
    return <Navigate to="/" />;
  }

  // show loading message until our array of restrooms is ready to render
  if (loading || !data) {
    return <h2>Searching NEARBY RESTROOMS...</h2>;
  }

  const restrooms = data.nearbyRestrooms;

  // function with logic for avgRating to return avg rating of a restroom
  const getAvgRating = (restroom) => {
    try {
      let reviews = restroom.reviews;

      if (!reviews.length) {
        return 0;
      }
      let total = 0;
      for (let i = 0; i < reviews.length; i++) {
        total += reviews[i].rating;
      }
      var avgRating = total / reviews.length; // had to use var for avgRating to be globally available outside the conditional

      return avgRating;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        maxHeight: "50vh",
        overflow: "auto",
        backgroundColor: "#F9F9F9",
        fontSize: "20px",
      }}
    >
      {restrooms &&
        restrooms.map((restroom) => (
          <div
            style={{
              marginLeft: "10px",
            }}
            key={restroom._id}
          >
            <Link
              style={{
                textDecoration: "none",
                fontSize: "25px",
                fontWeight: "bold",
                color: "rgb(0,127,255)",
              }}
              to={`/singleRestroom/${restroom._id}`}
            >
              {restroom.areaDescription}
            </Link>
            <p
              style={{
                marginTop: "0px",
              }}
            >
              Rating:
              <Rating
                name="half-rating"
                defaultValue={getAvgRating(restroom)}
                precision={0.1}
                readOnly
              />
              {restroom.adaAccessible ? <AccessibleIcon /> : null}
              {restroom.changingStation ? <BabyChangingStationIcon /> : null}
              {restroom.keyRequired ? <KeyIcon /> : null}
            </p>
          </div>
        ))}
    </div>
  );
}
