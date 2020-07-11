const message = require('../config/messages')
const dataValidator = require("../helper/dataUserValidator");
const commonHelper = require("../helper/commonHelper");
const { DbHelper } = require("../helper/dbHelperUser");
const authMiddleware = require("../utils/authMiddleware");
const { COLLECTIONS } = require("../config/constant");
const console = require("../logger");

//create instance of 
const dbInstance = new DbHelper();

const register = async (userDoc) => {
    try {
        //check if user exist with same email
        let {email,password} = userDoc;
        let emailExist = await dbInstance.getUserByEmail(email);
        if (emailExist) {
            throw (message.error.EMAIL_ALREADY_EXIST);
        }
        userDoc.password = await commonHelper.generatePasswordHash(password);

        let createdUser = await dbInstance.insertDocument(COLLECTIONS.USER_COLLECTION_NAME, userDoc);
       
        return createdUser._id;
    } catch (e) {
        throw (e);
    }
}

const login = async (email, password) => {
    try {
        let existingUser = await dbInstance.getUserByEmail(email);
        if (!existingUser) {
            throw (message.error.USER_NOT_FOUND);
        }
        let passwordMatch = await commonHelper.comparePasswordHash(password, existingUser.password)
        if (!passwordMatch) {
            throw (message.error.WRONG_PASSWORD);
        }
        if (existingUser.active == false) {
            throw (message.error.VERIFY_EMAIL);
        }
        let jwtToken = await authMiddleware.generateJWT({ email, _id: existingUser._id });
        return { token: jwtToken, userData: {
            userId:existingUser._id,
            firstName:existingUser.firstName,
            lastName:existingUser.lastName,
            email:existingUser.email,
            mobile:existingUser.mobile
        } }
    } catch (e) {
        console.log("Error login ::: ", e)
        throw (e);
    }
}

module.exports = {
    register,
    login
}