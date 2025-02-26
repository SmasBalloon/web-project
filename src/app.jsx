import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import Token from "./page/token"
import Index from "./page/index"
import Account from "./page/account"
import AdminRoute from "./page/AdminRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/token" element={<Token />} />
        <Route path="/admin/account" element={< Account/>} />
        <Route path="/admin/account" element={
              <AdminRoute>
                  <Account/>
              </AdminRoute>
          }/>
      </Routes>
    </Router>
  );
}

export default App;
