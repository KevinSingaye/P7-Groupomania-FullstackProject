const Commentaire = require('../models/commentaire.js');
const fs = require('fs');

exports.createCommentaire = (req, res, next) => {
    console.log(req.body);

    const commentaire = new Commentaire({
        texte: req.body.texte,
        userId: req.body.userId

    });

    commentaire.save()
        .then(() => res.status(201).json(commentaire))
        .catch(error => res.status(400).json({ error }));
};