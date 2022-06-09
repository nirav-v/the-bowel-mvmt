const { gql } = require("apollo-server-express");

const typeDefs = gql`
  "Unix time stamp in milliseconds."
  scalar Date

  type Query {
    "Find the logged in user."
    me: User

    nearbyRestrooms(lon: Float, lat: Float): [Restroom]!

    singleRestroom(restroomId: ID!): Restroom
  }

  type Mutation {
    createUser(email: String!, password: String!, username: String!): Auth
    login(email: String!, password: String!): Auth

    saveRestroom(
      _id: ID!
    ): User

    createRestroom(
      areaDescription: String!
      lat: Float
      lon: Float
      changingStation: Boolean!
      keyRequired: Boolean!
      adaAccessible: Boolean!
    ): Restroom

    addReview(restroomId: ID!, reviewText: String!, rating: Float!): Restroom
  }

  type Location {
    type: String
    coordinates: [Float]
  }

  type Auth {
    token: String!
    user: User!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    lastLogin: Date!
    savedRestrooms: [Restroom]
  }

  type Restroom {
    _id: ID!
    areaDescription: String!
    location: Location
    changingStation: Boolean!
    keyRequired: Boolean!
    adaAccessible: Boolean!
    reviews: [Review]
    avgRating: Int!
  }

  type Review {
    reviewText: String!
    rating: Float!
    createdAt: String
    username: String!
    userId: ID
  }
`;

module.exports = typeDefs;
