const express = require('express');
const {
    uploadImage,
    searchImage,
} = require('../controllers/imageController');
// const verifyToken = require('../middlewares/verifyToken')

const router = express.Router();

router.route('/upload').post(  uploadImage,);

router.route('/search').get( searchImage);

module.exports = router;