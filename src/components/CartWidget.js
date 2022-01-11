import { useContext } from 'react'
import { cartContext } from './CartContext'

function CartWidget() {
  const {cartState} = useContext(cartContext)
  
  return (
      <>
        <i className="bi-cart "/>&nbsp;Carro&nbsp;<span className="badge">{cartState.itemsCount}</span>
      </>
  )
}

export default CartWidget
