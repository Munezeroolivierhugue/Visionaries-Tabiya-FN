import React from "react";
import { Link, NavLink } from "react-router-dom";
import Profile from "../assets/images/profile.jpg";

const navItems = [
  // { name: "Dashboard", path: "/" },
  { name: "Skills Assesments", path: "/skills" },
  { name: "Career paths", path: "/career" },
  { name: "Learning", path: "/learning" },
];

const NavBar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md mt-5">
      <div className="px-6 py-4 flex justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          SkillsBridge
        </Link>
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
        <div className="text-base text-gray-500 flex gap-x-4">
          <div className="flex justify-center items-center">
            <img
              src={Profile}
              alt="Profile picture"
              className="w-12 h-12 object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-black">John Doe</h3>
            <p>Skill explorer</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
