import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { favContext } from './FavContext'
import ButtonBack from './ButtonBack'

function Favoritos() {
    const {favState, dispatchFav} = useContext(favContext)
    const {itemList} = favState

    const removeItem = itemId =>{
        dispatchFav({type:'removeItem', idToRemove:itemId})
    }

    const clearFav = () => {
        dispatchFav({type:'clear'})
    }

    return (
        <div className="carroPage">
            {itemList.length == 0 ? <div className="cartEmpty">
                                        <div className='header'><i className="bi-heart"></i></div>
                                        <p>
                                            <h4>No hay productos favoritos</h4>
                                            <Link as="button" to={"/"} className='btn btn-success'>Seguir navegando</Link>
                                        </p>

                                    </div>
             : 
            <div className="container padding-bottom-3x mb-1">
                <div className="table-responsive shopping-cart">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th className="text-center"><button className="btn btn-sm btn-outline-danger" onClick={clearFav}>Vaciar Favoritos</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            itemList.map((e, k) => {
                                return (
                                    <tr>
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
                                        <td className="text-center"><a className="remove-from-cart" href="#" onClick={removeItem.bind(this, e.id)} data-toggle="tooltip" title="" data-original-title="Remove item"><i className="bi-trash"></i></a></td>
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

export default Favoritos
