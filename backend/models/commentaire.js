const mongoose = require('mongoose');


const commentaireSchema = mongoose.Schema({
    userId: { type: String, required: true },
    texte: { type: String, required: true },
    publicationId: { type: String, required: true }
});

module.exports = mongoose.model('Commentaire', commentaireSchema);