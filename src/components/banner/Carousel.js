import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../../config/api' 
import { CryptoState } from '../../CryptoContext'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'

export function numCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
    const [trending, setTrending] = useState([])
    const {currency, symbol} = CryptoState();
    // fetch api
    const fetchTrendingCoins = async ()=>{
        try{
            const res = await fetch(TrendingCoins(currency));
            const data = await res.json();
            setTrending(data);
        }
        catch(err) {
            console.error(err);
        }
    }
    console.log(trending)

    useEffect(() => {
        fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);
    
    const items = trending.map((coin)=>{
        let profit = coin.price_change_percentage_24h > 0;
        return <Link
                    style={{
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        textTransform:'uppercase',
                        cursor:'pointer',
                        color:'white',
                    }}
                    to={`/coins/${coin.id}`}
                >
                    <img src={coin?.image}
                        alt={coin.name}
                        height='80px'
                        style={{marginBottom:'15px'}}
                    />
                    <span>
                        {coin?.symbol}
                        &nbsp;
                        <span 
                            style={{
                                color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                                fontWeight:500,
                            }}
                        >
                            {profit && '+'} {coin.price_change_percentage_24h.toFixed(2)}%
                        </span>
                    </span>
                    <span style={{fontSize:22, fontWeight:500,}}>
                        {symbol} {numCommas(coin?.current_price.toFixed(2))}
                    </span>
                </Link>
    })

    const responsive ={
        0:{
            items :2,
        },
        512 :{
            items:4,
        },
    }

    return (
        <div style={{height:'50%', display:'flex', alignItems:'center'}}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                responsive={responsive}
                autoPlay
                disableButtonsControls
                disableDotsControls
                items={items}
            />
        </div>
    )
}

export default Carousel