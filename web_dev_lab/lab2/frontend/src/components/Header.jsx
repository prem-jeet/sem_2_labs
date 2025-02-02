import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-cyan-900 text-white p-4 shadow-md">
      <div className="flex space-x-4 text-cyan-100">
        <NavLink
          end
          to="/user"
          className={({ isActive }) =>
            `${
              isActive
                ? "text-red-100"
                : "hover:text-gray-400 transition duration-300"
            } `
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/user/insurances"
          className={({ isActive }) =>
            `${
              isActive
                ? "text-red-100"
                : "hover:text-gray-400 transition duration-300"
            } `
          }
        >
          Insurances
        </NavLink>
        <NavLink
          to="/user/buy"
          className={({ isActive }) =>
            `${
              isActive
                ? "text-red-100"
                : "hover:text-gray-400 transition duration-300"
            } `
          }
        >
          Buy Insurances
        </NavLink>
      </div>
      <Button variant="destructive" className="text-white font-bold">
        Logout
      </Button>
    </header>
  );
};

export default Header;
