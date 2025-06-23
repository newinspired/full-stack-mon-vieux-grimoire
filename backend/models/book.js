const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  year: { type: Number },
  genre: { type: String },
  imageUrl: { type: String },
  ratings: [{
    userId: { type: String, required: false },
    grade: { type: Number, required: true }
  }],
  averageRating: { type: Number }
});

module.exports = mongoose.model('Book', bookSchema);