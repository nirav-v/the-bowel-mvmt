import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Rating } from "@mui/material";
import AccessibleIcon from "@mui/icons-material/Accessible";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import KeyIcon from "@mui/icons-material/Key";

import { NEARBY_RESTROOMS } from "../util/queries";

export default function NearbyRestroomList() {
  const [userLon, setUserLon] = useState();
  const [userLat, setUserLat] = useState();

  // function to get browsers coordinates
  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      console.log("geolocation is available ");
      navigator.geolocation.getCurrentPosition((position) => {
        const browserLon = position.coords.longitude;
        console.log("browserLon: ", browserLon);
        setUserLon(browserLon);
        const browserLat = position.coords.latitude;
        console.log("browserLat: ", browserLat);
        setUserLat(browserLat);
      });
    } else {
      console.log("geolocation IS NOT available");
    }
  };

    // prevent getUserLocation() from recursively running after each re-render of component
  useEffect(() => {
    getUserLocation();
  }, []);


  const { loading, data } = useQuery(NEARBY_RESTROOMS, {
    variables: {
      lat: userLat,
      lon: userLon,
    },
  });

  console.log(data);

  const restroomArray = async(data) => {
    const restroomData = await data
    console.log(restroomData)
    return restroomData
  }
 



  if (data){
  console.log(data.nearbyRestrooms)
 // const restrooms = data.nearbyRestrooms
  //  return restrooms
}

 // getUserLocation();

  // temporary made up restroom array we can pass from backend in home.js later
  const restrooms = [
    {
      areaDescription: "Dominos Bathroom on Lake Murray Blvd",
      location: {
        type: "Point",
        coordinates: [-117.01294123839926, 32.80313911814198],
      },
      changingStation: true,
      keyRequired: true,
      adaAccessible: false,
      reviews: [],
    },
    {
      areaDescription: "in n out restroom",
      location: {
        type: "Point",
        coordinates: [-116.99426807954728, 32.84074248221512],
      },
      changingStation: false,
      keyRequired: true,
      adaAccessible: true,
      reviews: [],
    },
  ];



  return (
    <div>
      {restrooms &&
        restrooms.map((restroom) => (
          <div key={restroom._id}>
            <h3>{restroom.areaDescription}</h3>
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

// temporary made up restroom array we can pass from backend in home.js later
// const restrooms = [
//   {
//     areaDescription: "Dominos Bathroom on Lake Murray Blvd",
//     location: {
//       type: "Point",
//       coordinates: [-117.01294123839926, 32.80313911814198],
//     },
//     changingStation: true,
//     keyRequired: true,
//     adaAccessible: false,
//     reviews: [],
//   },
//   {
//     areaDescription: "in n out restroom",
//     location: {
//       type: "Point",
//       coordinates: [-116.99426807954728, 32.84074248221512],
//     },
//     changingStation: false,
//     keyRequired: true,
//     adaAccessible: true,
//     reviews: [],
//   },
// ];
