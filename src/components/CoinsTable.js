import React, { useState, useEffect } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { Container, createTheme, LinearProgress, Pagination, Table,
        TableBody,
        TableCell,
        TableContainer, TableHead, TableRow, TextField, ThemeProvider,
        Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { numCommas } from './banner/Carousel';

const CoinsTable = () => {
    const navigate = useNavigate()
    const darkTheme = createTheme({
        palette: {
            primary:{
                main:'#fff'
            },
            mode: 'dark',
            },
        });

    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [pagenation, setPagenation] = useState(1)

    const {currency, symbol} = CryptoState();

    // fetch api
    const fetchTableCoins = async ()=>{
        try{
            setLoading(true)
            const res = await fetch(CoinList(currency));
            const data = await res.json();
            setCoins(data);
            setLoading(false)
        }catch(error){
            console.log(error)
        }
            
    }

    console.log(coins)

    useEffect(() => {
        fetchTableCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    // search in table coins
    const searchHandeler = ()=>{
        return coins.filter((coin)=>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search) 
        )
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Container sx={{textAlign:'center'}}>
                <Typography variant='h4'
                    sx={{
                        margin:'18px',
                        fontFamily:'montserrat'
                    }}
                >
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField
                    label='Search for a crypto currency..'
                    variant='outlined'
                    onChange={(e)=>setSearch(e.target.value)}
                    sx={{
                        marginBottom:'20px', width:'100%'
                    }}
                />
                <TableContainer>
                    {
                        loading?(
                            <LinearProgress sx={{bgcolor:'gold'}}/>
                        ):(
                            <Table>
                                <TableHead sx={{bgcolor:'gold'}}>
                                    <TableRow>
                                        {['coin', 'price', '24h change', 'market cap'].map((head)=>(
                                            <TableCell
                                                key={head}
                                                align={head === 'coin' ? ' ' : 'right'}
                                                sx={{color:'black', fontWeight:'700',fontFamily:'montserrat'}}
                                            >
                                                {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {searchHandeler()
                                    .slice((pagenation-1)*10, (pagenation-1) * 10 + 10 )
                                    .map((row)=>{
                                        const profit = row.price_change_percentage_24 > 0;
                                        return (
                                            <TableRow
                                            onClick={()=> navigate(`/coins/${row.id}`)}
                                            key={row.name}
                                            sx={{
                                                bgcolor:'#16171a',
                                                cursor:'pointer',
                                                fontFamily:'montserrat',
                                                ":hover":{bgcolor:'#131111'}
                                            }}
                                            >
                                                <TableCell component='th' scope='row'
                                                sx={{display:'flex', gap:'15px'}}
                                                >
                                                    <img src={row?.image} alt={row.name}
                                                    height='50px'
                                                    style={{marginBottom:'10px'}}
                                                    />
                                                    <div style={{display:'flex', flexDirection:'column'}}>
                                                        <span style={{textTransform:'uppercase', fontSize:'22px'}}>
                                                            {row.symbol}
                                                        </span>
                                                        <span style={{color:'darkgray'}}>
                                                            {row.name}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {symbol} {' '}
                                                    {numCommas(row.current_price.toFixed(2))}
                                                </TableCell>
                                                <TableCell align='right' sx={{
                                                    color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                                                    fontWeight:500,
                                                }}>
                                                    {profit && '+'}
                                                    {row.price_change_percentage_24h.toFixed(2)}%
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {symbol} {' '}
                                                    {numCommas(row.market_cap.toString().slice(0 , -6))}
                                                    M
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        )
                    }
                </TableContainer>
                {/* pagenation table */}
                <Pagination
                    count={(searchHandeler()?.length /10 ).toFixed(0)}
                    sx={{
                        padding:'20px',
                        width:'100%',
                        display:'flex',
                        justifyContent:'center',
                    }}
                    onChange={(_, value)=>{
                        setPagenation(value);
                        window.scroll(0, 450)
                    }}
                />
            </Container>
        </ThemeProvider>
    )
}

export default CoinsTable