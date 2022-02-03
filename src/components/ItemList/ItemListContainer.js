import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import ItemList from "./ItemList"
import CategoriesContainer from "./CategoriesContainer"
import Spinner from "../../util/Spinner"
import { db } from "../../util/Firebase"
import { collection , getDocs , query, where } from "firebase/firestore"

function ItemListContainer({greeting}) {
   
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const {id} = useParams()

    useEffect(() => {
        const productCollection = collection(db, "products")
        const q = id===undefined ? productCollection : query(productCollection, where("idCategory", "==", parseInt(id)))
        const getData = getDocs(q)
        
        getData
        .then((res) => {
            setProducts(res.docs.map(doc=>({id: doc.id, ...doc.data()})))
            setLoading(false)
        })
    }, [id])


    return (
        <>
        <CategoriesContainer/>
            <div className="album">
                <div className="container itemListContainer">
                {(loading) ? <Spinner/> : 
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <ItemList items={products}/>
                    </div>
                }
                </div>
            </div>
        </>
    )
}

export default ItemListContainer
