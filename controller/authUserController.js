const message = require('../config/messages')
const dataValidator = require("../helper/dataUserValidator");
const { authProvider } = require("../provider");
const console = require('../logger');

const register = async (req, res) => {
    try {
        console.log("authController Register ::: ");
        if (!req.body) {
            return _handleResponse(req, res, message.error.REQ_BODY_EMPTY);
        }
        let userDoc = await dataValidator.validateRegisterObj(req.body);
        const userId = await authProvider.register(userDoc);
        return _handleResponse(req, res, null, userId);
    } catch (e) {
        return _handleResponse(req, res, e)
    }
}

const login = async (req, res) => {
    console.log("authController login :::", req.body);
    try {
        if (!req.body) {
            return _handleResponse(req, res, message.error.REQ_BODY_EMPTY);
        }
        await dataValidator.validateLoginObj(req.body);
        const loginResponse = await authProvider.login(req.body.email, req.body.password);
        return _handleResponse(req, res, null, loginResponse)
    } catch (e) {
        console.error("Error while login :: ", e)
        return _handleResponse(req, res, e);
    }
}

module.exports = {
    register,
    login
}