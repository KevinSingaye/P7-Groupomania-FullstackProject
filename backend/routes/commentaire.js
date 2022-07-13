const express = require('express');
const router = express.Router();
const commentaireCtrl = require('../controllers/commentaire');

router.post('/', commentaireCtrl.createCommentaire);

module.exports = router;