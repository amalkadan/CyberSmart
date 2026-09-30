import { useNavigate } from "react-router-dom";
import UnoCyberApp from "../../../UNO-Cyber/UnoCyberApp.jsx";

export default function UnoSyberGame({ returnPath = "/teacher/activities" }) {
  const navigate = useNavigate();

  return <UnoCyberApp onExit={() => navigate(returnPath)} />;
}
