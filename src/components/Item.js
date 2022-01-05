import {Link} from 'react-router-dom'

const Item = ({items}) => {
    return (
        <div className="col" id={items.id}>
            <div className="card shadow-sm">
                <Link to={'item/' + items.id}> <img src={items.pictureUrl} /> </Link>
                <div className="card-body">
                <p className="card-text">{items.title}</p>
                <hr/>
                <p className="card-text">{items.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-secondary"><i className="bi-share"/></button>
                    <button type="button" className="btn btn-sm btn-outline-secondary"><i className="bi-suit-heart"/></button>
                    <button type="button" className="btn btn-sm btn-outline-secondary"><i className="bi-cart"/></button>
                    </div>
                    <small className="text-muted">$ {items.price}</small>
                </div>
                </div>
            </div>
        </div> 

    )
   
}

export default Item
