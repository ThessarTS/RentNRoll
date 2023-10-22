const router = require("express").Router();
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/loginAuthentication");
const uploadImage = require("../middlewares/uploadImage");

router.get("/", authentication, UserController.getProfile);
router.post("/", authentication, uploadImage, UserController.createProfile);
router.delete("/", authentication, UserController.deleteUser);
router.put("/", authentication, UserController.editProfile);

module.exports = router;
