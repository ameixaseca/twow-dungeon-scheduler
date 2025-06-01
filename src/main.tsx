import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { MainLayout } from "./layout/MainLayout.tsx";
import { Login, Characters } from "./Pages";
import { AppProvider } from "./infra/app.context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/login" element={<Login />}></Route>
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/" element={<App />}></Route>
            <Route path="/characters" element={<Characters />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </StrictMode>
);
