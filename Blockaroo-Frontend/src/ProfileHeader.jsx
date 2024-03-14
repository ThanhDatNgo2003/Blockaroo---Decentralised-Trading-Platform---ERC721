import { useSelector } from "react-redux";
import { useWallet } from './components/WalletContext';
import { useEffect } from "react";
import { useState } from "react";


const Header = (props) => {
    const {setEdit} = props;
    const user = useSelector((state) => state.user);
    const [walletAddress, setWalletAddress] = useState('');

    useEffect(() => {
        const address = localStorage.getItem('wallet_address');
        setWalletAddress(address);
    }, []);

    const handleEdit = () => {
        setEdit(true);
    }



    return (
    <>
        <section className="header" style={{backgroundColor: `${user.themeColor}`, 
                        backgroundImage: `linear-gradient(180deg, ${user.themeColor} 2%, ${user.themeColor} , 65%, #181818 100%)`,}}>
            <div className="info-container">
                <div className="info-edit" onClick={handleEdit}>
                    Edit
                </div>
                <img className="info-ava" src={user.avaUrl} alt=""></img>
                <div className="info-username">{user.name}</div>
                <div className="waller-address"> Wallet: {walletAddress} </div>
                
            </div>
        </section>
    </>  
    );
}
 
export default Header;