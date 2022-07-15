const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentaireCtrl = require('../controllers/commentaire');



router.post('/', auth, commentaireCtrl.createCommentaire);
router.get('/:post', auth, commentaireCtrl.getAllCommentaire);
router.delete('/:id', auth, commentaireCtrl.deleteCommentaire);

module.exports = router;