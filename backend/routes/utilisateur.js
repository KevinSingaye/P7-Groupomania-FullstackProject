const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config')

const utilisateurCtrl = require('../controllers/utilisateur');

router.post('/signup', multer, utilisateurCtrl.signup);
router.post('/login', utilisateurCtrl.login);

module.exports = router;