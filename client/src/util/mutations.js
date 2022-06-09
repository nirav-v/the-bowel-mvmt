import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!, $username: String!) {
    createUser(email: $email, password: $password, username: $username) {
      token
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const CREATE_RESTROOM = gql`
mutation Mutation($areaDescription: String!, $changingStation: Boolean!, $keyRequired: Boolean!, $adaAccessible: Boolean!, $lat: Float, $lon: Float) {
  createRestroom(areaDescription: $areaDescription, changingStation: $changingStation, keyRequired: $keyRequired, adaAccessible: $adaAccessible, lat: $lat, lon: $lon) {
    _id
    areaDescription
    location {
      type
      coordinates
    }
    changingStation
    keyRequired
    adaAccessible
  }
}
`;

export const SAVE_RESTROOM = gql`
mutation SaveRestroom($id: ID!) {
  saveRestroom(_id: $id) {
    username
    savedRestrooms {
      areaDescription
      location {
        type
        coordinates
      }
      adaAccessible
      reviews {
        reviewText
        rating
        createdAt
      }
    }
    email
    lastLogin
    _id
  }
}
`;

export const ADD_REVIEW = gql`
  mutation AddReview($restroomId: ID!, $reviewText: String!, $rating: Float!) {
  addReview(restroomId: $restroomId, reviewText: $reviewText, rating: $rating) {
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