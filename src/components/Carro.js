import {useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import { cartContext } from './CartContext'

function Carro() {
    const navigate = useNavigate()
    const {cartState} = useContext(cartContext)
    const {itemsCount, itemsTotalPrice, itemList} = cartState
    return (
        <div>
            <section>
                <div>Cantidad de items: <span>{itemsCount}</span></div>
                <div>Total Precio de items: <span>${itemsTotalPrice}</span></div>
                <div>
                    <ul>
                    {
                        itemList.map((e, k) => {
                            return (
                                <li>
                                    <ul>
                                        <li>Item id:{e.id}</li>
                                        <li>Nombre:{e.name}</li>
                                        <li>Cantidad:{e.cantidad}</li>
                                        <li>Precio:{e.price}</li>
                                        <li>Subototal:{e.price}</li>
                                    </ul>
                                </li>
                            )
                        })
                    }
                    </ul>
                </div>
            </section>
            <div className="section" >
                <button className="btn btn-secondary " onClick={()=> navigate(-1)}>Volver</button>
            </div>   
        </div>
    )
}

export default Carro
