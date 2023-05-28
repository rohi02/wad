const express = require("express");
const {
  Createuser,
  Updateuser,
  getAllusers,
  getOneuser,
  Deleteuser,
} = require("../controller/userController");

const router = express.Router();

router.route("/create").post(Createuser);
router.route("/update/:id").patch(Updateuser);
router.route("/getall").get(getAllusers);
router.route("/user/:id").get(getOneuser);
router.route("/delete/:id").delete(Deleteuser);
module.exports = router;
