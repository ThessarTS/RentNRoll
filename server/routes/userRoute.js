const router = require("express").Router();

const UserController = require("../controllers/userController");

router.post("/register", UserController.register);
router.patch("/userOTP", UserController.getOTP);
router.post("/login", UserController.login);
router.post("/google-login", UserController.gLogin);
router.get("/user", UserController.getUser);
router.delete("/user", UserController.deleteUser);
router.post("/profiles", UserController.createProfile);
router.put("/profiles", UserController.editProfile);
router.post("/midtrans-token");

module.exports = router;
