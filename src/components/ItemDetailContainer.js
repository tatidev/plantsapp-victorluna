import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import ItemDetail from './ItemDetail'
import Spinner from "./Spinner"
import { db } from "./Firebase"
import { collection , getDoc, doc } from "firebase/firestore"

function ItemDetailContainer() {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const {id} = useParams()
    
    useEffect(() => {
        const coleccionProductos = collection(db, 'products')
        const documentRef = doc(coleccionProductos, id)
        const getItem = getDoc(documentRef)
        getItem
            .then((item)=>{
                setProduct({id: item.id, ...item.data()})
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
