import { Outlet } from "react-router-dom";
import Globe from "./Globe/Globe";
import LoginPanel from "./LoginPanel/LoginPanel";
import "./App.css";

export function LoginPage() {
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
    <div className="app-container">
      <Outlet />
    </div>
  );
}

export default App;