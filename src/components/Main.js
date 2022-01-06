import ItemListContainer from './ItemListContainer'
import ItemDetailContainer from './ItemDetailContainer'
import {Routes, Route} from 'react-router-dom'

const Main = () => {
    return (
        <main>
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