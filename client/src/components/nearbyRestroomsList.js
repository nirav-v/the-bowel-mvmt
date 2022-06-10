import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useQuery, useLazyQuery } from "@apollo/client";
import { Rating } from "@mui/material";
import AccessibleIcon from "@mui/icons-material/Accessible";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import KeyIcon from "@mui/icons-material/Key";

import { NEARBY_RESTROOMS } from "../util/queries";

export default function NearbyRestroomList() {
  // we declare out restrooms state variable with an initial state of false which will later be set to our array of nearby restrooms
  const [restrooms, setRestroomState] = useState(false);

  // we have getUserLocation returning a promise that we can access the coordinates from
  const getUserLocation = () =>
    new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        console.log("geolocation is available ");
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const browserLon = await position.coords.longitude;
            const browserLat = await position.coords.latitude;
            const coords = { lat: browserLat, lon: browserLon };
            resolve(coords);
          },
          (error) => {
            console.log(error);
            reject(error);
          }
        );
      } else {
        console.log("geolocation IS NOT available");
        reject();
      }
    });

  // we only want to set our restrooms state after the NEARBY_RESTROOMS query has finished loading the data
  const [getNearbyRestrooms, { loading, error, data }] = useLazyQuery(
    NEARBY_RESTROOMS,
    {
      onCompleted: () => setRestroomState(data.nearbyRestrooms),
    }
  );

  // useEffect prevents getUserLocation() from recursively running after each re-render of NearbyRestroomList component
  // we call the getNearbyRestrooms lazy query which returns an object with a nearbyRestrooms property containing our array of nearby restrooms
  useEffect(() => {
    getUserLocation().then((res) => {
      getNearbyRestrooms({
        variables: {
          lat: res.lat,
          lon: res.lon,
        },
      });
    });
  }, []);

  // show loading message until our array of restrooms is ready to render
  if (!restrooms.length){
    return <h2>LOADING NEARBY RESTROOMS...</h2>;
  }

  return (
    <div>
      {restrooms &&
        restrooms.map((restroom) => (
          <div key={restroom._id}>
            <Link to={`/singleRestroom/${restroom._id}`}>
            <h3>{restroom.areaDescription}</h3>
            </Link>
            <p>
              Rating:{" "}
              <Rating name="half-rating" defaultValue={4} precision={0.5} />
              {restroom.adaAccessible ? <AccessibleIcon /> : null}
              {restroom.changingStation ? <BabyChangingStationIcon /> : null}
              {restroom.keyRequired ? <KeyIcon /> : null}
            </p>
          </div>
        ))}
    </div>
  );
}
