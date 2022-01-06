import Categories from './Categories';
import { useEffect, useState} from 'react'

function CategoriesContainer() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = fetch('https://61c3d77ff1af4a0017d990bb.mockapi.io/API/v1/categories')
        
        getData
        .then(res => {
            return res.json()
        })
        .then(res => {
            setCategories(res)
            setLoading(false)
        })

    }, [])
    return (
        <header>
            <section className="py-5 text-center container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 mx-auto">
                        <p>
                            {(loading) ? 'Cargando categorías..' : <Categories links={categories} />}
                        </p>
                    </div>
                </div>
            </section>
        </header>
    )
}

export default CategoriesContainer
