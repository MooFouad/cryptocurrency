import { Container, Typography } from '@mui/material'
import React from 'react'
import bannerImg from './banner2.jpg'
import Carousel from './Carousel'

const Banner = () => {
    return (
        <div style={{backgroundImage: `url(${bannerImg})`}}>
            <Container
            sx={{
                height: '400px',
                display:'flex',
                flexDirection:'column',
                paddingTop:'25px',
                justifyContent:'space-around'
            }}>
                <div 
                style={{
                    height:'40%',
                    display:'flex',
                    justifyContent:'center',
                    textAlign:'center',
                    flexDirection:'column'
                }}
                >
                    <Typography variant='h2'
                    sx={{
                        fontWeight:'bold',
                        marginBottom:'15px',
                        fontFamily:'montserrat',
                    }}
                    >
                        Crypto Hero
                    </Typography>
                    <Typography variant='subtitle2'
                    sx={{
                        color:'darkgray',
                        textTransform:'capitalize',
                        fontFamily:'montserrat',
                    }}
                    >
                        Get all the Info regarding your favorite Crypto Currency
                    </Typography>
                </div>
                <Carousel/>
            </Container>
        </div>
    )
}

export default Banner