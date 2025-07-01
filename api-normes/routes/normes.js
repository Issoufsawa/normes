const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getAllNormes,
  createNorme,
  updateNorme,
  deleteNorme,
  downloadFile,
} = require("../controllers/normesController");

const verifyToken = require("../middleware/auth");

// Config multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// 📥 GET avec filtres
router.get("/", verifyToken, getAllNormes);

// ➕ POST : Ajouter une norme avec un fichier
router.post("/", verifyToken, upload.single("fichier"), createNorme);

// 🔁 PUT : Modifier une norme (avec ou sans fichier)
router.put("/:id", verifyToken, upload.single("fichier"), updateNorme);

// ❌ DELETE : Supprimer une norme
router.delete("/:id", verifyToken, deleteNorme);

// 📎 GET : Télécharger un fichier
router.get("/download/:filename", verifyToken, downloadFile);

module.exports = router;
