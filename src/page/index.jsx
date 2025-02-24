import "../styles/index.css"
import { useState } from "react";

export default function Index() {
  return (
    <header>
      <h1>
        LoginPage
      </h1>
      <div className="buttons">
        <button onClick={() => window.location.href='/login'}>Login</button>
        <button onClick={() => window.location.href='/register'}>Register</button>
      </div> 
    </header>
  )
}