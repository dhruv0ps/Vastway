import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X, Phone, Mail, MapPin, Facebook, Linkedin, Instagram } from "lucide-react"
import logo from "../../assets/logo.svg"
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      {/* Contact Info */}
      <div className="bg-primary text-white p-2 md:p-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row md:space-x-4 mb-2 md:mb-0">
            <span className="flex items-center justify-center md:justify-start">
              <Phone className="w-4 h-4 mr-2" />+ 1647-982-0999
            </span>
            <a
              href="mailto:info@vastwayimmigration.com"
              className="flex items-center justify-center md:justify-start hover:underline"
            >
              <Mail className="w-4 h-4 mr-2" />
              info@vastwayimmigration.com
            </a>
            <span className="flex items-center justify-center md:justify-start">
              <MapPin className="w-4 h-4 mr-2" />
              7900, Hurontario ST #203, Brampton, ON, L6Y0P6
            </span>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/VASTWAYIMMIGRATIONSERVICES"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/vastway-immigration-services-inc"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/vastwayimmigrationservices/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <header className="w-full bg-white text-primary p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="brand flex items-center">
            <img src={logo} alt="Logo" className="w-40 h--auto" />
          </Link>
          <nav className="hidden md:flex space-x-4">
            <NavLinks />
          </nav>
          <button onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

    
      {isMenuOpen && (
        <div className="md:hidden bg-white text-primary p-4 shadow-md">
          <nav className="flex flex-col space-y-2">
            <NavLinks />
          </nav>
        </div>
      )}
    </>
  )
}

const NavLinks: React.FC = () => (
  <>
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
  </>
)

export default Navbar