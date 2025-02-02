import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import AuthLayout from "./pages/auth/authLayout";
import Signup from "./pages/auth/signup/page";
import ForgotPassword from "./pages/auth/forgot-password/page";
import Login from "./pages/auth/login/page";
import UserLayout from "./pages/user/userLayout";
import UserDetails from "./pages/user/userDetails/UserDetails";
import UserInsurances from "./pages/user/insurances/UserInsurances";
import BuyInsurances from "./pages/user/buyInsurances/BuyInsurances";

const isLoggedIn = false; // Replace with actual auth logic

const ProtectedRoutes = () => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" />;
};

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
      <Route element={<ProtectedRoutes />}>
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
