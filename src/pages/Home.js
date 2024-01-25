import React from 'react'
import Banner from '../components/banner/Banner'
import CoinsTable from '../components/CoinsTable'

const Home = () => {
    return (
        <> 
        {/* my home contaians {banner, table of coins} */}
            
            <Banner/>
            <CoinsTable/>
        </>
    )
}

export default Home