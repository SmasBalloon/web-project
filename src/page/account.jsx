import "../styles/account.css";
import { useEffect, useState } from "react";

export default function Account() {
  const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");  // Récupérer le token
                const response = await fetch("http://localhost:5000/api/admin/users", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,  // Envoyer le token JWT
                    },
                });

                if (!response.ok) {
                    throw new Error("Accès interdit");
                }

                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError("Vous n'êtes pas autorisé à voir cette page.");
                console.error(error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Liste des Utilisateurs</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.email} {user.isAdmin ? "(Admin)" : "(Utilisateur)"}
                    </li>
                ))}
            </ul>
        </div>
    );
}
