import Categories from './Categories';
import { useEffect, useState} from 'react'
import { db } from "../../util/Firebase"
import { collection , getDocs} from "firebase/firestore"

function CategoriesContainer() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const categoriesCollection = collection(db, "category")
        const getData = getDocs(categoriesCollection)
        
        getData
        .then((res) => {
            setCategories(res.docs.map(doc=>({id: doc.id, ...doc.data()})))
            setLoading(false)
        })


    }, [])
    return (
        <header>
            <section className="py-5 text-center container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 mx-auto">
                        <p>
                            {(loading) ? '' : <Categories links={categories} />}
                        </p>
                    </div>
                </div>
            </section>
        </header>
    )
}

export default CategoriesContainer
