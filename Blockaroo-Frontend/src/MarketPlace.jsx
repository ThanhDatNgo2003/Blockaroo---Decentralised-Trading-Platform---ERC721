import './App.css';
import NavBar from './components/NavBar';
import NFTBanner from './components/NFTbanner/NFTbanner';
import EthereumMarketChart from './components/EthereumChart';
import TopTrending from './components/TopUser.jsx';
import jsonData from './blockaroodata/trendinguserdata.js';
import ItemsList from './components/ItemsList.jsx';
import Footer from './components/Footer.jsx'

const MarketPlace = () =>{
  return (
<>
    <div className='navBar'><NavBar /></div>
    <section className='marketplace'>
      <div className='middlemarket'>
        <div className='homeBanner'><NFTBanner /></div>
        <div className='homeMarket'><ItemsList/></div>
      </div>
      <div className='sideBar'>
        <EthereumMarketChart />
        <TopTrending title="Top Trending" users={jsonData.userData1} />
        <TopTrending title="Top Sellers" users={jsonData.userData2} />
      </div>
    </section>
    <div className='footer'><Footer/></div>
    </>
  );
}

export default MarketPlace;