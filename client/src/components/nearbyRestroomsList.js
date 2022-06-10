import { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { Rating } from "@mui/material";
import AccessibleIcon from "@mui/icons-material/Accessible";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import KeyIcon from "@mui/icons-material/Key";

import { NEARBY_RESTROOMS } from "../util/queries";

export default function NearbyRestroomList() {
  const [userLon, setUserLon] = useState();
  const [userLat, setUserLat] = useState();
  const [restrooms, setRestroomState] = useState(false);

  // function to get browsers coordinates
  // const getUserLocation = async () => {
  //   if ("geolocation" in navigator) {
  //     console.log("geolocation is available ");
  //     navigator.geolocation.getCurrentPosition( async (position) => {
  //       const browserLon = await position.coords.longitude;
  //       console.log("browserLon: ", browserLon);
  //       setUserLon(browserLon);
  //       const browserLat = await position.coords.latitude;
  //       console.log("browserLat: ", browserLat);
  //       setUserLat(browserLat);
  //       return
  //     });
  //   } else {
  //     console.log("geolocation IS NOT available");
  //   }
  // };

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

  const [getNearbyRestrooms, { loading, error, data }] =
    useLazyQuery(NEARBY_RESTROOMS, {
      onCompleted: () => setRestroomState(data.nearbyRestrooms)
    });

  // prevent getUserLocation() from recursively running after each re-render of component
  useEffect(() => {
    getUserLocation().then((res) => {
      console.log(res);
      getNearbyRestrooms({
        variables: {
          lat: res.lat,
          lon: res.lon,
        },
      });
    });
  }, []);

  // if (data) {
  //   const restroom = data.nearbyRestrooms;
  //   console.log(restroom);
  //   setRestroomState(restroom);
  // }

  console.log(loading);
  console.log(data);
  // if(data){
  // //console.log(data)
  // const d = data.nearbyRestrooms
  // console.log(d)
  // }

  // if (loading){
  //   console.log('loading')
  // }

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
