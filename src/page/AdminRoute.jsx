// src/components/protected/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../utils/authUtils"; // Corriger le chemin d'importation

const AdminRoute = ({ children }) => {
  const user = getUserFromToken();

  // Si l'utilisateur n'est pas admin, redirige vers /login
  return user?.isAdmin ? children : <Navigate to="/login" />;
};

export default AdminRoute;
