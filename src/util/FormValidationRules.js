import validator from 'validator'

export const validateField = ({value, rules}) => {
    let errorList = []
    rules.forEach(item => {
        if(item == 'required' && validator.isEmpty(value))errorList.push('Campo obligatorio. ')
        if(item == 'isAlpha' && !validator.isAlpha(value, 'es-ES',{ignore: ' -'})) errorList.push('Solo esta permitido letras. ') 
        if(item == 'isInt' && !validator.isInt(value)) errorList.push('Solo esta permitido números. ') 
        if(item == 'isEmail' && !validator.isEmail(value)) errorList.push('E-mail inválido. ') 
        if(item == 'isMobilePhone' && !validator.isMobilePhone(value)) errorList.push('Teléfono inválido. ') 
        if(item == 'isStrongPassword' && !validator.isStrongPassword(value, {minLength: 8, minLowercase: 0, minUppercase: 1, minNumbers: 1, minSymbols: 0})) errorList.push('Debe contener mínimo 8 posiciones, 1 mayúscula, 1 minúscula. ') 
    });
    return errorList
}

