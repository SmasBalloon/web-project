// src/utils/authUtils.js
export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Décoder le token JWT
      return payload;  // Contient { _id, isAdmin }
  } catch (error) {
      console.error("Erreur lors du décodage du token :", error);
      return null;
  }
};
