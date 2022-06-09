import { gql } from "@apollo/client";

export const ME = gql`
  query Me {
    me {
      _id
      username
      email
      lastLogin
      savedRestrooms {
        _id
        areaDescription
        location {
          type
          coordinates
        }
        changingStation
        keyRequired
        adaAccessible
        reviews {
          reviewText
          rating
          createdAt
          username
          userId
        }
      }
    }
  }
`;

export const NEARBYRESTROOM = gql`
  query NearbyRestroom {
    nearbyRestrooms {
      _id
      areaDescription
      location {
        type
        coordinates
      }
      changingStation
      keyRequired
      adaAccessible
      reviews {
        reviewText
        rating
        createdAt
        username
        userId
      }
    }
  }
`;

export const SINGLERESTROOM = gql`
  query SingleRestroom($restroomId: ID!) {
    singleRestroom(restroomId: $restroomId) {
      _id
      areaDescription
      location {
        type
        coordinates
      }
      changingStation
      keyRequired
      adaAccessible
      reviews {
        reviewText
        rating
        createdAt
        username
        userId
      }
    }
  }
`;
