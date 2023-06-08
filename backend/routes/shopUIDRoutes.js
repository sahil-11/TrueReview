const express = require('express');
const router = express.Router();
const {adduid} = require('../controllers/shopUidController');
const { isAuthenticated } = require('../middleware/shopAuth');


//auth routes
// /api/shop/adduid
router.post('/shop/adduid',isAuthenticated, adduid);
// router.get('/shop/me', isAuthenticated, userProfile);

module.exports = router;