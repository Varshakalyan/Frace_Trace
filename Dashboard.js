import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isWalletConnected = localStorage.getItem("walletConnected") === "true";
  const walletAddress = localStorage.getItem("walletAddress") || "";
  const userName = localStorage.getItem("userName") || "User";
  const userEmail = localStorage.getItem("userEmail") || "user@example.com";

  const [activeTab, setActiveTab] = useState("verify-profile");
  const [profileUrl, setProfileUrl] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const [results, setResults] = useState(null);
  const [verifyType, setVerifyType] = useState("profile");
  const [activePlatform, setActivePlatform] = useState("facebook");

  const [nameInput, setNameInput] = useState(userName);
  const [emailInput, setEmailInput] = useState(userEmail);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    if (!isWalletConnected) {
      navigate("/");
    }

    setNameInput(localStorage.getItem("userName") || "User");
    setEmailInput(localStorage.getItem("userEmail") || "user@example.com");
  }, [isLoggedIn, isWalletConnected, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("walletConnected");
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const handleProfileUrlChange = (e) => {
    setProfileUrl(e.target.value);
    setResults(null);
  };

  const handleMediaUrlChange = (e) => {
    setMediaUrl(e.target.value);
    setResults(null);
  };

  const handleVerify = () => {
    setResults("loading");

    setTimeout(() => {
      let verificationData = null;

      if (verifyType === "profile") {
        verificationData = {
          type: "profile",
          url: profileUrl,
          result: {
            authentic: Math.random() > 0.5,
            confidence: Math.floor(Math.random() * 30) + 70,
            details: {
              accountAge: `${Math.floor(Math.random() * 5) + 1} years`,
              activityConsistency: Math.random() > 0.6 ? "Consistent" : "Inconsistent",
              profileCompleteness: `${Math.floor(Math.random() * 40) + 60}%`,
              suspiciousPatterns: Math.random() > 0.7 ? "None detected" : "Detected",
              botLikelihood: `${Math.floor(Math.random() * 100)}%`,
            },
          },
        };
      } else if (verifyType === "media") {
        const platform = getPlatformFromUrl(mediaUrl);
        verificationData = {
          type: "media",
          url: mediaUrl,
          result: {
            authentic: Math.random() > 0.5,
            confidence: Math.floor(Math.random() * 30) + 70,
            details: {
              manipulationDetected: Math.random() > 0.7,
              metadataConsistency: Math.random() > 0.6 ? "Consistent" : "Inconsistent",
              artificialGeneration: Math.random() > 0.7 ? "Not detected" : "Likely AI-generated",
              inconsistentElements: Math.random() > 0.8,
              platform: platform,
            },
          },
        };
      }

      const historyKey = `verificationHistory_${userEmail}`;
      let history = JSON.parse(localStorage.getItem(historyKey)) || [];
      history.unshift({
        timestamp: new Date().toISOString(),
        ...verificationData,
      });
      localStorage.setItem(historyKey, JSON.stringify(history));

      setResults(verificationData.result);
    }, 2000);
  };

  const getPlatformFromUrl = (url) => {
    if (url.includes("facebook.com")) return "Facebook";
    if (url.includes("instagram.com")) return "Instagram";
    if (url.includes("twitter.com")) return "Twitter";
    if (url.includes("linkedin.com")) return "LinkedIn";
    return "Unknown";
  };

  const getPlaceholderUrl = () => {
    switch (activePlatform) {
      case "facebook":
        return "https://www.facebook.com/username/posts/123456789";
      case "instagram":
        return "https://www.instagram.com/p/xyzabc123/";
      case "twitter":
        return "https://twitter.com/username/status/123456789";
      case "linkedin":
        return "https://www.linkedin.com/posts/username_article123/";
      default:
        return "https://www.example.com/post/12345";
    }
  };

  if (!isLoggedIn || !isWalletConnected) return null;

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <div className="user-profile">
          <div className="user-avatar">👤</div>
          <div className="user-info">
            <h3>Welcome back</h3>
            <p>{userName}</p>
            <small className="wallet-address">
              {walletAddress.substring(0, 6)}...{walletAddress.substring(38)}
            </small>
          </div>
        </div>

        <nav className="dashboard-nav">
          {["verify-profile", "verify-media", "history", "settings"].map((tab) => (
            <button
              key={tab}
              className={`nav-item ${activeTab === tab ? "active" : ""}`}
              onClick={() => {
                setActiveTab(tab);
                if (tab === "verify-profile") {
                  setVerifyType("profile");
                  setResults(null);
                } else if (tab === "verify-media") {
                  setVerifyType("media");
                  setResults(null);
                }
              }}
            >
              {tab === "verify-profile" && "Verify Profile"}
              {tab === "verify-media" && "Verify Media"}
              {tab === "history" && "History"}
              {tab === "settings" && "Settings"}
            </button>
          ))}
          <button className="nav-item" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </div>

      <div className="dashboard-content">
        {activeTab === "verify-profile" && (
          <div className="upload-section">
            <h1>Verify Social Media Profile</h1>
            <p>Enter a social media profile URL to verify its authenticity</p>

            <div className="upload-container">
              <div className="social-media-selector">
                <label>Select Platform:</label>
                <div className="platform-buttons">
                  {["facebook", "instagram", "twitter", "linkedin"].map((platform) => (
                    <button
                      key={platform}
                      className={`platform-btn ${activePlatform === platform ? "active" : ""}`}
                      onClick={() => setActivePlatform(platform)}
                    >
                      <span className="platform-icon">📘</span>{" "}
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group profile-url-input">
                <label>Profile URL:</label>
                <input
                  type="text"
                  placeholder={getPlaceholderUrl()}
                  value={profileUrl}
                  onChange={handleProfileUrlChange}
                />
              </div>

              {profileUrl && !results && (
                <button className="analyze-btn" onClick={handleVerify}>
                  Verify Profile
                </button>
              )}

              {results === "loading" && (
                <div className="loading-results">
                  <div className="spinner"></div>
                  <p>Analyzing profile...</p>
                </div>
              )}

              {results && results !== "loading" && (
                <div className={`analysis-results ${results.authentic ? "authentic" : "forged"}`}>
                  <h2>{results.authentic ? "✅ Likely Authentic" : "❌ Potentially Fake"}</h2>
                  <div className="confidence-meter">
                    <p>Confidence: {results.confidence}%</p>
                    <div className="meter-bar">
                      <div className="meter-fill" style={{ width: `${results.confidence}%` }}></div>
                    </div>
                  </div>
                  <div className="analysis-details">
                    <h3>Profile Analysis:</h3>
                    <ul>
                      <li>Account Age: {results.details.accountAge}</li>
                      <li>Activity Consistency: {results.details.activityConsistency}</li>
                      <li>Profile Completeness: {results.details.profileCompleteness}</li>
                      <li>Suspicious Patterns: {results.details.suspiciousPatterns}</li>
                      <li>Bot Likelihood: {results.details.botLikelihood}</li>
                    </ul>
                  </div>
                  <button className="new-analysis-btn" onClick={() => setProfileUrl("")}>
                    New Verification
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "verify-media" && (
          <div className="upload-section">
            <h1>Verify Social Media Content</h1>
            <p>Enter the URL of a social media post to verify its authenticity</p>
            <div className="upload-container">
              <div className="form-group media-url-input">
                <label>Post URL:</label>
                <input
                  type="text"
                  placeholder={getPlaceholderUrl()}
                  value={mediaUrl}
                  onChange={handleMediaUrlChange}
                />
              </div>
              {mediaUrl && !results && (
                <button className="analyze-btn" onClick={handleVerify}>
                  Verify Media
                </button>
              )}
              {results === "loading" && (
                <div className="loading-results">
                  <div className="spinner"></div>
                  <p>Analyzing media...</p>
                </div>
              )}
              {results && results !== "loading" && (
                <div className={`analysis-results ${results.authentic ? "authentic" : "forged"}`}>
                  <h2>{results.authentic ? "✅ Likely Authentic" : "❌ Potentially Manipulated"}</h2>
                  <div className="confidence-meter">
                    <p>Confidence: {results.confidence}%</p>
                    <div className="meter-bar">
                      <div className="meter-fill" style={{ width: `${results.confidence}%` }}></div>
                    </div>
                  </div>
                  <div className="analysis-details">
                    <h3>Media Analysis:</h3>
                    <ul>
                      <li>Manipulation Detected: {results.details.manipulationDetected ? "Yes" : "No"}</li>
                      <li>Metadata Consistency: {results.details.metadataConsistency}</li>
                      <li>Artificial Generation: {results.details.artificialGeneration}</li>
                      <li>Inconsistent Elements: {results.details.inconsistentElements ? "Yes" : "No"}</li>
                      <li>Platform: {results.details.platform}</li>
                    </ul>
                  </div>
                  <button className="new-analysis-btn" onClick={() => setMediaUrl("")}>
                    New Verification
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="history-section">
            <h1>Verification History</h1>
            <p>View your recent profile and media verifications</p>
            <div className="history-list">
              {(() => {
                const historyKey = `verificationHistory_${userEmail}`;
                const history = JSON.parse(localStorage.getItem(historyKey)) || [];
                if (history.length === 0) {
                  return (
                    <div className="history-empty">
                      <div className="empty-icon">📊</div>
                      <h3>No verification history yet</h3>
                      <p>Your recent verifications will appear here</p>
                    </div>
                  );
                }
                return history.map((entry, index) => (
                  <div key={index} className="history-entry">
                    <p><strong>{new Date(entry.timestamp).toLocaleString()}</strong></p>
                    {entry.type === "profile" ? (
                      <p>Profile URL: {entry.url}</p>
                    ) : (
                      <p>Media URL: {entry.url}</p>
                    )}
                    <p>Result: {entry.result.authentic ? "✅ Likely Authentic" : "❌ Potentially Fake"}</p>
                    <p>Confidence: {entry.result.confidence}%</p>
                  </div>
                ));
              })()}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="settings-section">
            <h1>Account Settings</h1>
            <p>Update your username and email</p>
            <div className="settings-form">
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>
              <button
                className="save-btn"
                onClick={() => {
                  localStorage.setItem("userName", nameInput);
                  localStorage.setItem("userEmail", emailInput);
                  setNameInput(nameInput);
                  setEmailInput(emailInput);
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
