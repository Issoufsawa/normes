const db = require("../db");
const path = require("path");

// GET avec filtres
const getAllNormes = (req, res) => {
  const { categorie, source, date_pub } = req.query;
  let sql = "SELECT * FROM normes WHERE 1=1";
  const params = [];

  if (categorie) {
    sql += " AND categorie = ?";
    params.push(categorie);
  }
  if (source) {
    sql += " AND (source LIKE ? OR reference_du_texte LIKE ?)";
    const like = `%${source}%`;
    params.push(like, like);
  }
  if (date_pub) {
    sql += " AND date_pub = ?";
    params.push(date_pub);
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

// POST - Créer une norme
const createNorme = (req, res) => {
  const {
    domaine,
    categorie,
    description_du_texte,
    source,
    reference_du_texte,
    document_concerne,
    domaine_activite,
    date_pub,
    pays_ou_region,
  } = req.body;
  const fichier = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO normes (
      domaine, categorie, description_du_texte, source,
      reference_du_texte, document_concerne, domaine_activite,
      date_pub, pays_ou_region, fichier
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    domaine, categorie, description_du_texte, source,
    reference_du_texte, document_concerne, domaine_activite,
    date_pub, pays_ou_region, fichier,
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Norme créée avec succès", id: result.insertId });
  });
};

// PUT - Modifier une norme
const updateNorme = (req, res) => {
  const { id } = req.params;
  const {
    domaine, categorie, description_du_texte, source,
    reference_du_texte, document_concerne, domaine_activite,
    date_pub, pays_ou_region
  } = req.body;
  const fichier = req.file ? req.file.filename : null;

  let sql = `
    UPDATE normes SET
      domaine = ?, categorie = ?, description_du_texte = ?, source = ?,
      reference_du_texte = ?, document_concerne = ?, domaine_activite = ?,
      date_pub = ?, pays_ou_region = ?
  `;
  const values = [
    domaine, categorie, description_du_texte, source,
    reference_du_texte, document_concerne, domaine_activite,
    date_pub, pays_ou_region
  ];
  if (fichier) {
    sql += ", fichier = ?";
    values.push(fichier);
  }
  sql += " WHERE id = ?";
  values.push(id);

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Norme mise à jour avec succès" });
  });
};

// DELETE - Supprimer une norme
const deleteNorme = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM normes WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Norme supprimée" });
  });
};

// GET - Télécharger un fichier
const downloadFile = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "../uploads", filename);
  res.download(filePath, filename, (err) => {
    if (err) res.status(404).json({ error: "Fichier introuvable" });
  });
};



// POST - Créer une norme
const createadmin = (req, res) => {
  const {
    civilite,
    nom,
    prenoms,
    pays,
    type_utilisateur,
    fonction,
    whatsapp,
    email,
    
  } = req.body;
  

  const sql = `
    INSERT INTO admin (
      civilite, nom, prenoms, pays,
       type_utilisateur, fonction, whatsapp,
      email
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    civilite, nom, prenoms, pays,
     type_utilisateur, fonction, whatsapp,
    email, 
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "admin créée avec succès", id: result.insertId });
  });
};


module.exports = {
  getAllNormes,
  createNorme,
  updateNorme,
  deleteNorme,
  downloadFile,
  createadmin
};
