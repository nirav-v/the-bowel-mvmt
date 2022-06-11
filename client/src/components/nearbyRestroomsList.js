import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, useLazyQuery } from "@apollo/client";
import { Rating } from "@mui/material";
import AccessibleIcon from "@mui/icons-material/Accessible";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import KeyIcon from "@mui/icons-material/Key";
import { Navigate } from "react-router-dom";

import { NEARBY_RESTROOMS } from "../util/queries";

const useCoords = () => {
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
  // we declare out restrooms state variable with an initial state of false which will later be set to our array of nearby restrooms
  //const [restrooms, setRestroomState] = useState(false);

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
      console.count("fetching");
    }
  }, [userCoords.coords, getNearbyRestrooms]);

  if (userCoords.pending) {
    return <h2>your location is needed to find nearby restrooms</h2>;
  }

  if (error || userCoords.error) {
    alert("unexpected server error, redirecting to home page...");
    return <Navigate to="/" />;
  }

  // show loading message until our array of restrooms is ready to render
  if (loading || !data) {
    return <h2>Searching NEARBY RESTROOMS...</h2>;
  }
  const restrooms = data.nearbyRestrooms;

  console.log(restrooms);

  return (
    <div>
      {restrooms &&
        restrooms.map((restroom) => (
          <div key={restroom._id}>
            <Link to={`/singleRestroom/${restroom._id}`}>
              {/* <h3>{restroom.areaDescription}</h3> */}
              {restroom.areaDescription}
            </Link>
            <p>
              Rating:{" "}
              <Rating
                name="half-rating read-only"
                defaultValue={4}
                precision={0.5}
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
