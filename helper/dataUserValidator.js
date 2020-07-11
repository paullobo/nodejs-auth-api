const { Validator } = require('node-input-validator');
const message = require('../config/messages');

module.exports = {
    validateRegisterObj: async function (dataObj) {
        let { firstName, lastName, email, mobile, password} = dataObj
        const v = new Validator(dataObj, {
            firstName: 'required',
            email: 'required|email',
            password: 'required|minLength:6',
            mobile: 'required|phoneNumber|minLength:10'
        });
        let matched = await v.check();
        if (!matched) {
            throw (v.errors)
        } else {
            return {
                firstName: firstName,
                lastName: lastName,
                email: email.toLowerCase(),
                password: password,
                mobile: mobile
            }
        }
    },

    validateLoginObj: async function (dataObj) {
        const v = new Validator(dataObj, {
            email: 'required|email',
            password: 'required|minLength:6',
        });
        let matched = await v.check();
        if (!matched) {
            throw (v.errors)
        };
        return true;
    }
}