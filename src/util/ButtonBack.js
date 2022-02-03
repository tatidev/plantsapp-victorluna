import {useNavigate} from 'react-router-dom'
function ButtonBack() {
    const navigate = useNavigate()
    return (
        <div className="section" >
            <button className="btn btn-sm btn-secondary " onClick={()=> navigate(-1)}><i className="bi-arrow-bar-left "/>&nbsp;Volver</button>
        </div> 
    )
}

export default ButtonBack
