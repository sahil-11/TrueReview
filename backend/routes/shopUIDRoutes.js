const express = require("express");
const router = express.Router();
const {
  adduid,
  addPhoto,
  updatePhoto,
} = require("../controllers/shopUidController");
const { isAuthenticated } = require("../middleware/shopAuth");

//auth routes
// /api/shop/adduid
router.post("/shop/adduid", isAuthenticated, adduid);

// /api/shop/addPhoto
router.post("/shop/addphoto", addPhoto);

// /api/shop/updatePhoto
router.patch("/shop/updatephoto", updatePhoto);

module.exports = router;
