const router = require("express").Router();
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/loginAuthentication");


router.get("/profiles", authentication, UserController.getProfile);
router.post("/profiles", authentication, UserController.createProfile);
router.delete("/profiles", authentication, UserController.deleteUser);
router.put("/profiles", authentication, UserController.editProfile);


module.exports = router;