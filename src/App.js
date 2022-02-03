import NavBar from './components/Header/NavBar';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import CartProvider from './components/Cart/CartContext';
import {ToastContainer, Flip} from 'react-toastify'
import FavProvider from './components/Favorites/FavContext';
import UserProvider from './components/User/UserContext';

function App(){
    return (
        <UserProvider>
        <CartProvider>
        <FavProvider>
            <ToastContainer transition={Flip}/>
            <BrowserRouter>
                <NavBar/>
                <Main/>
            </BrowserRouter>
        </FavProvider>
        </CartProvider>
        </UserProvider>
    );
}

export default App;