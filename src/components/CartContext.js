import { createContext, useReducer } from "react";

export const cartContext = createContext(null)

const {Provider} = cartContext

const cartInitialState = {
    itemsCount: 0,
    itemsTotalPrice: 0,
    itemList: []
}

const isInCart = (itemList, itemId) => {
    return (itemList).some(o => o.id === itemId)
}

const cartReducer = (state, action) => {
    switch (action.type){
        case 'addItem': {
            if(isInCart(state.itemList, action.item.id)){
                let itemList = (state.itemList).filter(item=>item.id != action.item.id)
                let newItemList = [...itemList, action.item]

                let cantidad = 0
                let totalPrice = 0
                newItemList.forEach(e => {
                    cantidad += e.cantidad
                    totalPrice += e.cantidad * e.price
                })
                return {...state, itemsCount: cantidad, itemsTotalPrice: totalPrice, itemList: newItemList}
            }else{
                return {...state, itemsCount: state.itemsCount + action.item.cantidad, itemsTotalPrice: state.itemsTotalPrice + (action.item.cantidad * action.item.price), itemList: [...state.itemList, action.item]}
            }
            
        }
        case 'removeItem' : {
            let newItemList = (state.itemList).filter(item=>item.id != action.idToRemove)
            let cantidad = 0
            let totalPrice = 0
            newItemList.forEach(e => {
                cantidad += e.cantidad
                totalPrice += e.cantidad * e.price
            })
            return {...state, itemsCount: cantidad, itemsTotalPrice: totalPrice, itemList: newItemList}
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

    const contextValue = {
        cartState,
        dispatch
    }



    return (
        <Provider value={contextValue}>
            {children}
        </Provider>
    )

}
export default CartProvider