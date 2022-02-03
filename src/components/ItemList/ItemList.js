import Item from './Item'

const ItemList = ({items}) => {
    return (
        <>
          {
              items.map((element, indice) =>{
                    return <Item key={element.id} item={element}/>
              })
          }  
        </>
  )
}

export default ItemList
