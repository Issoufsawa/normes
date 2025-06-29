const db = require("../db");

// GET avec filtres
const getAllNormes = (req, res) => {
  const { categorie, mots_cles, date_pub } = req.query;
  let sql = "SELECT * FROM normes WHERE 1=1";
  let params = [];

  if (categorie) {
    sql += " AND categorie = ?";
    params.push(categorie);
  }

  if (mots_cles) {
    sql += " AND (titre LIKE ? OR description LIKE ? OR mots_cles LIKE ?)";
    const like = `%${mots_cles}%`;
    params.push(like, like, like);
  }

  if (date_pub) {
    sql += " AND date_pub = ?";
    params.push(date_pub);
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

// POST - Créer une norme
const createNorme = (req, res) => {
  const { titre, categorie, description, date_pub, mots_cles } = req.body;
  const sql =
    "INSERT INTO normes (titre, categorie, description, date_pub, mots_cles) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [titre, categorie, description, date_pub, mots_cles],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res
        .status(201)
        .json({ message: "Norme créée avec succès", id: result.insertId });
    }
  );
};

// PUT - Modifier une norme
const updateNorme = (req, res) => {
  const { id } = req.params;
  const { titre, categorie, description, date_pub, mots_cles } = req.body;
  const sql =
    "UPDATE normes SET titre = ?, categorie = ?, description = ?, date_pub = ?, mots_cles = ? WHERE id = ?";
  db.query(
    sql,
    [titre, categorie, description, date_pub, mots_cles, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Norme mise à jour" });
    }
  );
};

// DELETE - Supprimer une norme
const deleteNorme = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM normes WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Norme supprimée" });
  });
};

module.exports = {
  getAllNormes,
  createNorme,
  updateNorme,
  deleteNorme,
};
