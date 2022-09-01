export const convertApiErrors = errors => {

    let errorsObj = {};
    Object.keys(errors).forEach(function (key) {
        let value = errors[key][0]
        errorsObj[key] = value
    });

    return errorsObj;

}