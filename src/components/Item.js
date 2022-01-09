import {Link} from 'react-router-dom'

const Item = ({item}) => {
    return (
        <div className="col" id={item.id}>
            <div className="card shadow-sm">
                <Link to={'/item/' + item.id}> <img src={item.imagenPortada} alt=""/> </Link>
                <div className="card-body">
                    <div>
                        <p className="card-text">{item.name}</p>
                        <div className="d-flex justify-content-between align-item-center">
                            <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary"><i className="bi-share"/></button>
                            <button type="button" className="btn btn-sm btn-outline-secondary"><i className="bi-suit-heart"/></button>
                            <button type="button" className="btn btn-sm btn-outline-secondary"><i className="bi-cart"/></button>
                            </div>
                            <small className="text-muted">$ {item.price}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div> 

    )
   
}

export default Item
