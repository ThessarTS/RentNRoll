const router = require("express").Router();

const ReviewController = require("../controllers/reviewController");
const authentication = require("../middlewares/loginAuthentication");

router.get("/", authentication, ReviewController.getReviewUser);
router.get("/:VehicleId", authentication, ReviewController.getReviewVehicle);
router.post("/:VehicleId", authentication, ReviewController.postReview);

module.exports = router;
