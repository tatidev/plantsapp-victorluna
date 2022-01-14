import ItemCount from "./ItemCount"
import {Link, useNavigate} from 'react-router-dom'
import {useState, useContext} from 'react'
import {cartContext} from "./CartContext"
import ButtonBack from './ButtonBack'

function ItemDetail({item}) {
    const navigate = useNavigate()
    const {dispatch, cartState} = useContext(cartContext)
    let itemProps = {}
    let initial = 0

    let itemInCart = cartState.itemList.find(e => e.id == item.id)
    if(itemInCart != undefined) initial = itemInCart.cantidad
    
    if((item.follaje).length > 0) itemProps.follaje = item.follaje
    if((item.altura).length > 0) itemProps.altura = item.altura
    if((item.diametro).length > 0) itemProps.diametro = item.diametro
    if((item.distanciaEntrePlantas).length > 0) itemProps.distanciaEntrePlantas = item.distanciaEntrePlantas
    if((item.riego).length > 0) itemProps.riego = item.riego
    if((item.toleranciaFrio).length > 0) itemProps.toleranciaFrio = item.toleranciaFrio
    
    const onAdd = (cantidad)=>{
        if(cantidad > 0){
            item.cantidad = cantidad
            dispatch({type: 'addItem', item: item})
        }else{
            dispatch({type: 'removeItem', idToRemove: item.id})
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
                
                <ItemCount stock={item.stock} initial={initial} onAdd={onAdd}/>
                <ButtonBack/>
            </div>
        </div>
    )
}

export default ItemDetail
