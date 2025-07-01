import { useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";

export default function CreAdmin() {
  const [form, setForm] = useState({
    civilite: "",
    nom: "",
    prenoms: "",
    pays: "",
    type_utilisateur: "",
    fonction: "",
    whatsapp: "",
    email: "",
    login: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/utilisateurs", form);
      alert("✅ Administrateur créé avec succès !");
      setForm({
        civilite: "",
        nom: "",
        prenoms: "",
        pays: "",
        type_utilisateur: "",
        fonction: "",
        whatsapp: "",
        email: "",
        login: "",
        password: "",
      });
    } catch (err) {
      console.error("❌ Erreur lors de la création :", err);
      alert("Erreur lors de la création de l'administrateur");
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

      
    <div className="featured-section"><h2 className="text-center">👤 Créer un administrateur</h2></div>
      <section className="featured-section bg py-5">
        <div className="container">
          <div className="mx-auto" style={{ maxWidth: "700px" }}>
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <select
                  className="form-control"
                  name="civilite"
                  value={form.civilite}
                  onChange={handleChange}
                  required
                >
                  <option value="">Civilité</option>
                  <option value="M.">M.</option>
                  <option value="Mme">Mme</option>
                  <option value="Mlle">Mlle</option>
                </select>
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="nom"
                  placeholder="Nom"
                  value={form.nom}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="prenoms"
                  placeholder="Prénoms"
                  value={form.prenoms}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <select
                  className="form-control"
                  name="pays"
                  value={form.pays}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pays</option>
                  <option value="CAMEROUN">CAMEROUN</option>
                  <option value="COTE D'IVOIRE">COTE D'IVOIRE</option>
                  <option value="BENIN">BENIN</option>
                  <option value="GABON">GABON</option>
                </select>
              </div>

              <div className="col-md-6">
                <select
                  className="form-control"
                  name="type_utilisateur"
                  value={form.type_utilisateur}
                  onChange={handleChange}
                  required
                >
                  <option value="">Type d'utilisateur</option>
                  <option value="Utilisateur inscrit">Utilisateur inscrit</option>
                  <option value="Administrateur pays">Administrateur pays</option>
                  <option value="Super Administrateur">Super Administrateur</option>
                </select>
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="fonction"
                  placeholder="Fonction"
                  value={form.fonction}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  type="tel"
                  className="form-control"
                  name="whatsapp"
                  placeholder="Numéro WhatsApp"
                  value={form.whatsapp}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="login"
                  placeholder="Login"
                  value={form.login}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Mot de passe"
                  value={form.password}
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
