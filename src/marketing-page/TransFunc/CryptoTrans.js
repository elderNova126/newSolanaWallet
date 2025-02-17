import React, { useEffect, useState, createContext, useRef } from "react";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { Buffer } from "buffer";

// Make Buffer available globally
window.Buffer = Buffer;

export const CryptoTrans = createContext();

// Provider
export const CryptoProvider = ({ children }) => {
  const [solCurrentAccount, setSolCurrentAccount] = useState(null);
  const [phantonConnect, setPhantonConnect] = useState(null);
  const [trades, setTrades] = useState({});
  // const TopKol = useRef(null);
  // const Trending = useRef(null);
  // const Memes = useRef(null);
  // const Live = useRef(null);
  // const scrollToTopKol = () => {
  //   TopKol.current?.scrollIntoView({ behavior: "smooth" }); // Scroll smoothly
  // };
  // const scrollToTrending = () => {
  //   Trending.current?.scrollIntoView({ behavior: "smooth" }); // Scroll smoothly
  // };
  // const scrollToMemes = () => {
  //   Memes.current?.scrollIntoView({ behavior: "smooth" }); // Scroll smoothly
  // };
  // const scrollToLive = () => {
  //   Live.current?.scrollIntoView({ behavior: "smooth" }); // Scroll smoothly
  // };
  ////////////////////////////////////////////////////////// connect Solana wallet ///////////////////////////////////////////////////////////////
  const SolConnectWallet = async (cate) => {
    if (!window.solana || !window.solana.isPhantom) {
      if (cate === 1) alert("Please install Phantom Wallet!");
      return;
    }
    try {
      const resp = await window.solana.connect();

      const connection_net = new Connection(
        "https://tame-chaotic-snowflake.solana-mainnet.quiknode.pro/595d9913268adc19027c819df6d678fc95597996/",
        "confirmed"
      );
      //const connection = new Connection("https://api.mainnet-beta.solana.com","confirmed");
      setPhantonConnect(connection_net);
      setSolCurrentAccount(resp.publicKey);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    SolConnectWallet();
  }, []);
  return (
    <CryptoTrans.Provider
      value={{
        SolConnectWallet,
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
