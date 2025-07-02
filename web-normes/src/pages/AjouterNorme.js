import { useState, useRef } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";

export default function AjouterNorme() {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    domaine: "",
    categorie: "",
    description_du_texte: "",
    source: "",
    reference_du_texte: "",
    document_concerne: "",
    domaine_activite: "",
    date_pub: "",
    pays_ou_region: "",
    fichier: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "fichier") {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Vous devez être connecté pour ajouter une norme !");
      return;
    }

    const formData = new FormData();
    formData.append("domaine", form.domaine);
    formData.append("categorie", form.categorie);
    formData.append("description_du_texte", form.description_du_texte);
    formData.append("source", form.source);
    formData.append("reference_du_texte", form.reference_du_texte);
    formData.append("document_concerne", form.document_concerne);
    formData.append("domaine_activite", form.domaine_activite);
    formData.append("date_pub", form.date_pub);
    formData.append("pays_ou_region", form.pays_ou_region);
    formData.append("fichier", form.fichier);

    try {
      await api.post("/normes", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Ne pas fixer 'Content-Type', Axios gère ça automatiquement
        },
      });
      

      alert("✅ Norme ajoutée avec succès !");
      setForm({
        domaine: "",
        categorie: "",
        description_du_texte: "",
        source: "",
        reference_du_texte: "",
        document_concerne: "",
        domaine_activite: "",
        date_pub: "",
        pays_ou_region: "",
        fichier: null,
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("❌ Erreur lors de l’ajout :", err);
      alert("❌ Erreur lors de l’ajout de la norme.");
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg">
        <div className="container">
         <a className="navbar-brand" >
              <img 
              src="logo.jpeg" 
                alt="Logo Topic" 
                style={{ height: '90px', width: 'auto' }} 
               />
          
             </a>

          <ul className="navbar-nav d-flex flex-row gap-3 ms-4">
            {[
              { text: "Ajouter une nouvelle norme", to: "/ajouter-norme" },
              { text: "Créer un admin", to: "/créer-admin" },
               { text: "Liste des admins", to: "/Liste-admin" },
              { text: "Liste des normes archivistiques", to: "/admin" },
              { text: "Valider des normes archivistiques", to: "/valider-norme" },
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

       <div className="featured-section"><h2 className="text-center">➕ Créer une nouvelle norme</h2></div>
       
      <section className="featured-section  py-5">
       
        <div className="container ">
          <div className="mx-auto" style={{ maxWidth: "700px" }}>
            
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="domaine"
                  placeholder="Domaine"
                  value={form.domaine}
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
                  <option value="ordonnance">ordonnance</option>
                  <option value="décret">décret</option>
                  <option value="arrêté">arrêté</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div className="col-12">
                <textarea
                  className="form-control"
                  name="description_du_texte"
                  placeholder="Description du texte"
                  rows="2"
                  value={form.description_du_texte}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="source"
                  placeholder="Source"
                  value={form.source}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="reference_du_texte"
                  placeholder="Référence du texte"
                  value={form.reference_du_texte}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="document_concerne"
                  placeholder="Document concernés"
                  value={form.document_concerne}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="domaine_activite"
                  placeholder="Domaine d'activité"
                  value={form.domaine_activite}
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

              <div className="col-md-6 col-12">
                <select
                  className="form-control"
                  name="pays_ou_region"
                  value={form.pays_ou_region}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pays ou Région</option>
                  <option value="COTE D'IVOIRE">COTE D'IVOIRE</option>
                  <option value="CAMEROUN">CAMEROUN</option>
                  <option value="BENIN">BENIN</option>
                  <option value="GABON">GABON</option>
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="fichier" className="form-label">
                  Joindre un fichier
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="fichier"
                  id="fichier"
                  onChange={handleChange}
                  required
                  ref={fileInputRef}
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

      
      {/* Footer */}
      <footer className="site-footer section-padding bg-light py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-3 mb-4">
               <a className="navbar-brand" href="/">
              <img 
              src="logo.jpeg" 
                alt="Logo Topic" 
                style={{ height: '130px', width: 'auto' }} 
               />
          
             </a>
            </div>
            <div className="col-md-3 col-6">
              <h6>Resources</h6>
              <ul className="list-unstyled">
                {['Home','How it works','FAQs','Contact'].map(t => (
                  <li key={t}><a href="#">{t}</a></li>
                ))}
              </ul>
            </div>
            <div className="col-md-3 col-6">
              <h6>Information</h6>
              <p><a href="tel:3052409671">305‑240‑9671</a></p>
              <p><a href="mailto:info@company.com">info@company.com</a></p>
            </div>
            <div className="col-md-3">
              <h6>Language</h6>
              <select className="form-select">
                <option>English</option>
                <option>Thai</option>
                <option>Myanmar</option>
                <option>Arabic</option>
              </select>
              <p className="mt-3 small">&copy; 2048 Topic Listing Center.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
