import { createContext, useReducer } from "react";

export const favContext = createContext(null)

const {Provider} = favContext

const favInitialState = {
    itemList: []
}

const isInFav = (itemList, itemId) => {
    return (itemList).some(o => o.id === itemId)
}

const favReducer = (state, action) => {
    switch (action.type){
        case 'addItem': {
            if(!isInFav(state.itemList, action.item.id))
                return {...state, itemList: [...state.itemList, action.item]}
        }
        case 'removeItem' : {
            let newItemList = (state.itemList).filter(item=>item.id != action.idToRemove)
            return {...state, itemList: newItemList}
        }
        case 'clear': {
            return {...state, itemList: []}
        }
        default: {
            return state
        }
    }
}


const FavProvider = ({children}) => {
    const [favState, dispatchFav] = useReducer(favReducer, favInitialState)

    const contextValue = {
        favState,
        dispatchFav
    }

    return (
        <Provider value={contextValue}>
            {children}
        </Provider>
    )

}
export default FavProvider

