const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const commentaireCtrl = require('../controllers/commentaire');

router.post('/', auth, multer, commentaireCtrl.createCommentaire);

module.exports = router;