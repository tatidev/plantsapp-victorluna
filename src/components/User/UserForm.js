import {Link} from 'react-router-dom'
import {validateField} from '../../util/FormValidationRules'
import ButtonBack from '../../util/ButtonBack'
import { useState, useContext, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import { db, storage } from "../../util/Firebase"
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { collection , addDoc , serverTimestamp, getDocs , query , where, updateDoc, doc   } from "firebase/firestore"
import { toastError, toastInfo} from '../../util/ToastSettings'
import md5 from 'md5'
import {userContext} from '../User/UserContext'
import { setImageToSrc } from '../../util/StorageUtils'

function UserForm() {
    const {userState, dispatch} = useContext(userContext)
    const [errorForm, setErrorForm] = useState({})
    const [email, setEmail] = useState({id: 'ctrlEmail', value: userState.email})
    const [password, setPassword] = useState({id: 'ctrlPassword', value: ''})
    const [firstName, setFirstName] = useState({id: 'ctrlFirstName', value: userState.firstName})
    const [lastName, setLastName] = useState({id: 'ctrlLastName', value: userState.lastName})
    const [phone, setPhone] = useState({id: 'ctrlPhone', value: userState.phone})
    const [address, setAddress] = useState({id: 'ctrlAddress', value: userState.address})
    const [city, setCity] = useState({id: 'ctrlCity', value: userState.city})
    const [state, setState] = useState({id: 'ctrlState', value: userState.state})
    const [cp, setCp] = useState({id: 'ctrlCp', value: userState.cp})
    const [fileImage, setFileImage] = useState({id: 'ctrlFileImage', value:userState.fileImage});
    const [file, setFile] = useState(null)
    const [saving, setSaving] = useState(false)
    
    let errorFormGroup

    const formValidatorRules = {
        'ctrlFirstName' : ['required', 'isAlpha'],
        'ctrlLastName' : ['isAlpha'],
        'ctrlPhone' : ['isMobilePhone'],
        'ctrlEmail' : ['required', 'isEmail'],
        'ctrlPassword' : ['isStrongPassword'],
        'ctrlAddress' : ['required'],
        'ctrlCity' : ['isAlpha'],
        'ctrlState' : ['isAlpha'],
        'ctrlCp' : ['isInt'],
    }

    useEffect(() => {
        if(userState.id.length > 0) setImageToSrc(fileImage.value, 'avatarImg')
    }, [userState.fileImage])

    const validateFields = () => {
        errorFormGroup = {}
        let valResult

        valResult = validateField({...firstName, ['rules']:formValidatorRules[firstName.id]})
        if(valResult.length > 0) errorFormGroup = {...errorFormGroup,[firstName.id]: valResult}

        valResult = validateField({...lastName, ['rules']:formValidatorRules[lastName.id]})
        if(valResult.length > 0) errorFormGroup = {...errorFormGroup,[lastName.id]: valResult}

        valResult = validateField({...phone, ['rules']:formValidatorRules[phone.id]})
        if(valResult.length > 0) errorFormGroup = {...errorFormGroup,[phone.id]: valResult}

        valResult = validateField({...email, ['rules']:formValidatorRules[email.id]})
        if(valResult.length > 0) errorFormGroup = {...errorFormGroup,[email.id]: valResult}

        valResult = validateField({...address, ['rules']:formValidatorRules[address.id]})
        if(valResult.length > 0) errorFormGroup = {...errorFormGroup,[address.id]: valResult}

        valResult = validateField({...city, ['rules']:formValidatorRules[city.id]})
        if(valResult.length > 0) errorFormGroup = {...errorFormGroup,[city.id]: valResult}

        valResult = validateField({...state, ['rules']:formValidatorRules[state.id]})
        if(valResult.length > 0) errorFormGroup = {...errorFormGroup,[state.id]: valResult}

        valResult = validateField({...cp, ['rules']:formValidatorRules[cp.id]})
        if(valResult.length > 0) errorFormGroup = {...errorFormGroup,[cp.id]: valResult}

        if(!(userState.id.length > 0 && password.value.length == 0)){
            valResult = validateField({...password, ['rules']:formValidatorRules[password.id]})
            if(valResult.length > 0) errorFormGroup = {...errorFormGroup,[password.id]: valResult}
        }

        setErrorForm(errorFormGroup)
        
        return (Object.keys(errorFormGroup).length === 0) ? true : false        
    }    


    const handleChange = (e) => {
        switch (e.target.id) {
            case firstName.id:
                setFirstName({id: e.target.id, value: e.target.value})
                break;
            case lastName.id:
                setLastName({id: e.target.id, value: e.target.value})
                break;
            case phone.id:
                setPhone({id: e.target.id, value: e.target.value})
                break;
            case email.id:
                setEmail({id: e.target.id, value: e.target.value})
                break;
            case password.id:
                setPassword({id: e.target.id, value: e.target.value})
                break;
            case address.id:
                setAddress({id: e.target.id, value: e.target.value})
                break;
            case city.id:
                setCity({id: e.target.id, value: e.target.value})
                break;
            case state.id:
                setState({id: e.target.id, value: e.target.value})
                break;
            case cp.id:
                setCp({id: e.target.id, value: e.target.value})
                break;
            case fileImage.id:
                setFileImage({id: e.target.id, value: e.target.files[0].name})
                setFile(e.target.files[0])
                break;
            default:
                break;
        }

        if ( !!errorForm[e.target.id] ){
         setErrorForm({
            ...errorForm,
            [e.target.id]: null
          })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSaving(true)
        if(validateFields()){ 
            if(userState.id.length > 0){
                doTransaction()
            }else{
                const userCollection = collection(db, 'users')
                const documentRef = query(userCollection, where('email', '==', email.value))
                const getItem = getDocs(documentRef)
                getItem
                .then((item)=>{
                    if(item.docs.length == 0){
                        doTransaction()
                    }else{
                        setErrorForm({[email.id]: 'Correo electrónico existente'})    
                        setSaving(false)
                    }
                })
                .catch((rej)=>{
                    toastError('User form: Error en obtener datos de la base: ' + rej)
                    setSaving(false)
                })
            }
        }else{
            setSaving(false)
        }

    }

    const userDetail = () => {
        return {
            firstName : firstName.value,
            lastName : lastName.value,
            phone : phone.value,
            email : email.value,
            password : md5(password.value),
            address : address.value,
            city : city.value,
            state : state.value,
            cp : cp.value,
            fileImage: fileImage.value,
            created_at : serverTimestamp()
        }
    }

    const doTransaction = () => {
        const userCollection = collection(db,"users")
        let orderDoc
        let _userDetail = userDetail()
        if(userState.id.length > 0){ 
            if(password.value.length == 0) delete _userDetail.password
            const documentRef = doc(userCollection, userState.id)
            orderDoc = updateDoc(documentRef, _userDetail)
        }else{ 
            if(file == null) delete _userDetail.fileImage
            orderDoc = addDoc(userCollection,_userDetail)
        }

        orderDoc
        .then((res)=>{
            console.log('file', file, fileImage.value)
            if(file != null){
                const _ref = ref(storage, fileImage.value)
                const uploadTask = uploadBytes(_ref, file)
                uploadTask.then((snapshot)=>{
                    console.log(snapshot)
                    toastInfo('Datos del usuario'+ _userDetail.firstName + ' almacenados')
                    dispatch({type: 'addItem', item: {id:userState.id.length > 0 ? userState.id : res.id, ..._userDetail}})
                    setSaving(false)
                })
            }else{
                toastInfo('Datos del usuario'+ _userDetail.firstName + ' almacenados')
                dispatch({type: 'addItem', item: {id:userState.id.length > 0 ? userState.id : res.id, ..._userDetail}})
                setSaving(false)
            }
        })
        .catch((error)=>{
            toastError('Error en almacenar registro: ' + error)
            setSaving(false)
        })
    }

    return (
        <div className="row order">
            <div className="col-md-8 order-md-1 datosCompra">
                <h4 className="mb-3">
                    <span className="text-muted">Datos del usuario</span>
                </h4>
                <hr className="mb-4"/>
                <form onSubmit={handleSubmit}>
                <h5 className="mb-3">Datos login</h5>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <Form.Group controlId={email.id}>
                                <Form.Label>Correo electrónico</Form.Label>
                                <Form.Control
                                    type="text"
                                    name={email.id}
                                    value={email.value}
                                    onChange={handleChange}
                                    isInvalid={!!errorForm[email.id] && errorForm[email.id].length}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorForm[email.id]}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className="col-md-6 mb-3">
                            <Form.Group controlId={password.id}>
                                <Form.Label>Password <small className="text-muted">(8 caracteres, 1 mayuscula y 1 minuscula)</small></Form.Label>
                                <Form.Control
                                    type="password"
                                    name={password.id}
                                    value={password.value}
                                    onChange={handleChange}
                                    isInvalid={!!errorForm[password.id] && errorForm[password.id].length}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorForm[password.id]}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    </div>
                    <hr className="mb-4"/>
                    <h5 className="mb-3">Datos personales</h5>
                    <div className='row'>
                        <div className="col-md-6 mb-3">
                        <img id="avatarImg" src="../../../no-image.webp" width="100" height="100" className="rounded-circle"/>
                        </div>
                    
                        <div className="col-md-6 mb-3">
                            <Form.Group controlId={fileImage.id}>
                                <Form.Label>Subir Imagen</Form.Label>
                                <Form.Control
                                    type="file"
                                    name={fileImage.id}
                                    value=""
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <Form.Group controlId={firstName.id}>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name={firstName.id}
                                    value={firstName.value}
                                    onChange={handleChange}
                                    isInvalid={!!errorForm[firstName.id] && errorForm[firstName.id].length}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorForm[firstName.id]}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className="col-md-6 mb-3">
                            <Form.Group controlId={lastName.id}>
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    type="text"
                                    name={lastName.id}
                                    value={lastName.value}
                                    onChange={handleChange}
                                    isInvalid={!!errorForm[lastName.id] && errorForm[lastName.id].length}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorForm[lastName.id]}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <Form.Group controlId={phone.id}>
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control
                                    type="text"
                                    name={phone.id}
                                    value={phone.value}
                                    onChange={handleChange}
                                    isInvalid={!!errorForm[phone.id] && errorForm[phone.id].length}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorForm[phone.id]}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    </div>

                    <hr className="mb-4"/>
                    <h5 className="mb-3">Domicilio</h5>
                    <div className="mb-3">
                        <Form.Group controlId={address.id}>
                                <Form.Label>Dirección</Form.Label>
                                <Form.Control
                                    type="text"
                                    name={address.id}
                                    value={address.value}
                                    onChange={handleChange}
                                    isInvalid={!!errorForm[address.id] && errorForm[address.id].length}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorForm[address.id]}
                                </Form.Control.Feedback>
                            </Form.Group>
                    </div>
                    <div className="row">
                        <div className="col-md-5 mb-3">
                            <Form.Group controlId={city.id}>
                                <Form.Label>Ciudad</Form.Label>
                                <Form.Control
                                    type="text"
                                    name={city.id}
                                    value={city.value}
                                    onChange={handleChange}
                                    isInvalid={!!errorForm[city.id] && errorForm[city.id].length}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorForm[city.id]}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className="col-md-4 mb-3">
                            <Form.Group controlId={state.id}>
                                <Form.Label>Provincia</Form.Label>
                                <Form.Control
                                    type="text"
                                    name={state.id}
                                    value={state.value}
                                    onChange={handleChange}
                                    isInvalid={!!errorForm[state.id] && errorForm[state.id].length}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorForm[state.id]}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className="col-md-3 mb-3">
                            <Form.Group controlId={cp.id}>
                                <Form.Label>Código postal</Form.Label>
                                <Form.Control
                                    type="text"
                                    name={cp.id}
                                    value={cp.value}
                                    onChange={handleChange}
                                    isInvalid={!!errorForm[cp.id] && errorForm[cp.id].length}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorForm[cp.id]}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    </div>
                    
                    <hr className="mb-4"/>
                    <div className="d-flex justify-content-between col-md-12">
                        <ButtonBack/>
                        {(saving) ? <button className="btn btn-success btn-sm btn-block pe-none"><span className='button-loader'>Guardando</span></button> : <button className="btn btn-success btn-sm btn-block" type="submit">{(userState.email.length > 0) ? "Modificar" : "Confirmar"}</button>}
                    </div>
                    <hr className="mb-4"/>
                </form>
        </div>        
        </div>
    )
}

export default UserForm
