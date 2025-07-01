import { useEffect, useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [normes, setNormes] = useState([]);
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
    // Redirection vers une page ou ouverture d’un modal pourrait se faire ici
    console.log("Norme à modifier :", norme);
    alert("Fonction de modification à venir !");
  };

  const filteredNormes = normes.filter(
  (n) =>
    n.titre?.toLowerCase().includes(search.toLowerCase()) ||
    n.categorie?.toLowerCase().includes(search.toLowerCase()) ||
    n.mots_cles?.toLowerCase().includes(search.toLowerCase()) ||
    n.date_pub?.includes(search)
);

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand">
            <i className="bi-back"></i>
            <span>Admin Normes</span>
          </a>

        <ul className="navbar-nav d-flex flex-row gap-3 ms-4">
  {[
    { text: "Ajouter une nouvelle norme", to: "/ajouter-norme" },
    { text: "Créer un admin", to:  "/créer-admin" },
    { text: "Liste des normes archivistiques", to: "/admin" },
    { text: "Valider des normes archivistiques", to: "#" },
  ].map(({ text, to }) => (
    <li key={text} className="nav-item">
      <Link className="nav-link text-dark" to={to}>
        {text}
      </Link>
    </li>
  ))}
</ul>

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
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="userDropdown"
              >
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

                  <th>Description du texte</th>
                  <th>Référence du texte</th>
                  <th>Documents concernés</th>
                  <th>Domaines</th>
                  <th>Type de texte</th>
                  <th>Domaine d'activité</th>
                  <th>Pays ou Région</th>
                  <th>Source</th>
                  <th>Fichier</th>
                  <th>Validité du texte</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNormes.map((n) => (
                  <tr key={n.id}>
                    <td>{n.description_du_texte}</td>
                    <td>{n.reference_du_texte}</td>
                    <td>{n.document_concerne}</td>
                    <td>{n.domaine}</td>
                    <td>{n.categorie}</td>
                    <td>{n.domaine_activite}</td>
                    <td>{n.pays_ou_region}</td>
                    <td>{n.source}</td>
                    <td>{n.fichier}</td>
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
