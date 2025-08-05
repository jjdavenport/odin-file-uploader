import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import {
  LoginPage,
  RegisterPage,
  HomePage,
  FilePage,
  FilesPage,
  NewFolderPage,
} from "./pages/index.ts";
import "./index.css";
import App from "./App.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "files",
        element: <FilesPage />,
      },
      {
        path: "file",
        element: <FilePage />,
      },
      {
        path: "new-folder",
        element: <NewFolderPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
