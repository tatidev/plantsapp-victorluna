import ButtonBack from '../../util/ButtonBack'
import {validateField} from '../../util/FormValidationRules'
import { useContext, useState } from 'react'
import { cartContext } from './CartContext'
import Form from 'react-bootstrap/Form'
import {getDeliveryDateFormated} from '../../util/jsHelpers'
import { db } from "../../util/Firebase"
import { collection , addDoc , serverTimestamp } from "firebase/firestore"
import { toastError} from '../../util/ToastSettings'
import {userContext} from '../User/UserContext'

function OrderForm({itemsTotalPrice, itemList, costoEnvio }) {
    const {dispatch} = useContext(cartContext)
    const {userState} = useContext(userContext)
    const [orderGenerated, setOrderGenerated] = useState(false)
    const [errorForm, setErrorForm] = useState({})
    const [firstName, setFirstName] = useState({id: 'ctrlFirstName', value: userState.firstName})
    const [lastName, setLastName] = useState({id: 'ctrlLastName', value: userState.lastName})
    const [phone, setPhone] = useState({id: 'ctrlPhone', value: userState.phone})
    const [email, setEmail] = useState({id: 'ctrlEmail', value: userState.email})
    const [address, setAddress] = useState({id: 'ctrlAddress', value: userState.address})
    const [city, setCity] = useState({id: 'ctrlCity', value: userState.city})
    const [state, setState] = useState({id: 'ctrlState', value: userState.state})
    const [cp, setCp] = useState({id: 'ctrlCp', value: userState.cp})
    const [saving, setSaving] = useState(false)

    let errorFormGroup

    const formValidatorRules = {
        'ctrlFirstName' : ['required', 'isAlpha'],
        'ctrlLastName' : ['isAlpha'],
        'ctrlPhone' : ['isMobilePhone'],
        'ctrlEmail' : ['required', 'isEmail'],
        'ctrlAddress' : ['required'],
        'ctrlCity' : ['isAlpha'],
        'ctrlState' : ['isAlpha'],
        'ctrlCp' : ['isInt'],
    }

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

        setErrorForm(errorFormGroup)
        
        return (Object.keys(errorFormGroup).length === 0) ? true : false
    }
    

    const handleChange = (e) => {
        switch (e.target.id) {
            case 'ctrlFirstName':
                setFirstName({id: e.target.id, value: e.target.value})
                break;
            case 'ctrlLastName':
                setLastName({id: e.target.id, value: e.target.value})
                break;
            case 'ctrlPhone':
                setPhone({id: e.target.id, value: e.target.value})
                break;
            case 'ctrlEmail':
                setEmail({id: e.target.id, value: e.target.value})
                break;
            case 'ctrlAddress':
                setAddress({id: e.target.id, value: e.target.value})
                break;
            case 'ctrlCity':
                setCity({id: e.target.id, value: e.target.value})
                break;
            case 'ctrlState':
                setState({id: e.target.id, value: e.target.value})
                break;
            case 'ctrlCp':
                setCp({id: e.target.id, value: e.target.value})
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
        if(validateFields()) orderCreate()
        else setSaving(false)
    }

    
    const orderCreate = () => {
        const orderCollection = collection(db,"orders")

        const user = {
            firstName : firstName.value,
            lastName : lastName.value,
            phone : phone.value,
            email : email.value,
            address : address.value,
            city : city.value,
            state : state.value,
            cp : cp.value
        }

        const orderDetail = {
            user ,
            itemList,
            itemsTotalPrice,
            created_at : serverTimestamp()
        }

        const orderDoc = addDoc(orderCollection,orderDetail)

        orderDoc
        .then((res)=>{
            setOrderGenerated(true)
            dispatch({type:'clear'})
            setSaving(false)
        })
        .catch((error)=>{
            toastError('Error en almacenar registro: ' + error)
        })
    }

    return (
        <div className="col-md-8 order-md-1 datosCompra">
             <h4 className="mb-3">
                 <span className="text-muted">Datos de la compra</span>
             </h4>
             <hr className="mb-4"/>
             {orderGenerated ?    
                <div className="empty text-center">
                    <div className='header'><i className="bi-check-circle-fill text-success"></i></div>
                    <div>
                        <h4>Orden Generada. Muchas gracias {firstName.value}!</h4>
                        <h6>                                
                            Entre el {getDeliveryDateFormated(new Date(), 3)} y {getDeliveryDateFormated(new Date(), 5)} te estamos visitando en {address.value}, {city.value}, {state.value}
                        </h6>
                    </div>
                </div>
             : 
                <>
                <h5>Entrega</h5>
                <div className="card">
                    <div className="card-body">
                        <div><i className="bi-truck"/>&nbsp;Envío a domicilo - <span>Llega entre el {getDeliveryDateFormated(new Date(), 3)} y {getDeliveryDateFormated(new Date(), 5)}</span></div>
                        <div><strong>$ {costoEnvio}</strong></div>
                    </div>
                </div>
                <hr className="mb-4"/>
                <h5>Forma de pago</h5>
                <div className="card">
                    <div className="card-body">
                        <div><i className="bi-cash"/>&nbsp;Efectivo</div>
                    </div>
                </div>
                
                <hr className="mb-4"/>
                <form onSubmit={handleSubmit}>
                    <h5 className="mb-3">Datos del destinatario</h5>
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
                    </div>

                    <hr className="mb-4"/>
                    <h5 className="mb-3">Domicilio de entrega</h5>
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
                        {(saving) ? <button className="btn btn-success btn-sm btn-block pe-none"><span className='button-loader'>Confirmando</span></button> : <button className="btn btn-success btn-sm btn-block" type="submit">Confirmar compra</button>}
                    </div>
                    <hr className="mb-4"/>
                </form>
                </>
                }
        </div>        
    )
}

export default OrderForm
