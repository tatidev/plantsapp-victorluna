import Gallery from "./Gallery"

const Main = ({galleryData}) => {
    return (
        <main>
        <section className="py-5 text-center container">
            <div className="row py-lg-5">
            <div className="col-lg-9 col-md-8 mx-auto">
                <h1 className="fw-light">Muestra Photo</h1>
                <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
                <p>
                <button type="button" className="btn btn-outline-primary btn-sm">Compartir</button>
                <button type="button" className="btn btn-outline-primary btn-sm">Comparar fotos</button>
                <button type="button" className="btn btn-outline-primary btn-sm">Presentacion</button>
                <button type="button" className="btn btn-outline-primary btn-sm">Comprar paquete</button>
                <button type="button" className="btn btn-outline-primary btn-sm">Comprar todo</button>
                </p>
            </div>
            </div>
        </section>

        <div className="album py-5">
            <div className="container">

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                <Gallery galleryData={galleryData}/>
            </div>
            </div>
        </div>

        </main>
    )
}

export default Main