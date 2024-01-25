import { AppBar, Container, MenuItem, Select,
    ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';

const Header = () => {
    const darkTheme = createTheme({
        palette: {
            primary:{
                main:'#fff'
            },
            mode: 'dark',
            },
        });

    const navigate = useNavigate()

    const {currency, setCurrency} = CryptoState();
    console.log(currency)

    return (
        <ThemeProvider theme={darkTheme}>
        <AppBar color='transparent' position='static'>
            <Container>
                <Toolbar>
                    <Typography
                    onClick={() => navigate('/')}
                    sx={{
                        flex : 1,
                        color: 'gold',
                        fontFamily: 'montserrat',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                    }}
                    >
                        Crypto Hero
                    </Typography>
                    <Select variant='outlined'
                    value={currency}
                    onChange={(e)=> setCurrency(e.target.value)}
                    style={{
                        width: 100,
                        height:40,
                        marginRight:15,
                    }}>
                        <MenuItem value={'USD'}>USD</MenuItem>
                        <MenuItem value={'EUR'}>EUR</MenuItem>
                        <MenuItem value={'INR'}>INR</MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
        </ThemeProvider>
    )
}

export default Header