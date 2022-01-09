import ItemCount from "./ItemCount"
import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'


function ItemDetail({item}) {
    const navigate = useNavigate()
    const [contadorCarro, setContadorCarro] = useState(null)
    const [showGoToCart, setShowGoToCart] = useState(false)

    let itemProps = {}
    if((item.follaje).length > 0) itemProps.follaje = item.follaje
    if((item.altura).length > 0) itemProps.altura = item.altura
    if((item.diametro).length > 0) itemProps.diametro = item.diametro
    if((item.distanciaEntrePlantas).length > 0) itemProps.distanciaEntrePlantas = item.distanciaEntrePlantas
    if((item.riego).length > 0) itemProps.riego = item.riego
    if((item.toleranciaFrio).length > 0) itemProps.toleranciaFrio = item.toleranciaFrio

    
    const onAdd = (cantidad)=>{
        setContadorCarro(cantidad)
        setShowGoToCart(true)
    }

    return (
        <div className="row itemDetail">
            <div className="col-sm-4 item-photo">
                <img alt="" src={item.imagenPortada} />
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
                <div className="section" >
                    <button className="btn btn-secondary " onClick={()=> navigate(-1)}>Volver</button>
                </div>        
            </div>
        </div>
    )
}

export default ItemDetail
