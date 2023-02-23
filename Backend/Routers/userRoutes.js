const express = require("express");
const {
  getUsers,
  deleteUser,
  updateUser,
} = require("../Controllers/userControllers");
const router = express.Router();
// router.route("/").post(addUser);
router.route("/:id").get(getUsers);
router.route("/").get(getUsers);
router.route("/:id").delete(deleteUser);
router.route("/:id").patch(updateUser);
module.exports = router;
