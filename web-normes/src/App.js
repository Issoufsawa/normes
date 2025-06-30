import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NormesPubliques from "./pages/NormesPubliques";
import AjouterNorme from "./pages/AjouterNorme";


function App() {
  return (
    <Routes>
      <Route path="/" element={<NormesPubliques />} />

      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<LoginPage />} />
              <Route path="/ajouter-norme" element={
                <ProtectedRoute><AjouterNorme /></ProtectedRoute>} />
                 <Route path="/créer-admin" element={
                <ProtectedRoute><AjouterNorme /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
