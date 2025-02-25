import "../styles/admin.css";
import { useState, useEffect } from "react";
export default function Token() {
  const [result, setResult] = useState("");
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "email": "mathis.sauvage24750@gmail.com",
    "password": "Banane24750@",
    "token": "123456"
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://backend-ye4v.onrender.com/api/auth/login", requestOptions)
    .then((response) => response.json())
    .then((data) => setResult(data.token))
    .catch((error) => console.log("error", error));
  ;

  return (
    <div className="body">
      <h1>Token</h1>
      <p>Votre token :</p>
      <p>{result}</p>
    </div>
  );

}
