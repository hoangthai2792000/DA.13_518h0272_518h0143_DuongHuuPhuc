const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
} = require("../controllers/reviewController");

const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");
const { route } = require("express/lib/router");

// router.route('/').get(getAllReviews).post(authenticateUser, createReview)
router.route("/").get(getAllReviews).post(createReview);

router
  .route("/:id")
  .get(getSingleReview)
  .patch(updateReview)
  .delete(deleteReview);
  // .patch(authenticateUser, updateReview)
  // .delete(authenticateUser, deleteReview);

router.route("/product/:id").get(getSingleProductReviews);

module.exports = router;
