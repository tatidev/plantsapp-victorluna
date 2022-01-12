import {useState} from "react"

function ItemCount({stock, initial, onAdd}) {
    const [contador, setcontador] = useState(initial)

    const aumentarContador = ()=>{
        if(contador < stock) setcontador(contador + 1)
    }
    const disminuirContador = () => {
        if(contador > 0) setcontador(contador - 1)
    }

    return (
        <div className="section itemCount" >
            <h6 className="title-attr"><small>CANTIDAD</small></h6>                    
            <div>
                <div className="btn-minus-plus" onClick={disminuirContador}><span className="bi-dash"></span></div>
                <input type="text" readOnly value={contador} />
                <div className="btn-minus-plus" onClick={aumentarContador}><span className="bi-plus"></span></div>
                <button className="btn btn-sm btn-success" onClick={()=>{onAdd(contador)}}><span  className="bi-shopping-cart" aria-hidden="true"></span>{initial == 0 ? 'Agregar al ' : 'modificar '} carro</button>
            </div>
        </div>  

    )
}

export default ItemCount
