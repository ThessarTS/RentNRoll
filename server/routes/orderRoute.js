const router = require("express").Router();

const OrderController = require("../controllers/orderController");
const authentication = require("../middlewares/loginAuthentication");

router.get("/", authentication, OrderController.findAllOrder);
router.get("/:id", authentication, OrderController.findOrderById);
router.post("/", authentication, OrderController.createOrder);
router.patch("/:id", authentication, OrderController.updateOrderStatus);
router.delete("/:id");
router.get("/vehicle/:vehicleid");

module.exports = router;
