import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NormesPubliques from "./pages/NormesPubliques";
import AjouterNorme from "./pages/AjouterNorme";
import CreAdmin from  "./pages/CreAdmin";
import ValiderNorme from  "./pages/ValiderNorme";
import ListeAdmin from  "./pages/ListeAdmin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NormesPubliques />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={ <ProtectedRoute> <AdminDashboard /></ProtectedRoute> } />
      <Route path="*" element={<LoginPage />} />
      <Route path="/ajouter-norme" element={<ProtectedRoute><AjouterNorme /></ProtectedRoute>} />
      <Route path="/créer-admin" element={<ProtectedRoute><CreAdmin/></ProtectedRoute>} />
      <Route path="/valider-norme" element={<ProtectedRoute><ValiderNorme/></ProtectedRoute>} />
      <Route path="/Liste-admin" element={<ProtectedRoute><ListeAdmin/></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
