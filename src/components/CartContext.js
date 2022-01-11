import { createContext, useReducer } from "react";

export const cartContext = createContext(null)

const {Provider} = cartContext

const cartInitialState = {
    itemsCount: 0,
    itemsTotalPrice: 0,
    itemList: []
}



const cartReducer = (state, action) => {
    switch (action.type){
        case 'addItem': {
           // if(!isInCart(state.itemList, action.itemList.id))
                return {...state, itemsCount: state.itemsCount + action.itemList.cantidad, itemsTotalPrice: state.itemsTotalPrice + (action.itemList.cantidad * action.itemsPrice), itemList: [...state.itemList, action.itemList]}
            //else 
              //  return {...state}
        }
        case 'removeItem' : {
            let newItemList = (state.itemList).filter(item=>item.id != action.idToRemove)
            return {...state, itemsCount: state.itemsCount - action.itemList.cantidad, itemsTotalPrice: state.itemsTotalPrice - (action.itemList.cantidad * action.itemsPrice), itemList: newItemList}
        }
        case 'clear': {
            return {...state, itemsCount: 0, itemsTotalPrice: 0, itemList: []}
        }
        default: {
            return state
        }
    }
}

const CartProvider = ({children}) => {
    const [cartState, dispatch] = useReducer(cartReducer, cartInitialState)

    const isInCart = (itemId) => {
        return (cartState.itemList).some(o => o.id === itemId)
    }

    const contextValue = {
        cartState,
        dispatch,
        isInCart
    }

    return (
        <Provider value={contextValue}>
            {children}
        </Provider>
    )

}
export default CartProvider