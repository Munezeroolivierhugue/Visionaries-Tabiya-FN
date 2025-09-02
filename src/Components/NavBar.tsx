import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Skills Assesments", path: "/skills" },
  { name: "Career paths", path: "/career" },
  { name: "Learning", path: "/learning" },
];

const NavBar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">SkillsBridge</div>
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-gray-600 hover:text-blue-600 transition-colors duration-200 ${
                  isActive ? "text-blue-600 font-semibold" : ""
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
