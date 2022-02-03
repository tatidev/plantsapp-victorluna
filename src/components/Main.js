import Cart from './Cart/Cart'
import ItemListContainer from './ItemList/ItemListContainer'
import ItemDetailContainer from './ItemDetail/ItemDetailContainer'
import Favoritos from './Favorites/Favoritos'
import Order from './Cart/Order'
import UserForm from './User/UserForm'
import LoginForm from './User/LoginForm'
import OrderList from './Cart/OrderList'
import {Routes, Route} from 'react-router-dom'

const Main = () => {
    return (
        <main>
            <div className="album">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<ItemListContainer/>}/>
                        <Route path="/category/:id" element={<ItemListContainer/>}/>
                        <Route path="/item/:id" element={<ItemDetailContainer/>}/>
                        <Route path="/carro" element={<Cart/>}/>
                        <Route path="/fav" element={<Favoritos/>}/>
                        <Route path="/order" element={<Order/>}/>
                        <Route path="/userForm" element={<UserForm/>}/>
                        <Route path="/orderList" element={<OrderList/>}/>
                        <Route path="/loginForm" element={<LoginForm/>}/>
                    </Routes>
                </div>
            </div>
        </main>
    )
}

export default Main