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
        <div className="col">
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="d-flex justify-content-center align-items-center">
                        <button type="button" onClick={disminuirContador} className="btn btn-sm btn-outline-secondary"><i className="bi-bag-dash"/></button>
                        <div><input type="text" readOnly value={contador}/></div>
                        <button type="button" onClick={aumentarContador} className="btn btn-sm btn-outline-secondary"><i className="bi-bag-plus"/></button>
                    </div>
                    
                </div>
            </div>
        </div> 
    )
}

export default ItemCount
