import {Link} from 'react-router-dom'
import {useEffect, useState, useContext} from 'react'
import ButtonBack from '../../util/ButtonBack'
import Spinner from "../../util/Spinner"
import { db } from "../../util/Firebase"
import { collection , getDocs, where, query, Timestamp } from "firebase/firestore"
import {toastError} from '../../util/ToastSettings'
import {userContext} from '../User/UserContext'

function OrderList() {
    const {userState} = useContext(userContext)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const orderCollection = collection(db, "orders")
        const documentRef = query(orderCollection, where('user.email', '==', userState.email))
        const getData = getDocs(documentRef)
        
        getData
        .then((res) => {
            setOrders(res.docs.map(doc=>({id: doc.id, ...doc.data()})))
            setLoading(false)
        })
        .catch(error=>{
            toastError('Orderlist: Error en obtener informacion de la base: ' + error)
        })
        
    }, [])

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
                                <th className="text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            orders.map((e, k) => {
                                const createdAt = new Timestamp(e.created_at.seconds, e.created_at.nanoseconds)
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
