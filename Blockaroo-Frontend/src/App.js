import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MarketPlace from './MarketPlace.jsx';
import Login from './Login.jsx';
import Profile from './Profile.jsx';
import { WalletProvider } from './components/WalletContext.jsx';



function App() {
  return (
    <WalletProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MarketPlace />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </Router>
    </WalletProvider>
  );
}

export default App;