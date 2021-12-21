import Item from './Item'

const ItemList = ({items}) => {
    return (
        <>
          {
              items.map((element, indice) =>{
                    return <Item key={element.id} items={element}/>
              })
          }  
        </>
  )
}

export default ItemList
