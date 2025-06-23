const Book = require('../models/book');

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);

  const book = new Book({
    ...bookObject, 
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  book.save()
    .then(() => res.status(201).json({ message: 'Post saved successfully!' }))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
};

// MODIFIER LE LIVRE 

exports.modifyBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Livre non trouvé." });
      }
      if (book.userId !== req.auth.userId) {
        return res.status(403).json({ message: "Non autorisé à modifier ce livre." });
      }

      const updatedBook = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.auth.userId // Toujours le user connecté, pas celui envoyé dans le body
      };

      Book.updateOne({ _id: req.params.id }, { ...updatedBook })
        .then(() => res.status(200).json({ message: "Livre mis à jour avec succès !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// SUPPRIMER LE LIVRE 

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Livre non trouvé." });
      }

      if (book.userId !== req.auth.userId) {
        return res.status(403).json({ message: "Non autorisé à supprimer ce livre." });
      }

      Book.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Livre supprimé avec succès !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllStuff = (req, res, next) => {
  Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};

exports.getBestRatedBooks = (req, res, next) => {
  Book.find()
    .sort({ averageRating: -1 })  
    .limit(3)                    
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};