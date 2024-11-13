import { createRoot } from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "dayjs/locale/es";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { DatesProvider } from "@mantine/dates";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

createRoot(document.getElementById("root")!).render(
  <MantineProvider defaultColorScheme="dark">
    <DatesProvider
      settings={{
        locale: "es",
        timezone: "America/Argentina/Buenos_Aires",
      }}
    >
      <Notifications />
      <ModalsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalsProvider>
    </DatesProvider>
  </MantineProvider>
);
