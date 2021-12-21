const Gallery = ({galleryData}) => {
    const {numberOfItems, pathImage} = galleryData;
    console.log(numberOfItems, pathImage);
    const items = []
    for (let index = 0; index < numberOfItems; index++) {
        items.push(
            <div className="col">
                <div className="card shadow-sm">
                    <img src={pathImage}/>
                    <div className="card-body">
                    <div className="d-flex justify-content-end align-items-center">
                        <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary"><i className="bi-heart"/></button>
                        <button type="button" className="btn btn-sm btn-outline-secondary"><i className="bi-cart"/></button>
                        <button type="button" className="btn btn-sm btn-outline-secondary"><i className="bi-share"/></button>
                        </div>
                    </div>
                    </div>
                </div>
            </div> 
        )
    }
    return (
        <>
        {items}
        </>
    )
    /*
    return (
        <>
        {
            for (let index = 0; index < numberOfItems; index++) {
                return <div className="col">
                    <div className="card shadow-sm">
                        <img src={pathImage}/>
                        <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary"><i className="bi-heart"/></button>
                            <button type="button" className="btn btn-sm btn-outline-secondary"><i className="bi-cart"/></button>
                            <button type="button" className="btn btn-sm btn-outline-secondary"><i className="bi-share"/></button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>                
            }
            
        }
        </>
        
    )
    */
}

export default Gallery
