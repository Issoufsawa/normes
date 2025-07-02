const express = require("express");
const router = express.Router();
const { createadmin } = require("../controllers/normesController");

router.post("/utilisateurs", createadmin);

module.exports = router;
