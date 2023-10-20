const router = require("express").Router();

const VehicleController = require("../controllers/vehicleController");
const authentication = require("../middlewares/loginAuthentication");

router.get("/", VehicleController.fetchVehicle);
router.get("/:id/", VehicleController.detailVehicle);
router.post("/", authentication, VehicleController.addVehicle);
// router.put("/:id",authentication, VehicleController.editVehicle);
router.delete("/:id", authentication, VehicleController.removeVehicle);

module.exports = router;
