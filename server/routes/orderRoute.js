const router = require("express").Router();

const OrderController = require("../controllers/orderController");
const authentication = require("../middlewares/loginAuthentication");

router.get("/", authentication, OrderController.findAllOrder);
router.get("/:id", authentication, OrderController.findOrderById);
router.post("/:VehicleId", authentication, OrderController.createOrder);
router.patch("/:id", authentication, OrderController.updateOrderStatus);
router.get("/vehicle/:vehicleid", authentication, OrderController.findAllOrderByVehicle);

module.exports = router;
