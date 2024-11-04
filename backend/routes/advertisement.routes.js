const {
  getAdvertisements,
  getAdvertisement,
  addAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
  getAdvertisementsByCategory,
  getAdvertisementsBySearch,
} = require("../controllers/advertisement.controller");
const upload = require("../middlewares/multer.middleware");
const express = require("express");
const advertisementRouter = express.Router();

advertisementRouter
  .route("/")
  .get((req, res, next) => {
    if (req.query.category) {
      return getAdvertisementsByCategory(req, res, next);
    } else {
      return getAdvertisements(req, res, next);
    }
  })
  .post(upload.single("Image"), addAdvertisement);

advertisementRouter.route("/search").get(getAdvertisementsBySearch);

advertisementRouter
  .route("/:id")
  .get(getAdvertisement)
  .put(upload.single("Image"), updateAdvertisement)
  .delete(deleteAdvertisement);

module.exports = advertisementRouter;
