const router = require("express").Router();
const user = require("./userRoute");
const vehicle = require("./vehicleRoute");
const order = require("./orderRoute");
const review = require("./reviewRoute");
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/loginAuthentication");
const VehicleController = require("../controllers/vehicleController");
const OrderController = require("../controllers/orderController");

router.post("/register", UserController.register);
router.post("/otp", UserController.getOTP);
router.post("/login", UserController.login);
router.post("/google-login", UserController.gLogin);
router.get("/trending", OrderController.fetchTrending);
router.get("/categories", VehicleController.getCategories);
router.post("/midtrans-token/:orderId", authentication);

router.use("/profiles", user);
router.use("/vehicles", vehicle);
router.use("/orders", order);
router.use("/reviews", review);

module.exports = router;
