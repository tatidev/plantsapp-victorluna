import NavBar from './components/NavBar';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import CartProvider from './components/CartContext';
import {ToastContainer, Flip} from 'react-toastify'
import FavProvider from './components/FavContext';

function App(){
    return (
        <CartProvider>
        <FavProvider>
            <ToastContainer
            transition={Flip}/>
            <BrowserRouter>
                <NavBar/>
                <Main/>
            </BrowserRouter>
        </FavProvider>
        </CartProvider>
    );
}

export default App;