const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
} = require('../controllers/reviewController')

const express = require('express')
const router = express.Router()

const { authenticateUser } = require('../middleware/authentication')

router.route('/').get(getAllReviews).post(createReview)
// router.route('/').get(getAllReviews).post(createReview)

router
  .route('/:id')
  .get(getSingleReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview)

router.route("/products/:id").get(getSingleProductReviews);
module.exports = router
