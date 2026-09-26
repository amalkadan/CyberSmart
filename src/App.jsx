import { BrowserRouter, Routes, Route } from "react-router-dom";

import Globe from "./Globe/Globe";
import LoginPanel from "./LoginPanel/LoginPanel";
import StudentDashboard from "./StudentPanel/StudentDashboard";

import "./App.css";

function LoginPage() {
  return (
    <main className="login-page">
      <section className="globe-side">
        <Globe />
      </section>

      <section className="login-side">
        <LoginPanel />
      </section>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/student" element={<StudentDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
