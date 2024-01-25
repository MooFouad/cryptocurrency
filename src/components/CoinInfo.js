import React, { useState, useEffect } from 'react'
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { Box, CircularProgress, ThemeProvider, createTheme, useTheme } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { chartDays } from './../config/data';
import SelectBtn from './SelectBtn';

const CoinInfo = ({coin}) => {
    const {currency, symbol} = CryptoState();
    const [historicalData, setHistoricalData] = useState();
    const [days, setDays] = useState(1);
    // fetch api
    const fetchHistoricalData = async ()=>{
        try{
            const res = await fetch(HistoricalChart(coin.id, days, currency));
            const data = await res.json();
            setHistoricalData(data.prices);
        }catch(error){
            console.log(error)
        }
            
    }
    console.log(historicalData)
    useEffect(() => {
        fetchHistoricalData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, days])

    const darkTheme = createTheme({
        palette: {
            primary:{
                main:'#fff'
            },
            mode: 'dark',
            },
        });

        const theme = useTheme()
    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{
                width:'80%',
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'center',
                marginTop:'25px',
                padding:'40px',
                [theme.breakpoints.down('md')]:{
                    width:'100%',
                    marginTop:'0',
                    padding:'20px',
                    paddingTop:'0',
                }
            }}>
                {
                    !historicalData ?(
                        <CircularProgress
                            sx={{color:'gold'}}
                            size={250}
                            thickness={1}
                        />
                    ) : (
                        <>
                        <Line
                            data={{
                                labels: historicalData.map((coin) => {
                                let date = new Date(coin[0]);
                                let time =
                                    date.getHours() > 12
                                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                    : `${date.getHours()}:${date.getMinutes()} AM`;
                                return days === 1 ? time : date.toLocaleDateString();
                                }),

                                datasets: [
                                {
                                    data: historicalData.map((coin) => coin[1]),
                                    label: `Price ( Past ${days} Days ) in ${currency}`,
                                    borderColor: "#EEBC1D",
                                },
                                ],
                            }}
                            options={{
                                elements: {
                                point: {
                                    radius: 1,
                                },
                                },
                            }}
                        />

                            {/* my btns */}
                            <Box sx={{
                                width:'100%',
                                display:'flex',
                                justifyContent:'space-around',
                                marginTop:'20px',
                                [theme.breakpoints.down('md')]:{
                                    display:'flex',
                                    flexWrap:'wrap'
                                }
                            }}>
                                {chartDays.map((day)=>(
                                    <SelectBtn
                                    key={day.value}
                                    onClick={()=>setDays(day.value)}
                                    selected={day.value === days}
                                    >
                                        {day.label}
                                    </SelectBtn>
                                ))}
                            </Box>

                        </>
                    )
                }
            </Box>
        </ThemeProvider>
    )
}

export default CoinInfo