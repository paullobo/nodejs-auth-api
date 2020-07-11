const JWT = require("jsonwebtoken");
const console = require('../logger')
const message = require('../config/messages')

//JWT TOKEN
async function generateJWT(payloadDataObj) {
    try {
        return JWT.sign({ exp: Math.floor(Date.now() / 1000) + 24 * (60 * 60), data: payloadDataObj }, process.env.JWT_PRIVATE_KEY);
    } catch (e) {
        console.log("Erroe while generateJWT ::: ", e)
        throw new Error(e)
    }
}

async function generateTokenJWT(payloadDataObj) {
    try {
        return JWT.sign({ payloadDataObj }, process.env.JWT_PRIVATE_KEY, {
            expiresIn: 3600 // 1 hour
        })
    } catch (e) {
        console.log("Error while generateTokenJWT ::: ", e)
        throw new Error(e)
    }
}

async function verifyTokenJWT(token) {
    try {
        const decoded = JWT.verify(token, process.env.JWT_PRIVATE_KEY);
        return decoded;
    } catch (e) {
        console.log("Error while verifyTokenJWT ::: ", e)
        throw new Error(message.error.TOKEN_EXPIRED)
    }
}

//VERIFY JWT TOKEN
async function verifyJWT(req, res, next) {
    try {
        if (req && req.headers && req.headers.authorization) {
            let path = req.route.path.trim();
            path = path.slice(1, path.length);
            path = path.toLowerCase();
            JWT.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, async (err, decoded) => {
                try {
                    if (err) {
                        throw (err)
                    }
                    let currentTimestamp = Math.floor(Date.now() / 1000) + (60 * 60)

                    if (currentTimestamp > decoded.exp) {
                        return _handleResponse(req, res, message.error.TOKEN_EXPIRED)
                    }
                    // let authorised = await isAuthorised(decoded, path)

                    // if (!authorised) {
                    //     throw Error("Permission Denied, User not authorised to perform this operation")
                    // }
                    req.data = decoded.data;
                    req._id = decoded.data._id;
                    if (req.body) {
                        req.body._id = decoded.data._id;
                    }
                    next();
                } catch (e) {
                    return _handleResponse(req, res, e)
                }
            });
        } else {
            return _handleResponse(req, res, message.error.REQUEST_UNAUNTHENTICATED)
        }
    } catch (e) {
        console.log("ERROR :verifyJWT :::::", e)
        return _handleResponse(req, res, e)
    }
}

async function decodeJWT(payloadDataObj) {
    try {
        return JWT.decode(payloadDataObj , process.env.JWT_PRIVATE_KEY);
    } catch (e) {
        console.log("Erroe while decodeJWT ::: ", e)
        throw new Error(e)
    }
}



module.exports = {
    generateJWT,
    generateTokenJWT,
    decodeJWT,
    verifyTokenJWT,
    verifyJWT
}