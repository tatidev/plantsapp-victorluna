import {Link} from 'react-router-dom'
import { useContext, useState} from 'react'
import { cartContext } from './CartContext'
import ButtonBack from '../../util/ButtonBack'

function Cart() {
    const {cartState, dispatch} = useContext(cartContext)
    const {itemsTotalPrice, itemList} = cartState
    
    const removeItem = itemId =>{
        dispatch({type:'removeItem', idToRemove:itemId})
    }

    const clearCart = () => {
        dispatch({type:'clear'})
    }

    return (
        <div className="carroPage">
            {itemsTotalPrice == 0 ? <div className="empty">
                                        <div className='header'><i className="bi-cart-x"></i></div>
                                        
                                            <div>
                                                <h4>No hay productos en el carro</h4>
                                                <Link as="button" to={"/"} className='btn btn-success'>Seguir comprando</Link>
                                            </div>
                                        

                                    </div>
             : 
            <div className="container padding-bottom-3x mb-1">
                <div className="table-responsive shopping-cart">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th className="text-center">Cantidad</th>
                                <th className="text-center">Precio</th>
                                <th className="text-center">Subtotal</th>
                                <th className="text-center"><button className="btn btn-sm btn-outline-danger" onClick={clearCart}>Vaciar Carro</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            itemList.map((e, k) => {
                                return (
                                    <tr key={k}>
                                        <td>
                                            <div className="product-item">
                                                <Link to={'/item/' + e.id} className="product-thumb"><img src={e.imagenPortada} width="110px" height="90px"  alt="Product"/></Link>
                                                <div className="product-info">
                                                    <h4 className="product-title">
                                                        <Link to={'/item/' + e.id}>{e.name}</Link>
                                                    </h4>
                                                    <span><em>Categoria:</em> {e.category}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="count-input">{e.cantidad}</div>
                                        </td>
                                        <td className="text-center text-lg text-medium">${e.price}</td>
                                        <td className="text-center text-lg text-medium">${e.cantidad * e.price}</td>
                                        <td className="text-center"><a className="remove-from-cart" href="#" onClick={removeItem.bind(this, e.id)} data-toggle="tooltip" title="" data-original-title="Remove item"><i className="bi-trash"></i></a></td>
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="shopping-cart-footer">
                    <div className="column">
                    </div>
                    <div className="column text-lg">Total: <span className="text-medium">${itemsTotalPrice}</span></div>
                </div>
                <div className="shopping-cart-footer">
                    <ButtonBack/>
                    <div className="column">
                    <Link as="button" to={"/Order"} className='btn btn-sm btn-success'>Iniciar Compra</Link>
                    </div>
                </div>
            </div>
        }
        </div>
    )
}

export default Cart
