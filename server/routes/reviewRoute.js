const router = require("express").Router();

const ReviewController = require("../controllers/reviewController");

router.get("/");
router.post("/:orderId");

module.exports = router;
