import {useEffect, useState} from 'react'
import ItemDetail from './ItemDetail'

function ItemDetailContainer() {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getItem = fetch('https://fakestoreapi.com/products/1')

        getItem
            .then((res)=> {
                return res.json()
            })
            .then((item)=>{
                setProduct(item)
                setLoading(false)
                console.log(item)
            })
            .catch((rej)=>{
                console.log(rej)
            })

        /*promesa.then((item)=>{
            setProduct(item)
            setLoding(false)
        })*/
    }, [])

    return (
        <div className='container itemDetailContainer'>
            {
            (loading) ? 'Loading..' : <ItemDetail item={product} />
            }
            
        </div>
    )
}

export default ItemDetailContainer
