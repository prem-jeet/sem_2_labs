import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Navigate, RouterProvider } from "react-router";
import AuthLayout from "./pages/auth/authLayout";
import Signup from "./pages/auth/signup/page";
import ForgotPassword from "./pages/auth/forgot-password/page";
import Login from "./pages/auth/login/page";
const isLoggedIn = true;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          !isLoggedIn ? (
            <Navigate to="/auth/login" />
          ) : (
            <Navigate to="/auth/signup" />
          )
        }
      ></Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="forgot-password" element={<ForgotPassword />}></Route>
        <Route path="" element={<Navigate to="/auth/signup" />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
