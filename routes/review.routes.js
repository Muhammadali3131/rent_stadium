const {
  createReview,
  getAllReviews,
  deleteReviewById,
  updateReviewById,
  getReviewById,
} = require("../controllers/review.controller");

const router = require("express").Router();

router.post("/create", createReview);
router.get("/all", getAllReviews);
router.get("/:id", getReviewById);
router.put("/:id", updateReviewById);
router.delete("/:id", deleteReviewById);

module.exports = router;
