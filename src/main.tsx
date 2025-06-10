import { createBrowserRouter, RouterProvider } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
import LetterDetails from "./pages/LetterDetails";
import Layout from "./layout";
import { Constants } from "./lib/constants";
import { ProfileProvider } from "./lib/contexts/profileContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: Constants.Routes.HISTORY(), element: <Saved /> },
      { path: Constants.Routes.CREATE_LETTER(), element: <Create /> },
      { path: Constants.Routes.PROFILE(), element: <Profile /> },
      {
        path: Constants.Routes.LETTER_DETAIL(":id"),
        element: <LetterDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProfileProvider>
      <RouterProvider router={router} />
    </ProfileProvider>
  </StrictMode>
);
