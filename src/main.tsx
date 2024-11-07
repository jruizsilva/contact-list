import { createRoot } from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { ModalsProvider } from "@mantine/modals";

createRoot(document.getElementById("root")!).render(
  <MantineProvider defaultColorScheme="dark">
    <ModalsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ModalsProvider>
  </MantineProvider>
);
