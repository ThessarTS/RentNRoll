const router = require("express").Router();
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/loginAuthentication");

router.get("/", authentication, UserController.getProfile);
router.post("/", authentication, UserController.createProfile);
router.delete("/", authentication, UserController.deleteUser);
router.put("/", authentication, UserController.editProfile);



module.exports = router;