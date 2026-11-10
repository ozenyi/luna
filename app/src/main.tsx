import "@fontsource/fraunces/latin-400-italic.css";
import "@fontsource/fraunces/latin-400.css";
import "@fontsource/fraunces/latin-600.css";
import "@fontsource/outfit/latin-400.css";
import "@fontsource/outfit/latin-500.css";
import "@fontsource/outfit/latin-600.css";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { store } from "./store/demoStore";
import "./styles/global.css";

const root = document.getElementById("root");
if (root) {
  store.init().then(() => {
    createRoot(root).render(<App />);
  });
}
