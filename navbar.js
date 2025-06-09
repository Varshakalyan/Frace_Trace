import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isWalletConnected = localStorage.getItem("walletConnected") === "true";
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("walletConnected");
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="Logo" className="navbar-logo-img" />
          FaceTrace
        </Link>

        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>

        <div className={`navbar-links ${mobileMenuOpen ? "active" : ""}`}>
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/services" className="navbar-link">Services</Link>
          <Link to="/contact" className="navbar-link">Contact</Link>

          <Link to="/dummy-instagram" className="navbar-link">
            Instagram Profile
          </Link>

          <Link to="/facebook-profile" className="navbar-link">
            Facebook Profile
          </Link>

          <Link to="/twitter-profile" className="navbar-link">
            Twitter Profile
          </Link>

    
          <div className="navbar-auth">
            {isLoggedIn ? (
              <>
                {isWalletConnected && (
                  <Link to="/dashboard" className="navbar-auth-btn login">
                    Dashboard
                  </Link>
                )}
                <button 
                  onClick={handleLogout} 
                  className="navbar-auth-btn signup"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar-auth-btn login">
                  Login
                </Link>
                <Link to="/signup" className="navbar-auth-btn signup">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
