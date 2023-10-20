const router = require("express").Router();
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/loginAuthentication");

router.post("/register", UserController.register);
router.post("/otp", UserController.getOTP);
router.post("/login", UserController.login);
router.post("/google-login", UserController.gLogin);
router.get("/profiles", authentication, UserController.getProfile);
router.post("/profiles", authentication, UserController.createProfile);
router.delete("/user", authentication, UserController.deleteUser);
router.put("/profiles", authentication, UserController.editProfile);
router.post("/midtrans-token");

module.exports = router;