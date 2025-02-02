import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-start p-24 ">
        <Outlet />
      </main>
    </>
  );
}
