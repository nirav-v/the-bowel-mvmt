const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { User, Restroom } = require("../models");
const { signToken } = require("../util/auth");
const { dateScalar } = require("./customScalars");

const resolvers = {
  Date: dateScalar,
  Query: {
    me: async (parent, args, ctx) => {
      // if ctx.user is undefined, then no token or an invalid token was
      // provided by the client.
      if (!ctx.user) {
        throw new AuthenticationError("Must be logged in.");
      }
      return User.findOne({ email: ctx.user.email }).populate("savedRestrooms");
    },
    nearbyRestrooms: async (parent, args, context) => {
      try {
        return Restroom.find({
          location: {
            $near: {
              $maxDistance: 10000000,
              $geometry: {
                type: "Point",
                coordinates: [args.lon, args.lat], // takes an array [lon, lat], pass in the userLocation variable on client side
              },
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    singleRestroom: async (parent, { restroomId }, context) => {
      try {
        return Restroom.findOne({ _id: restroomId });
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      try {
        const user = await User.create({ ...args });
        const token = await signToken(user);
        return { user, token };
      } catch (error) {
        if (error.name === "MongoError" && error.code === 11000) {
          const [[key, value]] = Object.entries(error.keyValue);
          throw new UserInputError(`${key} "${value}" already exists.`);
        }
        throw error;
      }
    },
    login: async (parent, args) => {
      const { email, password } = args;
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Invalid username or password");
      }
      const authentic = await user.isCorrectPassword(password);
      if (!authentic) {
        throw new AuthenticationError("Invalid username or password");
      }
      const token = await signToken(user);
      user.lastLogin = Date.now();
      await user.save();
      return { token, user };
    },
    createRestroom: async (parent, args, context) => {
      if (context.user) {
        try {
          const restroom = await Restroom.create({
            ...args,
            location: { type: "Point", coordinates: [args.lon, args.lat] },
          });

          return restroom;
        } catch (error) {
          console.log(error);
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addReview: async (parent, { restroomId, reviewText, rating }, context) => {
      if (context.user) {
        return Restroom.findOneAndUpdate(
          { _id: restroomId },
          {
            $addToSet: {
              reviews: {
                reviewText,
                rating,
                username: context.user.username,
                userId: context.user._id,
              },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    saveRestroom: async (
      parent,
      {
        _id,
        areaDescription,
        location,
        changingStation,
        keyRequired,
        adaAccessible,
        reviews,
      },
      context
    ) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              savedRestrooms: {
                _id,
                areaDescription,
                location,
                changingStation,
                keyRequired,
                adaAccessible,
                reviews,
              },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        ).populate("savedRestrooms");
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeSavedRestroom: async (parent, { restroomId }, context) => {
      if (context.user) {
        // console.log(restroomId)
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedRestrooms: restroomId } },
          { new: true }
        ).populate("savedRestrooms");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
