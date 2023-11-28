import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout.tsx";
import { NotFoundPage } from "../pages/NotFoundPage.tsx";
import { HomePage } from "../pages/HomePage.tsx";
import { AboutPage } from "../pages/AboutPage.tsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
    ],
  },
]);
