const router = require("express").Router();

const usersRouter = require("./users.routes");
const stadiumRouter = require("./stadium.routes");
const bookingRouter = require("./booking.routes");
const paymentRouter = require("./payment.routes");
const reviewRouter = require("./review.routes");
const imagesRouter = require("./images.routes");

router.use("/users", usersRouter)
router.use("/stadium", stadiumRouter);
router.use("/booking", bookingRouter);
router.use("/payment", paymentRouter);
router.use("/review", reviewRouter);
router.use("/images", imagesRouter);

module.exports = router;
