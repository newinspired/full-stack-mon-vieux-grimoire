const mongoose = require('mongoose');

// SCHEMA DE TOUT LES LIVRES

const bookSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  ratings: [
    {
        userId: { type: String },
        grade: { type: Number },
    }
  ],
  averageRating: { type: Number },
});

// On exporte le modèle comme modèle réutilisable

module.exports = mongoose.model('Book', bookSchema);