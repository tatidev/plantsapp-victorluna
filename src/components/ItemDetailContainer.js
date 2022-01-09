import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import ItemDetail from './ItemDetail'
import Spinner from "./Spinner"

function ItemDetailContainer() {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const {id} = useParams()
    
    useEffect(() => {
        const getItem = fetch('https://61c3d77ff1af4a0017d990bb.mockapi.io/API/v1/product/'+id)
        getItem
            .then((res)=> {
                return res.json()
            })
            .then((item)=>{
                setProduct(item)
                setLoading(false)
            })
            .catch((rej)=>{
                console.log(rej)
            })
    }, [id])

    return (
        <div className='container itemDetailContainer'>
            {
            (loading) ? <Spinner/> : <ItemDetail item={product} />
            }
        </div>
    )
}

export default ItemDetailContainer
