const Commentaire = require('../models/commentaire.js');


exports.createCommentaire = (req, res, next) => {
    console.log(req.body);
    const commentaire = new Commentaire({
        texte: req.body.texte,
        userId: req.body.userId,
        publicationId: req.body.publicationId
    });
    commentaire.save()
        .then(() => res.status(201).json(commentaire))
        .catch(error => res.status(400).json({ error }));
}

exports.getAllCommentaire = (req, res, next) => {
    Commentaire.find().then(
        (commentaires) => {
            res.status(200).json(commentaires);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.deleteCommentaire = (req, res, next) => {
    Commentaire.findOne({ _id: req.params.id })
        .then(commentaire => {
            Commentaire.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
                .catch(error => res.status(400).json({ error }));;
        })
        .catch(error => res.status(500).json({ error }));
};