const router = require("express").Router();

const OrderController = require("../controllers/orderController");
const authentication = require("../middlewares/loginAuthentication");

router.get("/", authentication, OrderController.findAllOrder);
router.get("/:id", OrderController.findOrderById);
router.post("/:VehicleId", authentication, OrderController.createOrder);
router.patch("/:id", authentication, OrderController.updateOrderStatus);
router.get("/vehicle/:vehicleid", OrderController.findAllOrderByVehicle);

module.exports = router;
