import React, { useEffect, useState } from "react";
import "./Settings.css";

function Settings() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    wallet: ""
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser) {
      setUserData({
        name: storedUser.name,
        email: storedUser.email,
        wallet: storedUser.wallet
      });
    }
  }, []);

  return (
    <div className="settings-page">
      <h2 className="settings-title">Account Settings</h2>
      <div className="settings-form">
        <label>Email</label>
        <input type="email" value={userData.email} readOnly />

        <label>Name</label>
        <input type="text" value={userData.name} readOnly />

        <label>Wallet Address</label>
        <input type="text" value={userData.wallet} readOnly />

        <label>Password</label>
        <input type="password" value="********" readOnly />
        <button className="change-btn">Change Password</button>
      </div>
    </div>
  );
}

export default Settings;
