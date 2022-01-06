import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import ItemList from "./ItemList"
import CategoriesContainer from "./CategoriesContainer"


function ItemListContainer({greeting}) {
   
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const {id} = useParams()

    useEffect(() => {
        
        const getData = fetch('https://61c3d77ff1af4a0017d990bb.mockapi.io/API/v1/product')

        getData
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            let resp
            if(id){
                resp = res.filter((product) => product.idCategory == id)
            }else{
                resp = res
            }
            setProducts(resp)
            setLoading(false)
        })
    }, [id])

    
    return (
        <>
        <CategoriesContainer/>
            <div className="album">
                <div className="container itemListContainer">
                {(loading) ? 'Loading..' : 
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
