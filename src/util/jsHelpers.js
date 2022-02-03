/**
     * @author Victor Luna
     * Recibe una fecha y la cantidad de días a sumar
     * Retorna el día resultante en un string del formato dd/mm
     */
 export const getDeliveryDateFormated = (date, cantDays) =>{
    Date.prototype.addDays = function (days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };

    let dateBase = date.addDays(cantDays)
    return dateBase.getDate().toString().padStart(2, '0') + '/' + (dateBase.getMonth()+1).toString().padStart(2, '0')
}