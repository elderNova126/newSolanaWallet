import React, { useEffect, useState, createContext, useRef } from "react";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { Buffer } from "buffer";
// import { debug } from "console";

// Make Buffer available globally
window.Buffer = Buffer;

export const CryptoTrans = createContext();

// Provider
export const CryptoProvider = ({ children }) => {
  const [solCurrentAccount, setSolCurrentAccount] = useState(null);
  const [phantonConnect, setPhantonConnect] = useState(null);
  const [trades, setTrades] = useState({});

  ////////////////////////////////////////////////////////// connect Solana wallet ///////////////////////////////////////////////////////////////
  const SolConnectWallet = async (cate) => {
    if (!window.solana || !window.solana.isPhantom) {
      if (cate === 1) alert("Please install Phantom Wallet!");
      return;
    }
    try {
      const resp = await window.solana.connect({ onlyIfTrusted: false });

      const connection_net = new Connection(
        "https://tame-chaotic-snowflake.solana-mainnet.quiknode.pro/595d9913268adc19027c819df6d678fc95597996/",
        "confirmed"
      );
      //const connection = new Connection("https://api.mainnet-beta.solana.com","confirmed");
      setPhantonConnect(connection_net);
      setSolCurrentAccount(resp.publicKey);
      // getSolTransaction(
      //   connection_net,
      //   "6jTQCFZR8JwvvenVGa3RzGM3a5YEagk9kQXDpHHdpump"
      // );
      localStorage.setItem("solanaConnected", "true");
    } catch (error) {
      alert(error);
    }
  };
  const SolDisconnectWallet = async () => {
    if (!window.solana || !window.solana.isPhantom) {
      alert("Phantom Wallet is not installed!");
      return;
    }
    try {
      await window.solana.disconnect();
      setSolCurrentAccount(null); // Clear the stored wallet address
      setPhantonConnect(null); // Clear the connection
      localStorage.removeItem("solanaConnected");
    } catch (error) {
      alert("Failed to disconnect wallet: " + error.message);
    }
  };
  
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (localStorage.getItem("solanaConnected") === "true") {
        try {
          const resp = await window.solana.connect({ onlyIfTrusted: true });
          setSolCurrentAccount(resp.publicKey);
        } catch (error) {
          console.error("Auto-connect failed:", error);
        }
      }
    };

    checkWalletConnection();
  }, []);
  return (
    <CryptoTrans.Provider
      value={{
        SolConnectWallet,
        SolDisconnectWallet,
        solCurrentAccount,
        phantonConnect,
        // scrollToTopKol,
        // scrollToTrending,
        // scrollToMemes,
        // scrollToLive,
        // TopKol,
        // Trending,
        // Memes,
        // Live,
        trades,
        setTrades,
      }}
    >
      {children}
    </CryptoTrans.Provider>
  );
};
