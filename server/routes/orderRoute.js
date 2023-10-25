const router = require("express").Router();

const OrderController = require("../controllers/orderController");
const authentication = require("../middlewares/loginAuthentication");

router.get("/", authentication, OrderController.findAllOrder);
router.post("/update-status", OrderController.updateOrderStatus);
router.get("/owner", authentication, OrderController.findAllOrderByOwner);
router.get("/:id", authentication, OrderController.findOrderById);
router.post("/:VehicleId", authentication, OrderController.createOrder);
router.patch("/:id", OrderController.updateOrderStatus);
router.get("/vehicle/:vehicleid", OrderController.findAllOrderByVehicle);

module.exports = router;
