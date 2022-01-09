import {useNavigate} from 'react-router-dom'

function Carro() {
    const navigate = useNavigate()
    return (
        <div>
            Carro
            <div className="section" >
                <button className="btn btn-secondary " onClick={()=> navigate(-1)}>Volver</button>
            </div>   
        </div>
    )
}

export default Carro
