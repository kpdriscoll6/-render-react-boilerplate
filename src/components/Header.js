import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg'; // Import the logo

function Header() {
  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-8 mr-2" /> {/* Add the logo */}
          <h1 className="text-2xl font-bold">My React App</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/page1" className="hover:underline">Page 1</Link></li>
            <li><Link to="/page2" className="hover:underline">Page 2</Link></li>
            <li><Link to="/page3" className="hover:underline">Page 3</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;