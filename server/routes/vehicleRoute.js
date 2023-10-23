const router = require("express").Router();

const VehicleController = require("../controllers/vehicleController");
const authentication = require("../middlewares/loginAuthentication");
const uploadMulti = require("../middlewares/uploadImage");

router.get("/", VehicleController.fetchVehicle);
router.get("/:id/", VehicleController.detailVehicle);
router.post("/", authentication, uploadMulti(["image"]), VehicleController.addVehicle);
// router.put("/:id",authentication, VehicleController.editVehicle);
router.delete("/:id", authentication, VehicleController.removeVehicle);

module.exports = router;
