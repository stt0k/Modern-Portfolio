import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import NotFound from "./pages/NotFound";
import "./index.css";

const rootElement = document.getElementById("root");

if (window.location.pathname === "/404.html") {
  createRoot(rootElement!).render(<NotFound />);
} else {
  createRoot(rootElement!).render(<App />);
}
