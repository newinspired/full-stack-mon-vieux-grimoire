const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/book');     
const userRoutes = require('./routes/user');   
const path = require('path');

mongoose.connect('mongodb+srv://newinspired:aurelienA1@cluster0.easnclg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  const app = express();

app.use(express.json());// Middleware permettant à Express d'extraire le corps JSON des requêtes POST

// MIDDLEWARE CORS

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// MIDDLEWARE POUR TRAITER LES IMAGES

app.use('/images', express.static(path.join(__dirname, 'images')));


//   Enregistrement des routeurs

app.use('/api/auth', userRoutes);
app.use('/api/books', bookRoutes);

module.exports = app;