import React, { useEffect, useState, createContext } from "react";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { Buffer } from "buffer";

// Make Buffer available globally
window.Buffer = Buffer;

export const CryptoTrans = createContext();

// Provider
export const CryptoProvider = ({ children }) => {
  const [solCurrentAccount, setSolCurrentAccount] = useState(null);
  const [phantonConnect, setPhantonConnect] = useState(null);

  ////////////////////////////////////////////////////////// connect Solana wallet ///////////////////////////////////////////////////////////////
  const SolConnectWallet = async () => {
    if (!window.solana || !window.solana.isPhantom) {
      alert("Please install Phantom Wallet!");
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

  ////////////////////////////////////////////////////////////////getSolTransaction//////////////////////////////////////////
  const getSolTransaction = async (connection, address) => {
    const signatures = await connection.getSignaturesForAddress(
      address, { limit: 10 } // Limit can be adjusted
    );
    console.log('signatures',signatures)
    // Fetch detailed transaction info for each signature
    const transactions = await Promise.all(
      signatures.map(async ({ signature, }) => {
        const txDetails = await connection.getTransaction(signature,{
          maxSupportedTransactionVersion: 0, // Explicitly set this
        });
        console.log("Fetched transaction details:", txDetails);
        return txDetails;
      })
    );
    const validTransactions = transactions.filter((tx) => tx !== null);
    
    return validTransactions;
  };
  useEffect(() => {
    SolConnectWallet();
  }, []);
  return (
    <CryptoTrans.Provider
      value={{
        SolConnectWallet,
        solCurrentAccount,
        getSolTransaction,
        phantonConnect,
      }}
    >
      {children}
    </CryptoTrans.Provider>
  );
};
