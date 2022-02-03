import {storage} from './Firebase'
import { ref, getDownloadURL } from "firebase/storage";
import { toastError } from './ToastSettings';

export const setImageToSrc = (fileName, objectImgToSrc) => {
    const _ref = ref(storage, fileName)
    const storagePromise = getDownloadURL(_ref)

    storagePromise
    .then((url) => {
        const img = document.getElementById(objectImgToSrc);
        if(!!img) img.setAttribute('src', url);
    })
    .catch((error) => {
        toastError('Storage: Error en obtener datos de la base: '+error)
    });
}