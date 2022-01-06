import ItemCount from "./ItemCount"
import {useNavigate} from 'react-router-dom'

function ItemDetail({item}) {
    const navigate = useNavigate()
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
                    { (item.follaje).length > 0 ?  <li><b>Follaje:</b>{item.follaje}</li> : ''}
                    {(item.asolamiento).length > 0 ?  <li><b>Asolamiento:</b>{item.asolamiento}</li> : ''    }
                    {(item.altura).length > 0 ?  <li><b>Altura:</b>{item.altura}</li> : ''    }
                    {(item.diametro).length > 0 ?  <li><b>Diametro:</b>{item.diametro}</li> : ''    }
                    {(item.distanciaEntrePlantas).length > 0 ?  <li><b>Distancia entre plantas:</b>{item.distanciaEntrePlantas}</li> : ''    }
                    {(item.riego).length > 0 ?  <li><b>riego:</b>{item.riego}</li> : ''    }
                    {(item.toleranciaFrio).length > 0 ?  <li><b>tolerancia al frío:</b>{item.toleranciaFrio}</li> : ''    }
                    <li><b>stock:</b>{item.stock}</li>
                    <li><b>Precio:</b>{"$" + item.price}</li>
                </ul>
                <ItemCount stock={item.stock} initial={1}/>    
                <div className="section" >
                    <button className="btn btn-success"><span  className="bi-shopping-cart" aria-hidden="true"></span> Agregar al carro</button>
                    <button className="btn btn-secondary " onClick={()=> navigate(-1)}>Volver</button>
                </div>        
            </div>
        </div>
    )
}

export default ItemDetail
