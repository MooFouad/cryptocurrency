import { Box, useTheme } from '@mui/material'
import React from 'react'

const SelectBtn = ({children, selected, onClick}) => {
    const theme = useTheme()
    return (
        <Box onClick={onClick}
            sx={{
                border:'1px solid gold',
                borderRadius:'5px',
                padding:'10px 20px',
                fontFamily:'montserrat',
                cursor:'pointer',
                backgroundColor : selected ? 'gold' : '',
                color: selected ? 'black' : '',
                fontWeight: selected ? '700' : '500',
                width:'120px',
                justifyContent:'center',
                "&:hover":{
                    background:'gold',
                    color:'black',
                    transition:'all .3s'
                },
                [theme.breakpoints.down('md')]:{
                    margin:'10px 5px'
                }
            }}
        >
            {children}
        </Box>
    )
}

export default SelectBtn