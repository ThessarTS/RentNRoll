const router = require("express").Router();

const ReviewController = require("../controllers/reviewController");
const authentication = require("../middlewares/loginAuthentication");

router.get("/", authentication, ReviewController.getReviewUser);
router.get("/:OrderId", authentication, ReviewController.getReviewVehicle);
router.post("/:OrderId", authentication, ReviewController.postReview);

module.exports = router;
