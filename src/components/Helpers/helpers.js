import { isNull } from "lodash";

export const convertApiErrors = errors => {

    let errorsObj = {};
    Object.keys(errors).forEach(function (key) {
        let value = errors[key][0]
        errorsObj[key] = value
    });

    return errorsObj;

}

export const addDataToArray = (data, array) => {
    let newArr = [data, ...array];

    return newArr;
}

export const findDataById = (id, array) => {
    let matches = array.find(value => value.id == id);
    return !isNull(matches) ? matches : false;
}

export const replaceDataById = (id, array, newData) => {
    let index = array.findIndex(value => value.id == id);
    let filteredArray = array.filter(value => value.id != id);
    filteredArray[index] = newData;

    return filteredArray;
}

export const removeDataById = (id, array) => {
    let filteredArray = array.filter(value => value.id != id);
    return filteredArray;
}