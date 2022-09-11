export const convertApiErrors = errors => {

    let errorsObj = {};
    Object.keys(errors).forEach(function (key) {
        let value = errors[key][0]
        errorsObj[key] = value
    });

    return errorsObj;

}

export const findDataById = (id, array) => {
    let matches = array.filter(value => value.id == id);

    return matches.length > 0 ? matches[0] : false;
}