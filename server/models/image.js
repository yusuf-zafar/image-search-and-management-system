
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  title: {type: String},
  description: {type: String},
  keywords: [String],
  tags: [String],
  imageUrl: {type: String},
  name: {type: String},
},
{ timestamps: true });

module.exports = mongoose.model('Image', imageSchema);
