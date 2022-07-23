const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth');

const utilisateurCtrl = require('../controllers/utilisateur');

router.post('/signup', multer, utilisateurCtrl.signup);
router.post('/login', utilisateurCtrl.login);
router.get('/:id', auth, utilisateurCtrl.findOne);

module.exports = router;