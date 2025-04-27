const {
  createBooking,
  getAllBookings,
  deleteBookingById,
  updateBookingById,
  getBookingById,
} = require("../controllers/booking.controller");

const router = require("express").Router();

router.post("/create", createBooking);
router.get("/all", getAllBookings);
router.get("/:id", getBookingById);
router.put("/:id", updateBookingById);
router.delete("/:id", deleteBookingById);

module.exports = router;
