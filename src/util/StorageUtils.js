import {storage} from '../components/Firebase'
import { ref, getDownloadURL } from "firebase/storage";

export const setImageToSrc = (fileName, objectImgToSrc) => {
    const _ref = ref(storage, fileName)
    const storagePromise = getDownloadURL(_ref)

    storagePromise
    .then((url) => {
        const img = document.getElementById(objectImgToSrc);
        img.setAttribute('src', url);
    })
    .catch((error) => {
        // Handle any errors
        return error;
    });
}