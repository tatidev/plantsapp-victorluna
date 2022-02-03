import { useContext, useState} from 'react'
import { cartContext } from './CartContext'
import OrderForm from './OrderForm'

function Order() {
    const {cartState} = useContext(cartContext)
    const {itemsTotalPrice, itemList, itemsCount, costoEnvio} = cartState
    
    return (
            <div className="row order">
                <div className="col-md-4 order-md-2 mb-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">Tu carrito</span>
                        <span className="badge badge-secondary badge-pill">{itemsCount}</span>
                    </h4>
                    <hr className="mb-4"/>
                    <ul className="list-group mb-3">
                        {
                            itemList.map((e, k) => {
                                return (
                                    <li key={k} className="list-group-item d-flex justify-content-between lh-condensed">
                                        <div>
                                            <h6 className="my-0">{e.name}</h6>
                                            <small className="text-muted">Cantidad: {e.cantidad}</small>
                                        </div>
                                        <span className="text-muted">${e.cantidad * e.price}</span>
                                    </li>
                                )
                            })
                        }
                        <li className="list-group-item lh-condensed li-subtotal">
                            <div className="list-group-item-subtotal d-flex justify-content-between">
                                <span>Subtotal</span>
                                <span className="text-muted">${itemsTotalPrice}</span>
                            </div>
                            <div className="list-group-item-subtotal d-flex justify-content-between">
                                <span>Costo de envío</span>
                                <span className="text-muted">${costoEnvio}</span>
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between lh-condensed total">
                            <span>Total</span>
                            <strong>${itemsTotalPrice + costoEnvio}</strong>
                        </li>
                    </ul>
                </div>
                
                <OrderForm itemsTotalPrice={itemsTotalPrice} itemList={itemList} costoEnvio={costoEnvio}/>
            </div>
    )
}

export default Order
