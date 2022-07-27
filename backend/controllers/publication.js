const Publication = require('../models/publication.js');
const fs = require('fs');

exports.createPublication = (req, res, next) => {
    console.log(req.body);
    let image = req.files ? req.files[0] : undefined;
    const publication = new Publication({
        texte: req.body.texte,
        userId: req.body.userId,
        likes: 0,
        imageUrl: image ? `${req.protocol}://${req.get("host")}/images/${image.filename}` : null,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []

    });

    publication.save()
        .then(() => res.status(201).json(publication))
        .catch(error => res.status(400).json({ error }));
};

exports.getOnePublication = (req, res, next) => {
    Publication.findOne({
        _id: req.params.id
    }).then(
        (publication) => {
            res.status(200).json(publication);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.modifyPublication = (req, res, next) => {
    let file = req.files ? req.files[0] : undefined;
    const publicationObject = file ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${file.filename}`
    } : {...req.body };
    console.log(publicationObject)
    Publication.updateOne({ _id: req.params.id }, {...publicationObject, _id: req.params.id })
        .then(() => res.status(200).json(publicationObject))
        .catch(error => res.status(400).json({ error }));
};

exports.deletePublication = (req, res, next) => {
    Publication.findOne({ _id: req.params.id })
        .then(publication => {
            const filename = publication.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Publication.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Publication supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllPublication = (req, res, next) => {
    Publication.find().sort({ "dateSaved": -1 }).then(
        (publications) => {
            res.status(200).json(publications);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );

};

// Aimer ou pas une sauce
exports.likeOrNot = (req, res, next) => {
    console.log(req.body);
    const like = JSON.parse(req.body.like);
    console.log(like)
    if (like === 1) {

        Publication.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } })
            .then((publication) => res.status(200).json({ message: 'Like ajouté !' }))
            .catch(error => res.status(400).json({ error }))
    } else if (like === -1) {
        Publication.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } })
            .then((publication) => res.status(200).json({ message: 'Dislike ajouté !' }))
            .catch(error => res.status(400).json({ error }))
    } else if (like === 0) {
        Publication.findOne({ _id: req.params.id })
            .then(publication => {
                if (publication.usersLiked.includes(req.body.userId)) {
                    Publication.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
                        .then((publication) => { res.status(200).json({ message: 'Like supprimé !' }) })
                        .catch(error => res.status(400).json({ error }))
                } else if (publication.usersDisliked.includes(req.body.userId)) {
                    Publication.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                        .then((publication) => { res.status(200).json({ message: 'Dislike supprimé !' }) })
                        .catch(error => res.status(400).json({ error }))
                }
            })
            .catch(error => res.status(400).json({ error }))
    } else {
        res.status(500).json({ message: 'choix non valide' })
    }
}