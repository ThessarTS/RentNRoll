const router = require("express").Router();

const VehicleController = require("../controllers/vehicleController");



router.get("/", VehicleController.fetchVehicle);
router.get("/:id/", VehicleController.detailVehicle);
router.post('/')
router.put('/:id')
router.delete('/:id')


router.post("/", VehicleController.addVehicle);
router.put("/:id", VehicleController.editVehicle);
// router.patch("/:id");
router.delete("/:id", VehicleController.removeVehicle);


module.exports = router;
