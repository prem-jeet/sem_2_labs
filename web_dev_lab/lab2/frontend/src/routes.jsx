import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import AuthLayout from "./pages/auth/authLayout";
import Signup from "./pages/auth/signup/page";
import ForgotPassword from "./pages/auth/forgot-password/page";
import Login from "./pages/auth/login/page";
import UserLayout from "./pages/user/userLayout";
import UserDetails from "./pages/user/userDetails/UserDetails";
import UserInsurances from "./pages/user/insurances/UserInsurances";
import BuyInsurances from "./pages/user/buyInsurances/BuyInsurances";
import ProtectedRoute from "./ProtectedRoute";

const isLoggedIn = !!localStorage.getItem("token"); // Replace with actual auth logic

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {!isLoggedIn && (
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="" element={<Navigate to="login" />} />
          {/* Catch-all for unauthenticated users */}
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </Route>
      )}

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Navigate to="/user" />} />
        <Route path="/user" element={<UserLayout />}>
          <Route path="" element={<UserDetails />} />
          <Route path="insurances" element={<UserInsurances />} />
          <Route path="buy" element={<BuyInsurances />} />
        </Route>
        {/* Catch-all for authenticated users */}
        <Route path="*" element={<Navigate to="/user" />} />
      </Route>
    </>
  )
);

export default router;
