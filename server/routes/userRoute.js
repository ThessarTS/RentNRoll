const router = require("express").Router();
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/loginAuthentication");
const uploadMulti = require("../middlewares/uploadImage");

router.get("/", authentication, UserController.getProfile);
router.post("/", authentication, uploadMulti(["profilePicture", "ktp", "simA", "simC"]), UserController.createProfile);
router.delete("/", authentication, UserController.deleteUser);
router.put("/", authentication, uploadMulti(["profilePicture", "ktp", "simA", "simC"]), UserController.editProfile);

module.exports = router;
