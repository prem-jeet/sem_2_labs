// export const metadata = {
//   title: "Auth System",
//   description: "Login and Signup system",
// };

import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Outlet />
    </main>
  );
}
