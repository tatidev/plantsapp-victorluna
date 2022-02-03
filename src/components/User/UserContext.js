import { createContext, useReducer } from "react";

export const userContext = createContext(null)

const {Provider} = userContext

const userInitialState = {
    id : '',
    email : '',
    firstName : '',
    lastName : '',
    phone : '',
    state : '',
    address : '',
    city : '',
    cp : '',
    fileImage: ''
}


const userReducer = (state, action) => {
    switch (action.type){
        case 'addItem': {
            return {...state, 
                    id : action.item.id, 
                    email: action.item.email, 
                    firstName: action.item.firstName, 
                    lastName: action.item.lastName, 
                    phone: action.item.phone, 
                    state: action.item.state, 
                    address: action.item.address,
                    city: action.item.city,
                    cp: action.item.cp,
                    fileImage: action.item.fileImage
                }
        }
        case 'clear': {
            return {...state, 
                    id : '',
                    email: '',
                    firstName: '',
                    lastName: '',
                    phone: '',
                    state: '',
                    address: '',
                    city: '',
                    cp: '',
                    fileImage: ''
                }
        }
        default: {
            return state
        }
    }
}


const UserProvider = ({children}) => {
    const [userState, dispatch] = useReducer(userReducer, userInitialState)

    const contextValue = {
        userState,
        dispatch
    }
    
    return (
        <Provider value={contextValue}>
            {children}
        </Provider>
    )

}
export default UserProvider

