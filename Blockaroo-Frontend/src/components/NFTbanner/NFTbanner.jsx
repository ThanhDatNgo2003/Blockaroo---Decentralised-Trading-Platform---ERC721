import React from 'react';
import './NFTbanner.css';

const NFTBanner = () => {
 return (
    <div className="banner">
      <div className="banner-left">
        <img src="banner.jpg" alt="NFT Banner" />
      </div>
      <div className="banner-right">
        <h1>Discover, Collect and Sell your NFTs</h1>
        <p>Blockaroo NFT Marketplace brings artists and creators together on a single platform.</p>
        <div className="buttons">
          <button className="button-discover">Discover Now</button>
          <button className="button-create">Create Yours</button>
        </div>
      </div>
    </div>
 );
};

export default NFTBanner;