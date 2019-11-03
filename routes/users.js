const express = require("express"),
  router = express.Router(),
  user = require("../controllers/users"),
  auth = require("../middleware/auth");

router.post("/", user.signIn);
router.get("/:userId", auth.isAuthorized, auth.isAuthenticated, user.getUser);

module.exports = router;
