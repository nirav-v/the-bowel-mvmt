import React from 'react';
import { Rating } from '@mui/material';
import AccessibleIcon from '@mui/icons-material/Accessible';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';

// restroom list card

export default function NearbyRestroomList() {

    // temporary made up restroom array we can pass from backend in home.js later
const restrooms = [
{
  areaDescription: "Dominos Bathroom on Lake Murray Blvd",
  location: {
    type: "Point",
    coordinates: [
      -117.01294123839926,
      32.80313911814198
    ]
  },
  changingStation: false,
  keyRequired: false,
  adaAccessible: true,
  reviews: [],
},
{
  areaDescription: "in n out restroom",
  location: {
    type: "Point",
    coordinates: [
      -116.99426807954728,
      32.84074248221512
    ]
  },
  changingStation: false,
  keyRequired: false,
  adaAccessible: true,
  reviews: [],

}
]

  return (
    <div>
 {restrooms &&
        restrooms.map((restroom) => (
          <div key={restroom._id}>
           <h3 >{restroom.areaDescription}</h3> 
        <p>Rating: <Rating name="half-rating" defaultValue={4} precision={0.5} /> <AccessibleIcon/> <BabyChangingStationIcon/></p>
          </div>
        ))}
       
        
</div>
  )
}






