import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg"
const Navbar: React.FC = () => {


  return (
    <>
      {/* Contact Info */}
      <div className="bg-primary text-white p-4 flex justify-between items-center ">
        <div className="flex space-x-4">
          <span className="flex items-center">
            <i className="fas fa-phone-alt mr-2"></i>
            + 1647-982-0999
          </span>
          <a href="mailto:info@vastwayimmigration.com" className="flex items-center hover:underline">
            <i className="fas fa-envelope mr-2"></i>
            info@vastwayimmigration.com
          </a>
          <span className="flex items-center">
            <i className="fas fa-map-marker-alt mr-2"></i>
            7900, Hurontario ST #203, Brampton, ON, L6Y0P6
          </span>
        </div>
        <div className="flex space-x-4">
          <a href="https://www.facebook.com/VASTWAYIMMIGRATIONSERVICES" target="_blank" className="hover:underline">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.linkedin.com/company/vastway-immigration-services-inc" target="_blank" className="hover:underline">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://www.instagram.com/vastwayimmigrationservices/" target="_blank" className="hover:underline">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    
    <header className="w-full bg-white text-primary p-4 flex justify-between items-center shadow-md">
      <a href="/" className="brand flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="w-36 h-auto"
        />
      </a>
      <nav className="flex space-x-4">
        <Link to="/draws" className="text-primary hover:underline">
          Draws
        </Link>
        <Link to="/blogs" className="text-primary hover:underline">
          Blogs
        </Link>
        <Link to="/stories" className="text-primary hover:underline">
          Stories
        </Link>
        <a
          href="https://mail.thecanindian.com/archive"
          target="_blank"
          className="text-primary hover:underline"
          rel="noopener noreferrer"
        >
          Newsletter
        </a>
        <Link to="/draw-tracker" className="text-primary hover:underline">
          Draw Tracker
        </Link>
        <Link to="/pr-program-tracker" className="text-primary hover:underline">
          Ways to PR
        </Link>
        <Link to="/subscribe-form" className="text-primary hover:underline">
          Subscribe
        </Link>
      </nav>
    </header>
    </>
  );
};

export default Navbar;

