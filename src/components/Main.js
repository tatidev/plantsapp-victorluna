import ItemListContainer from './ItemListContainer'
import ItemDetailContainer from './ItemDetailContainer'
import {Routes, Route} from 'react-router-dom'

const Main = () => {
    return (
        <main>
            <section className="py-5 text-center container">
                <div className="row">
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

            <div className="album">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<ItemListContainer/>}/>
                        <Route path="/category/:id" element={<ItemListContainer/>}/>
                        <Route path="/item/:id" element={<ItemDetailContainer/>}/>
                    </Routes>
                </div>
            </div>
        </main>
    )
}

export default Main