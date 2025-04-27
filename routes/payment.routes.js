const {
  createPayment,
  getAllPayments,
  deletePaymentById,
  updatePaymentById,
  getPaymentById,
} = require("../controllers/payment.controller");

const router = require("express").Router();

router.post("/create", createPayment);
router.get("/all", getAllPayments);
router.get("/:id", getPaymentById);
router.put("/:id", updatePaymentById);
router.delete("/:id", deletePaymentById);

module.exports = router;
