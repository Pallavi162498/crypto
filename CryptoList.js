import React, { useEffect, useState } from 'react';
import { getBitcoinPrice, getTrendingCoins } from '../services/cryptoService';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import Slider from 'react-slick';
import './CryptoList.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CryptoList = () => {
    const [bitcoinPrice, setBitcoinPrice] = useState({ usd: 0, inr: 0, usd_24h_change: 0, inr_24h_change: 0 });
    const [trendingCoins, setTrendingCoins] = useState([]);

    useEffect(() => {
        const fetchBitcoinPrice = async () => {
            try {
                const priceData = await getBitcoinPrice();
                setBitcoinPrice(priceData);
            } catch (error) {
                console.error('Error fetching Bitcoin price:', error);
            }
        };

        const fetchTrendingCoins = async () => {
            try {
                const trendingCoinsData = await getTrendingCoins();
                setTrendingCoins(trendingCoinsData);
            } catch (error) {
                console.error('Error fetching trending coins:', error);
            }
        };

        fetchBitcoinPrice();
        fetchTrendingCoins();
    }, []);

    const renderTrendingCoinsCarousel = () => {
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            
        };

        return (
            <Slider {...settings}>
                {trendingCoins.map((coin) => (
                    <div key={coin.item.id}>
                        <img src={coin.item.large} alt={`${coin.item.name} Logo`} />
                        <p>{coin.item.symbol}</p>
                        <p>Price: {coin.item.current_price} USD</p>
                        
                        <p>Price: {coin.item.current_price ? coin.item.current_price.toFixed(2) + ' USD' : 'N/A'}</p>




                        <img src={coin.item.sparkline_in_7d} alt={`${coin.item.name} Sparkline`} />
                    </div>
                ))}
            </Slider>
        );
    };
    // Define carousel settings
    const carouselSettings = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="crypto-list-container">
            <div className="bitcoin-price-chart">
                <h2 className='heading'>Bitcoin Price Chart</h2>
                
                <TradingViewWidget
                    symbol="BINANCE:BTCUSD"
                    theme={Themes.DARK}
                    interval="D"
                    studies={['MASimple@tv-basicstudies']}
                    locale="en"                    
                />
            </div>

            <div className="trending-coins-container">
                <div className="trending-coins">
                    <h2>Trending Coins</h2>
                    
                    <ul className="trending-coins-list">
                        {trendingCoins.map((coin) => (
                            <li key={coin.item.id} className="trending-coins-list-item">
                                {coin.item.name} ({coin.item.symbol})
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="you-may-like">
                    <h2>You May Also Like</h2>
                    <Slider className="you-may-like-carousel" {...carouselSettings}>
                        {renderTrendingCoinsCarousel()}    
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default CryptoList;

    