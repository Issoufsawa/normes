const express = require("express");
const router = express.Router();
const {
  getAllNormes,
  createNorme,
  updateNorme,
  deleteNorme,
} = require("../controllers/normesController");
const verifyToken = require("../middleware/auth");

router.get("/", getAllNormes);
router.post("/", createNorme);
router.put("/:id", updateNorme);
router.delete("/:id", deleteNorme);

router.post("/", verifyToken, createNorme);
router.put("/:id", verifyToken, updateNorme);
router.delete("/:id", verifyToken, deleteNorme);

module.exports = router;
