import "../styles/account.css";
import { useState, useEffect } from "react";

export default function Account() {
  const [result, setResult] = useState("");
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setToken(token);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!token) return;
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/check-admin",
          {
            method: "GET",
            headers: {
              Authorization: token,
            },
          }
        );
        const data = await response.json();
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    checkAdmin();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      if (!token || !isAdmin) return;
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/account",
          {
            method: "GET",
            headers: {
              Authorization: token,
            },
          }
        );
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [token, isAdmin]);

  return (
    <div>
      <h1>Account</h1>
      {isAdmin ? (
        <table>
          <thead>
            <tr className="table">
              <th>Email</th>
              <th>Password</th>
              <th>Two Factor</th>
              <th>Recovery code</th>
              <th>Date create</th>
              <th>Date update</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {result &&
              result.map((user) => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.twoFactorEnabled ? "Yes" : "No"}</td>
                  <td>{user.recoveryCode || "None"}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td>{new Date(user.updatedAt).toLocaleString()}</td>
                  <td>
                    <button className="delete">delete</button>
                    <button className="modif">modif</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p>You do not have admin access.</p>
      )}
    </div>
  );
}

async function getToken() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    email: "mathis.sauvage24750@gmail.com",
    password: "Banane24750@",
    token: "123456",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/login",
      requestOptions
    );
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}
