import React from "react";

function Services() {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Our Services</h1>
        
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">👤</div>
            <h3>Profile Verification</h3>
            <p>
              Verify the authenticity of social media profiles across platforms like Facebook, Instagram, Twitter, and LinkedIn. 
              Detect bot accounts, impersonators, and suspicious profiles with our advanced AI algorithms.
            </p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">🖼️</div>
            <h3>Image Authentication</h3>
            <p>
              Detect manipulated or AI-generated images on social media. Our technology can identify photoshopped elements, 
              inconsistent lighting, and artifacts from AI generation tools like DALL-E and Midjourney.
            </p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">🎬</div>
            <h3>Video Deepfake Detection</h3>
            <p>
              Identify deepfake videos and manipulated audio content. Our system analyzes facial movements, 
              voice patterns, and video artifacts to detect artificially generated or manipulated media.
            </p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">📊</div>
            <h3>Comprehensive Reports</h3>
            <p>
              Receive detailed reports on verification results with confidence scores and specific findings. 
              Our reports highlight the exact elements that indicate authenticity or manipulation.
            </p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">🔍</div>
            <h3>Bulk Verification</h3>
            <p>
              For businesses and organizations, we offer bulk verification services to analyze multiple profiles 
              or media files simultaneously, with custom reporting and integration options.
            </p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">🛡️</div>
            <h3>Real-time Protection</h3>
            <p>
              Our browser extension provides real-time alerts when you encounter potentially fake profiles 
              or manipulated content while browsing social media platforms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
