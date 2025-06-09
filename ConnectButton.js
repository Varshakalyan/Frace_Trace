import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ConnectButton() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    
    if (isConnecting) return;

    setIsConnecting(true);

    try {
      if (!window.ethereum) {
        alert("Please install MetaMask to connect your wallet!");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const account = accounts[0];
      setWalletAddress(account);
      setIsConnected(true);
      localStorage.setItem("walletConnected", "true");
      localStorage.setItem("walletAddress", account);

      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      
      if (
        error.code === -32002 ||
        error.message?.includes("Already processing eth_requestAccounts")
      ) {
        alert("MetaMask is already processing a connection request. Please open MetaMask and approve it.");
      } else {
        console.error("Wallet connection error:", error.message || error);
        alert(error.message || "Failed to connect wallet. Please try again.");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  if (!isLoggedIn) {
    return <p>Please log in to connect your wallet.</p>;
  }

  return (
    <button
      onClick={connectWallet}
      className="btn btn-primary"
      disabled={isConnecting || isConnected}
    >
      {isConnecting
        ? "Connecting..."
        : isConnected
        ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`
        : "Connect Wallet"}
    </button>
  );
}

export default ConnectButton;
