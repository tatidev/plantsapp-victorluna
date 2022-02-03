import {useNavigate} from 'react-router-dom'
import { useState, useContext } from 'react'
import Form from 'react-bootstrap/Form'
import { db } from "../../util/Firebase"
import { collection , getDocs , query , where   } from "firebase/firestore"
import { toastError} from '../../util/ToastSettings'
import {validateField} from '../../util/FormValidationRules'
import md5 from 'md5'
import {userContext} from '../User/UserContext'

function LoginForm() {
    const navigate = useNavigate()
    const {dispatch} = useContext(userContext)

    const [errorForm, setErrorForm] = useState({})
    const [email, setEmail] = useState({id: 'ctrlEmail', value: ''})
    const [password, setPassword] = useState({id: 'ctrlPassword', value: ''})
    
    let errorFormGroup

    const formValidatorRules = {
        'ctrlEmail' : ['required', 'isEmail'],
        'ctrlPassword' : ['isValidPassword']
    }

    const validateFields = () => {
        errorFormGroup = {}
        let valResult

        valResult = validateField({...email, ['rules']:formValidatorRules[email.id]})
        if(valResult.length > 0) errorFormGroup = {...errorFormGroup,[email.id]: valResult}

        valResult = validateField({...password, ['rules']:formValidatorRules[password.id]})
        if(valResult.length > 0) errorFormGroup = {...errorFormGroup,[password.id]: valResult}

        setErrorForm(errorFormGroup)
        
        return (Object.keys(errorFormGroup).length === 0) ? true : false        
    }    

    const handleChange = (e) => {
        switch (e.target.id) {
            case 'ctrlEmail':
                setEmail({id: e.target.id, value: e.target.value})
                break;
            case 'ctrlPassword':
                setPassword({id: e.target.id, value: e.target.value})
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
        if(validateFields()){ 
        
            const userCollection = collection(db, 'users')
            const documentRef = query(userCollection, where('email', '==', email.value), where('password', '==', md5(password.value)))
            const getItem = getDocs(documentRef)
    
            getItem
                .then((item)=>{
                    if(item.docs.length == 0){
                        toastError('Usuario y Password inválido')
                    }else{
                        let _userData = item.docs.map(doc=>({id: doc.id, ...doc.data()}))
                        dispatch({type: 'addItem', item: _userData[0]})
                        navigate('/')
                    }
                })
                .catch((rej)=>{
                    toastError('Login: Error en obtener datos de la base: ' + rej)
                })
        }
    }

    return (
        <form className="form-signin" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Login</h1>
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
            <Form.Group controlId={password.id}>
                <Form.Label>Password</Form.Label>
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
            <button className="btn btn-lg btn-primary btn-block" type="submit">Ingresar</button>
        </form>
    )
}

export default LoginForm
