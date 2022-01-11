import ItemCount from "./ItemCount"
import {Link, useNavigate} from 'react-router-dom'
import {useState, useContext, useEffect} from 'react'
import {cartContext} from "./CartContext"
import $ from 'jquery'

function ItemDetail({item}) {
    const navigate = useNavigate()
    const [showGoToCart, setShowGoToCart] = useState(false)
    const [showIsInCart, setShowIsInCart] = useState(false)
    const {isInCart, dispatch} = useContext(cartContext)

    
    let itemProps = {}
    if((item.follaje).length > 0) itemProps.follaje = item.follaje
    if((item.altura).length > 0) itemProps.altura = item.altura
    if((item.diametro).length > 0) itemProps.diametro = item.diametro
    if((item.distanciaEntrePlantas).length > 0) itemProps.distanciaEntrePlantas = item.distanciaEntrePlantas
    if((item.riego).length > 0) itemProps.riego = item.riego
    if((item.toleranciaFrio).length > 0) itemProps.toleranciaFrio = item.toleranciaFrio

    
    const onAdd = (cantidad)=>{
        if(isInCart(item.id)){
            setShowIsInCart(true)
        }else{
            item.cantidad = cantidad
            dispatch({type: 'addItem', itemsCount: cantidad, itemsPrice: item.price, itemList: item})
            setShowGoToCart(true)
        }
    }

    return (
        <div className="row itemDetail">
            <div className="col-sm-4 item-photo">
                <img src={item.imagenPortada} alt=""/>
            </div>
            <div className="col-sm-6">
                <h3>{item.name}</h3>
                {(item.comentarios).length > 0 ?  <p>{item.comentarios}</p> : ''    }
                <ul>
                    <li><b>Categoría:</b>{item.category}</li>
                    {
                    Object.entries(itemProps).map(([key, value]) =>{
                        return <li key={key}><b>{key}:</b>{value}</li>
                    })
                    }
                    <li><b>stock:</b>{item.stock}</li>
                    <li><b>Precio:</b>{"$" + item.price}</li>
                </ul>
                {showGoToCart ? <Link as="button" className="btn btn-sm btn-success " to="/carro">Ir al carro</Link> : <ItemCount stock={item.stock} initial={1} onAdd={onAdd}/>    }
                {showIsInCart ? <div className="alert alert-danger">El item ya se encuentra en el carro</div>:''}
                <div className="section" >
                    <button className="btn btn-secondary " onClick={()=> navigate(-1)}>Volver</button>
                </div>        
            </div>
        </div>
    )
}

export default ItemDetail
