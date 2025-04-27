const {
  createStadium,
  getAllStadiums,
  deleteStadiumById,
  updateStadiumById,
  getStadiumById,
} = require("../controllers/stadium.controller");

const router = require("express").Router();

router.post("/create", createStadium);
router.get("/all", getAllStadiums);
router.get("/:id", getStadiumById);
router.put("/:id", updateStadiumById);
router.delete("/:id", deleteStadiumById);

module.exports = router;
