import { useState, useEffect } from "react"
import ItemCount from "./ItemCount"
import ItemList from "./ItemList"


function ItemListContainer({greeting}) {
    const productList = [
        {id : 1, title : 'Producto 1', description : 'Descripcion de producto 1', price : 121, pictureUrl : 'https://placeimg.com/320/240/nature'},
        {id : 2, title : 'Producto 2', description : 'Descripcion de producto 2', price : 122, pictureUrl : 'https://placeimg.com/320/240/any'},
        {id : 3, title : 'Producto 3', description : 'Descripcion de producto 3', price : 123, pictureUrl : 'https://placeimg.com/320/240/sepia'},
        {id : 4, title : 'Producto 4', description : 'Descripcion de producto 4', price : 124, pictureUrl : 'https://placeimg.com/320/240/tech'},
        {id : 5, title : 'Producto 5', description : 'Descripcion de producto 5', price : 125, pictureUrl : 'https://placeimg.com/320/240/architecture'},
        {id : 6, title : 'Producto 6', description : 'Descripcion de producto 6', price : 126, pictureUrl : 'https://placeimg.com/320/240/animals'},
        {id : 7, title : 'Producto 7', description : 'Descripcion de producto 7', price : 127, pictureUrl : 'https://placeimg.com/320/240/nature'},
    ]
    const [products, setProducts] = useState([])
    const [loading, setLoding] = useState(true)

    useEffect(() => {
        const promesa = new Promise((res, rej)=>{
            setTimeout(()=>{
                res(productList) //cambia el estado a fullfilled
            }, 2000)
        })
        promesa.then((products)=>{
            setProducts(products)
            setLoding(false)
        })

    }, [])
    return (
        <div className="album">
            <div className="container">
            {(loading) ? 'Loading..' : 
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <ItemList items={products}/>
                </div>
            }
            </div>
        </div>
    )
}

export default ItemListContainer
