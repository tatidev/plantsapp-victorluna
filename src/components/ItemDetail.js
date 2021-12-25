function ItemDetail({item}) {
    return (
        <div className="row">
            <div className="col-sm-4 item-photo">
                <img src={item.image} width="100%"/>
            </div>
            <div className="col-sm-6">
                <h3>{item.title}</h3>
                <h5>{item.category}</h5>
                <p>{item.description}</p>

                <h6>Precio ${item.price}</h6>
                <div className="section" >
                    <h6 className="title-attr"><small>CANTIDAD</small></h6>                    
                    <div>
                        <div className="btn-minus-plus"><span className="bi-dash"></span></div>
                        <input value="1" />
                        <div className="btn-minus-plus"><span className="bi-plus"></span></div>
                    </div>
                </div>                
    
                <div className="section" >
                    <button className="btn btn-success"><span  className="bi-shopping-cart" aria-hidden="true"></span> Agregar al carro</button>
                </div>        
            </div>
        </div>
    )
}

export default ItemDetail
