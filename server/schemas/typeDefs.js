const { gql } = require("apollo-server-express");

const typeDefs = gql`
  "Unix time stamp in milliseconds."
  scalar Date

  type Query {
    "Find the logged in user."
    me: User

    """ nearbyRestrooms(location: [Int]): [Restroom]! """

    singleRestroom(_id: ID!): Restroom

  }

  type Mutation {
    createUser(email: String!, password: String!, username: String!): Auth
    login(email: String!, password: String!): Auth
    

    saveRestroom(_Id: ID!, areaDescription: String!, location: [Int], changingStation: Boolean!, keyRequired: Boolean!, adaAccessible: Boolean!, reviews: [String]): User

    createRestroom( areaDescription: String!, lat: Int, lon: Int, changingStation: Boolean!, keyRequired: Boolean!, adaAccessible: Boolean!): Restroom
  
    addReview(reviewText: String!, rating: Int!, username: String!): Restroom
  }


type Location {
  type: String
  coordinates: [Int]
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
    rating: Int!
    createdAt: Date!
    username: String!
    userId: String!
  }
`;

module.exports = typeDefs;
