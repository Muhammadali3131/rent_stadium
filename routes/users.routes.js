const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByRole,
  // getUserBySearch,
  getUserByOwner,
  callProcedureUsers,
  getfielsdwithBookingTime,
  getFieldOwner,
} = require("../controllers/users.controller");

const router = require("express").Router();

router.post("/create", createUser);
router.get("/all", getAllUsers);
router.get("/role", getUserByRole);
router.get("/owner", getUserByOwner);
router.get("/call", callProcedureUsers);
router.get("/time", getfielsdwithBookingTime);
router.get("/fieldowner", getFieldOwner);
// router.get("/search", getUserBySearch);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
