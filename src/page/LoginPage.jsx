import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/loginpage.css"; // Import du fichier CSS

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      navigate("/admin/account");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/login", {
        // Grâce au proxy, "/api" va vers "http://localhost:5000/api"
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de la connexion");
      }

      setSuccess("Connexion réussie !");
      setIsLoggedIn(true);
      localStorage.setItem("token", data.token);
      // Rediriger vers la page admin/account après une connexion réussie
      navigate("/admin/account");
    } catch (err) {
      setError(err.message);
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Connexion</h2>
        {isLoggedIn ? (
          <img src="/path/to/logged-in-logo.png" alt="Logged In" />
        ) : (
          <img src="/path/to/logged-out-logo.png" alt="Logged Out" />
        )}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">
            Se connecter
          </button>
        </form>
        <p>
          Pas de compte ? <a href="/register">Inscrivez-vous</a>
        </p>
      </div>
    </div>
  );
}
