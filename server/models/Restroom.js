const { Schema, model } = require("mongoose");

const reviewSchema = require("./Review");

const pointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const restroomSchema = new Schema({
  areaDescription: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  location: {
    type: pointSchema,
    index: '2dsphere' // Create a special 2dsphere index 
  },
  changingStation: {
    type: Boolean,
    required: true,
  },
  keyRequired: {
    type: Boolean,
    required: true,
  },
  adaAccessible: {
    type: Boolean,
    required: true,
  },
  reviews: [reviewSchema],
});

const Restroom = model("Restroom", restroomSchema);

module.exports = Restroom;
