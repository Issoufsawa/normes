import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/admin/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (err) {
      console.error(err);
      alert("Erreur : " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      

      {/* Hero section avec formulaire */}
      <section className="hero-section d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12 mx-auto">
              <div className="bg-white p-5 shadow rounded">
                <h2 className="text-center mb-4">Connexion Admin</h2>
                <form onSubmit={handleLogin} className="custom-form">
                  <div className="form-group mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Adresse e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
               <div className="d-flex justify-content-center">
                   <button type="submit" className="btn btn-primary text-nowrap">
                            Se connecter
                       </button>
                          </div>


                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

   
    </>
  );
}
