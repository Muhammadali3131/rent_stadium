const {
  createImage,
  getAllImages,
  deleteImageById,
  updateImageById,
  getImageById,
} = require("../controllers/images.controller");

const router = require("express").Router();

router.post("/create", createImage);
router.get("/all", getAllImages);
router.get("/:id", getImageById);
router.put("/:id", updateImageById);
router.delete("/:id", deleteImageById);

module.exports = router;
