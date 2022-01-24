import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import ButtonBack from './ButtonBack'
import Spinner from "./Spinner"
import { db } from "./Firebase"
import { collection , getDocs , Timestamp } from "firebase/firestore"
//import {toastInfo} from '../util/ToastSettings'

function OrderList() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const orderCollection = collection(db, "orders")
        const getData = getDocs(orderCollection)
        
        getData
        .then((res) => {
            setOrders(res.docs.map(doc=>({id: doc.id, ...doc.data()})))
            console.log(orders, orders.length)
            setLoading(false)
        })
    }, [])

    const removeItem = itemId =>{
        //dispatch({type:'removeItem', idToRemove:itemId})
    }

    return (
        <div className="carroPage">
            {(loading) ? <Spinner/> :
            orders.length == 0 ? <div className="cartEmpty">
                                        <div className='header'><i className="bi-cart-x"></i></div>
                                        <p>
                                            <div>
                                                <h4>No hay ordernes generadas</h4>
                                                <Link as="button" to={"/"} className='btn btn-success'>Seguir comprando</Link>
                                            </div>
                                        </p>

                                    </div>
             : 
            <div className="container padding-bottom-3x mb-1">
                <div className="table-responsive shopping-cart">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-center">Fecha</th>
                                <th className="text-center">Cantidad de Items</th>
                                <th className="text-center">Precio</th>
                                <th className="text-center"><button className="btn btn-sm btn-outline-danger" onClick={removeItem}>Borrar</button></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            orders.map((e, k) => {
                                console.log(e)
                                const createdAt = new Timestamp(e.created_at.seconds, e.created_at.nanoseconds)
                                //let dateString = createdAt.toDate()
                                return (
                                    <tr key={k}>
                                        <td className="text-center">
                                            { 

                                            (createdAt.toDate()).toLocaleString()
                                            }
                                        </td>
                                        <td className="text-center">
                                            <div className="count-input">{(e.itemList).length}</div>
                                        </td>
                                        <td className="text-center text-lg text-medium">${e.itemsTotalPrice}</td>
                                        <td className="text-center">
                                            <a className="remove-from-cart" href="#" onClick={removeItem.bind(this, e.id)} data-toggle="tooltip" title="" data-original-title="Borrar item"><i className="bi-trash"></i></a>
                                            <a className="detail-from-cart" href="#" onClick={removeItem.bind(this, e.id)} data-toggle="tooltip" title="" data-original-title="Ver"><i className="bi-arrow-right-square"></i></a>
                                        </td>
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="shopping-cart-footer">
                    <ButtonBack/>
                    
                </div>
            </div>
        }
        </div>
    )
}

export default OrderList
