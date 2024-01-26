import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../config/api';
import CoinInfo from '../components/CoinInfo';
import { Box, Container, LinearProgress, Typography, useTheme } from '@mui/material';
import { numCommas } from './../components/banner/Carousel';

const CoinPage = () => {
    const {id} = useParams();
    const {currency, symbol} = CryptoState();
    const [coin, setCoin] = useState();
    // fetch api
    const fetchCoin = async ()=>{
        try{
            const res = await fetch(SingleCoin(id));
            const data = await res.json();
            setCoin(data);
        }catch(error){
            console.log(error)
        }
            
    }
    console.log(coin)

    useEffect(() => {
        fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const theme = useTheme();

    if(!coin) return <LinearProgress sx={{bgcolor:'gold'}}/>

    return (
        // container
        <Container sx={{
            display:'flex',
            alignItems:'center',
            [theme.breakpoints.down('md')]:{
                flexDirection:'column',
                alignItems:'center'
            }
        }}>
            {/* side bar */}
            <Box sx={{
                width:'40%',
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                marginTop:'25px',
                borderRight:'2px solid gray',
                [theme.breakpoints.down('md')]:{
                    width:'100%',
                    borderRight:'0px',
                },
                
            }}>
                <img src={coin?.image.large} alt={coin?.name}
                    height='200' style={{marginBottom:'20px'}}
                />
                <Typography variant='h3'
                    sx={{fontWeight:'bold', marginBottom:'20px', fontFamily:'montserrat'}}>
                    {coin?.name}
                </Typography>
                <Typography variant='subtitle1'
                    sx={{fontWeight:'bold',
                    marginBottom:'20px',
                    fontFamily:'montserrat',
                    width:'100%',
                    paddingTop:'0',
                    textAlign:'justify',
                    padding:'25px'
                    }}>
                    {coin?.description.en.split('. ')[0]}.
                </Typography>
                <Box 
                sx={{
                    alignSelf:'start',
                    padding:'20px',
                    paddingTop:'10px',
                    width:'100%',
                    [theme.breakpoints.down('md')]:{
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'space-around',
                    },
                    [theme.breakpoints.down('sm')]:{
                        flexDirection:'column',
                        alignItems:'center',
                    },
                    [theme.breakpoints.down('xm')]:{
                        alignItems:'start',
                    },
                }}
                >
                    {/* Rank span */}
                    <Box sx={{display:'flex',
                    }}>
                        <Typography variant='h6'
                        sx={{
                            fontFamily:'montserrat',
                            fontWeight:'bold',
                            marginBottom:'20px',
                        }}
                        >
                            Rank : 
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant='h5' sx={{fontFamily:'montserrat'}}>
                            {coin?.market_cap_rank}
                        </Typography>
                    </Box>
                    {/* price span */}
                    <Box sx={{display:'flex'
                }}>
                        <Typography variant='h6'
                        sx={{
                            fontFamily:'montserrat',
                            fontWeight:'bold',
                            marginBottom:'20px',
                        }}
                        >
                            Current Price : 
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant='h6' sx={{fontFamily:'montserrat'}}>
                            {symbol}{' '}
                            {numCommas(coin?.market_data.current_price[currency.toLowerCase()])}
                        </Typography>
                    </Box>
                    {/* market cap span */}
                    <span style={{display:'flex'}}>
                        <Typography variant='h6'
                        sx={{
                            fontFamily:'montserrat',
                            fontWeight:'bold',
                            marginBottom:'20px',
                        }}
                        >
                            Market Cap : {' '} 
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant='h6' sx={{fontFamily:'montserrat'}}>
                        {symbol} {' '}
                        {numCommas(coin?.market_data.market_cap[currency.toLowerCase()]
                        .toString()
                        .slice(0 , -6))} M
                        </Typography>
                    </span>
                </Box>
            </Box>
            
            {/* Chart */}
            <CoinInfo coin={coin}/>

        </Container>
    )
}

export default CoinPage;