// WalletProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  // Load wallet state and address from localStorage on component mount
  const generateRandomAddress = () => {
    const randomAddress = '0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    return randomAddress;
  };
  const initialWalletState = JSON.parse(localStorage.getItem('walletState')) || { balance: 0 };
  const initialWalletAddress = localStorage.getItem('walletAddress') || generateRandomAddress();

  const [walletState, setWalletState] = useState(initialWalletState);
  const [walletAddress, setWalletAddress] = useState(initialWalletAddress);

  // Function to generate a random wallet address


  // Function to set the default state
  const setDefaultState = () => {
    setWalletState({ balance: 0 });
    setWalletAddress(generateRandomAddress());
  };

  // Function to add funds
  const addFunds = (amount) => {
    setWalletState((prevState) => ({
      ...prevState,
      balance: prevState.balance + amount,
    }));
    
  };

  // Function to deduct funds
  const deductFunds = (amount) => {
    setWalletState((prevState) => ({
      ...prevState,
      balance: prevState.balance - amount,
    }));
  };

  // Save wallet state and address to localStorage on every state change
  useEffect(() => {
    localStorage.setItem('walletState', JSON.stringify(walletState));
    localStorage.setItem('walletAddress', walletAddress);
  }, [walletState, walletAddress]);

  return (
    <WalletContext.Provider value={{ walletAddress, walletState, addFunds, deductFunds, setDefaultState }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
