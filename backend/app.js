const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/book');     
const userRoutes = require('./routes/user');   

const app = express();

// Connexion MongoDB locale
mongoose.connect('mongodb://127.0.0.1:27017/grimoire', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connexion MongoDB locale réussie'))
.catch((err) => console.error('❌ Échec de connexion MongoDB locale', err));

// Middleware JSON
app.use(express.json());

// Middleware CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// MODIFIER UN LIVRE 

app.put('/api/book/:id', (req, res, next) => {
  Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});


// ROUTE DELETE

app.delete('/api/book/:id', (req, res, next) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});



// Enregistrement des routes

app.use('/api/books', bookRoutes); 
app.use('/api/auth', userRoutes);      

module.exports = app;