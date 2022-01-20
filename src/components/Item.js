import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { cartContext } from './CartContext'
import { favContext } from './FavContext'
import {toast} from 'react-toastify'

const Item = ({item}) => {
    const {cartState, dispatch} = useContext(cartContext)
    const {favState, dispatchFav} = useContext(favContext)

    const isInFav = (favState.itemList).some(o => o.id === item.id)
    
    const isInCart = (cartState.itemList).some(o => o.id === item.id)

    const addToCart = itemId =>{
        item.cantidad = 1
        dispatch({type: 'addItem', item: item})
        toast.info('Producto agregado al carro', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

    const addToFav = itemId =>{
        dispatchFav({type: 'addItem', item: item})
        toast.info('Producto agregado como favorito', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

    return (
        <div className="col" id={item.id}>
            <div className="card shadow-sm">
                <div className="img">
                    <Link to={'/item/' + item.id}> <img src={item.imagenPortada} alt=""/> </Link>
                </div>
                <div className="card-body">
                    <div>
                        <p className="card-text">{item.name}</p>
                        <div className="d-flex justify-content-between align-item-center">
                            <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary"><i className="bi-share"/></button>
                            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={addToFav.bind(this, item)}><i className={isInFav ? "bi-suit-heart-fill" : "bi-suit-heart"}/></button>
                            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={addToCart.bind(this, item)}><i className={isInCart ? "bi-cart-fill" : "bi-cart"}/></button>
                            </div>
                            <small className="text-muted">$ {item.price}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div> 

    )
   
}

export default Item
