const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const loginAdmin = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM admins WHERE email = ?";
  db.query(sql, [email], async (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(401).json({ message: "Admin non trouve" });

    const admin = result[0];
    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid)
      return res.status(401).json({ message: "mot de passe incorrect" });

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ message: "Connexion reussie", token });
  });
};

module.exports = { loginAdmin };
