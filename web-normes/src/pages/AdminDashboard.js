import { useEffect, useState } from "react";
import api from "../utils/api";

export default function AdminDashboard() {
  const [normes, setNormes] = useState([]);
  const [form, setForm] = useState({
    titre: "",
    categorie: "",
    description: "",
    date_pub: "",
    mots_cles: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchNormes();
  }, []);

  const fetchNormes = async () => {
    try {
      const res = await api.get("/normes");
      setNormes(res.data);
    } catch (err) {
      console.error("Erreur de chargement :", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/normes/${editingId}`, form);
        setEditingId(null);
      } else {
        await api.post("/normes", form);
      }
      setForm({
        titre: "",
        categorie: "",
        description: "",
        date_pub: "",
        mots_cles: "",
      });
      fetchNormes();
    } catch (err) {
      console.error("Erreur lors de l’enregistrement :", err);
      alert("Erreur lors de l’enregistrement");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette norme ?")) return;
    try {
      await api.delete(`/normes/${id}`);
      fetchNormes();
    } catch (err) {
      console.error("Erreur suppression :", err);
      alert("Échec de suppression");
    }
  };

  const handleEdit = (norme) => {
    setEditingId(norme.id);
    setForm({
      titre: norme.titre,
      categorie: norme.categorie,
      description: norme.description || "",
      date_pub: norme.date_pub,
      mots_cles: norme.mots_cles,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredNormes = normes.filter(
    (n) =>
      n.titre.toLowerCase().includes(search.toLowerCase()) ||
      n.categorie.toLowerCase().includes(search.toLowerCase()) ||
      n.mots_cles.toLowerCase().includes(search.toLowerCase()) ||
      n.date_pub.includes(search)
  );

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg">
  <div className="container">
    <a className="navbar-brand" href="/">
      <i className="bi-back"></i>
      <span>Admin Normes</span>
    </a>

    <div className="ms-auto">
      <div className="dropdown">
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          id="userDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi-person-circle me-2"></i>Compte
        </button>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
          <li>
            <button
              className="dropdown-item text-danger"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
            >
              🔒 Déconnexion
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>

{/* FORMULAIRE */}
 <h2 className="text-center mb-5">
      {editingId ? "✏️ Modifier une norme" : "➕ Créer une nouvelle norme"}
    </h2>

<section className="featured-section bg-light py-5">
  <div className="container">
   
    <div className="mx-auto" style={{ maxWidth: "700px" }}>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="titre"
            placeholder="Domaine"
            value={form.titre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="categorie"
            placeholder="Type de text"
            value={form.categorie}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <textarea
            className="form-control"
            name="description"
            placeholder="Description du text"
            rows="2"
            value={form.description}
            onChange={handleChange}
          ></textarea>
        </div>
       
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="mots_cles"
            placeholder="Source"
            value={form.mots_cles}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="titre"
            placeholder="Domaines d'activité"
            value={form.titre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="categorie"
            placeholder="Documents concernés"
            value={form.categorie}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="titre"
            placeholder="Réference du text"
            value={form.titre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="titre"
            placeholder="Pays ou région"
            value={form.titre}
            onChange={handleChange}
            required
          />
        </div>
         <div className="col-md-6">
            <label htmlFor="date_pub" className="form-label">Validité du text</label>
          <input
            type="date"
            className="form-control"
            name="date_pub"
            value={form.date_pub}
            onChange={handleChange}
            required
          />
        </div>
    
      <div className="col-md-6">
          <label htmlFor="categorie" className="form-label">Joindre un fichier</label>
         <input
           type="file"
           className="form-control"
           name="categorie"
           id="categorie"
           onChange={handleChange}
            required
         />
</div>


        <div className="col-12 d-flex gap-2">
          <button className="btn btn-primary" type="submit">
            {editingId ? "Mettre à jour" : "Ajouter"}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setEditingId(null);
                setForm({
                  titre: "",
                  categorie: "",
                  description: "",
                  date_pub: "",
                  mots_cles: "",
                });
              }}
            >
              Annuler
            </button>
          )}
        </div>
      </form>
    </div>
  </div>
</section>

      {/* TABLEAU */}
      <section className="featured-section">
        <div className="container">
          <h2 className="mb-4">📋 Liste des normes archivistiques</h2>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="🔍 Rechercher par titre, catégorie, mots-clés ou date"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="table-responsive">
            <table className="table table-bordered table-hover table-striped">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Description du text</th>
                  <th>Référence du text</th>
                  <th>Documents concernés</th>
                  <th>Domaines</th>
                  <th>Type de text</th>
                  <th>Domaine d'activité</th>
                  <th>Pays ou Région</th>
                  <th>Source</th>
                  <th>Fichier</th>
                  <th>Validité du text</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNormes.map((n) => (
                  <tr key={n.id}>
                    <td>{n.id}</td>
                    <td>{n.titre}</td>
                    <td>{n.categorie}</td>
                    <td>{}</td>
                    <td>{}</td>
                    <td>{}</td>
                    <td>{}</td>
                    <td>{}</td>
                    <td>{n.mots_cles}</td>
                    <td>{}</td>
                    <td>{n.date_pub}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(n)}
                      >
                        ✏️ Modifier
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(n.id)}
                      >
                        🗑️ Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12 mb-4 pb-2">
              <a className="navbar-brand" href="/">
                <i className="bi-back"></i>
                <span>Topic</span>
              </a>
            </div>
            <div className="col-lg-6 col-12">
              <p className="text-white">
                &copy; {new Date().getFullYear()} Admin Dashboard | Normes Archivistiques
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}


