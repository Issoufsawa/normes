import { useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";

export default function AjouterNorme() {
  const [form, setForm] = useState({
    titre: "",
    categorie: "",
    description: "",
    date_pub: "",
    mots_cles: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/normes", form);
      alert("Norme ajoutée avec succès !");
      setForm({
        titre: "",
        categorie: "",
        description: "",
        date_pub: "",
        mots_cles: "",
      });
    } catch (err) {
      console.error("Erreur lors de l’ajout :", err);
      alert("Erreur lors de l’ajout de la norme");
    }
  };

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
    { text: "Créer un admin", to: "#" },
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

            <h2 className="text-center mb-5">➕ Créer une nouvelle norme</h2>
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
                <select
                  className="form-control"
                  name="categorie"
                  value={form.categorie}
                  onChange={handleChange}
                  required
                >
                  <option value="">Type de texte</option>
                  <option value="code">code</option>
                  <option value="lois">lois</option>
                  <option value="règlement">règlement</option>
                  <option value="circulaire">circulaire</option>
                  <option value="ordonance">ordonnance</option>
                  <option value="décret">décret</option>
                  <option value="arrêté">arrêté</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div className="col-12">
                <textarea
                  className="form-control"
                  name="description"
                  placeholder="Description du texte"
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
                <label htmlFor="date_pub" className="form-label">
                  Validité du texte
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="date_pub"
                  value={form.date_pub}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 d-flex gap-2">
                <button className="btn btn-primary" type="submit">
                  Ajouter
                </button>
              </div>
            </form>
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
