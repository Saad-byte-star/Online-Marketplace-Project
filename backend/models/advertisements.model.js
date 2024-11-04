const mongoose = require("mongoose")
const advertisementSchema = new mongoose.Schema({
    Name: {
      type: mongoose.SchemaTypes.String,
      required: true
    },
    Price: {
      type: mongoose.SchemaTypes.Number,
      required: true
    },
    Image:{
      type: mongoose.SchemaTypes.String,
      required:true
    },
    Description: {
      type: mongoose.SchemaTypes.String,
      required: true
    },
    PostedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true
    },
    StartsOn: {
      type: mongoose.SchemaTypes.String,
      required: true,
      default: Date.now
    },
    EndsOn: {
      type: mongoose.SchemaTypes.String,
      required: true
    },
    Status: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'AdvertisementStatus',
      required: true
    },
    Type: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'AdvertisementType',
      required: true
    },
    Category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'AdvertisementCategory',
      required: true
    },
    CityArea: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'CityArea',
      required: true
    }
  });
  
  // Indexes for text search
  // advertisementSchema.index({ Name: 'text', Category: 'text', CityArea: 'text' });
  
  const Advertisement = mongoose.model('Advertisement', advertisementSchema);
  
  module.exports = Advertisement;
  
