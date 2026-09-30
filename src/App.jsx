import { Outlet } from "react-router-dom";
// import Globe from "./Globe/Globe";
import LoginPanel from "./LoginPanel/LoginPanel";
import "./App.css";

export function LoginPage() {
  return (
    <main className="login-page">

        <LoginPanel />
      
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


