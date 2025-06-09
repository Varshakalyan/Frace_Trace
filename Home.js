import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConnectButton from "../components/ConnectButton";

function Home() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div>
      <div className="landing-bg"></div>
      <div className="content-container">
        <div className="logo-container">
          <img src="/logo.png" alt="Logo" className="logo-image" />
        </div>
        <h1 className="main-heading">FaceTrace</h1>
        <p className="subheading">
          Verify the authenticity of social media profiles and content with our advanced AI tools
        </p>
        
        <div className="btn-container">
          {isLoggedIn ? (
            <ConnectButton />
          ) : (
            <Link to="/signup" className="btn btn-primary">
              Get Started
            </Link>
          )}
          <button 
            className="btn btn-secondary about-btn"
            onClick={() => setShowAbout(!showAbout)}
          >
            {showAbout ? "Hide Information" : "To Know More About Us"}
          </button>
        </div>
        
        {showAbout && (
          <div className="about-section">
            <h2>About FaceTrace</h2>
            <div className="about-content">
              <div className="about-item">
                <div className="about-icon">🔍</div>
                <h3>Our Mission</h3>
                <p>
                  At FaceTrace, we're committed to fighting misinformation by providing powerful tools 
                  that help users verify the authenticity of social media profiles and content. 
                  In an era of deepfakes and digital manipulation, we believe in empowering people 
                  with the ability to distinguish fact from fiction.
                </p>
              </div>
              
              <div className="about-item">
                <div className="about-icon">🛡️</div>
                <h3>How It Works</h3>
                <p>
                  Our platform uses advanced AI algorithms to analyze social media profiles and media content. 
                  We examine multiple factors including account behavior patterns, image metadata, 
                  manipulation signatures, and AI-generation markers to provide a comprehensive 
                  authenticity assessment with confidence ratings.
                </p>
              </div>
              
              <div className="about-item">
                <div className="about-icon">🔒</div>
                <h3>Privacy & Security</h3>
                <p>
                  We prioritize your privacy and security. All verifications are conducted with 
                  end-to-end encryption, and we never store the content you verify. Your blockchain 
                  wallet connection ensures secure and anonymous usage of our platform while maintaining 
                  a record of your verification history.
                </p>
              </div>
              
              <div className="about-item">
                <div className="about-icon">👥</div>
                <h3>Our Team</h3>
                <p>
                  FaceTrace was founded by a team of cybersecurity experts, AI researchers, and 
                  digital media specialists who recognized the growing threat of digital deception. 
                  We combine technical expertise with a commitment to digital literacy and 
                  information integrity.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
