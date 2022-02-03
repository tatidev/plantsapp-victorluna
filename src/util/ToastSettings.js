import {toast} from 'react-toastify'

const toastParams = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
    }

export const toastInfo = (msg) =>{
    toast.info(msg, toastParams);
}

export const toastError = (msg) =>{
    toast.error(msg, toastParams);
}