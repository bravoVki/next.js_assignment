import { useState } from "react";
import Link from "next/link";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-4">
          <a href="#" className="text-white font-bold text-xl mr-4">
            Logo
          </a>
          <div className="flex sm:hidden">
            <button
              className="text-white"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          <ul className="hidden sm:flex space-x-4">
            <li>
              <a href="#" className="text-white">
                Home
              </a>
            </li>
            <li>
              <Link href="/components/explore" className="text-white">
                Explore
              </Link>
            </li>
            <li>
              <Link href="/products/category" className="text-white">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/components/login" className="text-white">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Menu options */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <ul className="bg-gray-800 py-2 px-4">
            <li>
              <a href="#" className="text-white block py-2">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-white block py-2">
                Explore
              </a>
            </li>
            <li>
              <a href="#" className="text-white block py-2">
                Categories
              </a>
            </li>
            <li>
              <a href="#" className="text-white block py-2">
                Login
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
