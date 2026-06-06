const express = require("express");
const {
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controller/order.controller");

const router = express.Router();

router.post("/create", createOrder);
router.post("/update", updateOrder);
router.delete("/delete/:id", deleteOrder);

module.exports = router;
