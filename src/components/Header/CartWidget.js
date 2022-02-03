import { useContext } from 'react'
import { cartContext } from '../Cart/CartContext'

function CartWidget() {
  const {cartState} = useContext(cartContext)

  return (
      <>
        <i className="bi-cart "/>&nbsp;Carro&nbsp;{cartState.itemsCount > 0 ? <span className="badge">{cartState.itemsCount} </span> : null}
      </>
  )
}

export default CartWidget
