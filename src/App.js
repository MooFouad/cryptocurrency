import { Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CoinPage from './pages/CoinPage';
import Layout from './Layout';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='/coins/:id' element={<CoinPage/>}/>
        </Route>
      </Routes>   
  );
}

export default App;

