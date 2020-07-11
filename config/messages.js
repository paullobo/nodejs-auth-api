module.exports = {
    error: {
        
        // User 
        USER_FIRSTNAME_NOT_FOUND: 'First name can\'t be empty',
        USER_NOT_FOUND: 'User not found',
        USER_LASTNAME_NOT_FOUND: 'Last name can\'t be empty',
        USERID_NOT_FOUND: 'User Id can\'t be empty',
        USER_EMAIL_NOT_FOUND: 'User with this email not found!',


        // COMMON
        EMAIL_ALREADY_EXIST: 'Email already exist, Please login!',
        PASSWORD_NOT_FOUND: 'password can\'t be empty',
        EMAIL_NOT_FOUND: 'Email can\'t be empty',
        INVALID_EMAIL_FOUND: 'Email is invalid',
        EMAIL_NOT_AVAILABLE: 'This email is taken',
        EMAIL_IS_AVAILABLE: 'This email is available',
        DUPLICATE_EMAIL_FOUND: 'User already exists with this Email',
        GENDER_NOT_FOUND: 'Gender can\'t be empty',
        WRONG_PASSWORD: 'The entered password is wrong',
        NAME_NOT_FOUND: 'Name can\'t be empty',
        MOBILE_NOT_FOUND: 'Mobile number can\'t be empty',
        VERIFY_EMAIL: `Please verify your email, before login!`,
        EMAIL_ALREADY_VERIFIED: `Email is already verified!`,
        REQ_BODY_EMPTY: `Request body is missing!`,
        PASSWORD_LENGTH_ERROR: 'Password must be atleast 8 character long!',
        INVALID_COLLECTION: 'Invalid collection name!',
        BadRequest: {
            status: 400,
            code: "BadRequest",
            message: "The request body contains bad syntax or is incomplete."
        },
        ValidationError: {
            status: 400,
            code: "ValidationError",
            message: "Validation error(s) present. See embedded errors list for more details. (See below)"
        },
        InvalidCredentials: {
            status: 401,
            code: "InvalidCredentials",
            message: "Missing or invalid Authorization header"
        },
        InvalidAccessToken: {
            status: 401,
            code: "InvalidAccessToken",
            message: "Invalid access token"
        },
        ExpiredAccessToken: {
            status: 401,
            code: "ExpiredAccessToken",
            message: "Generate a new access token using your client credentials"
        },
        InvalidAccountStatus: {
            status: 401,
            code: "InvalidAccountStatus",
            message: "Invalid access token account status."
        },
        InvalidApplicationStatus: {
            status: 401,
            code: "InvalidApplicationStatus",
            message: "Invalid application status"
        },
        InvalidScopes: {
            status: 401,
            code: "InvalidScopes",
            message: "Missing or invalid scopes for requested endpoint."
        },
        ServerError: {
            status: 500,
            code: "ServerError",
            message: "The request timed out"
        }
    },
    success: {
        RESET_PASSWORD_SUCCESS: 'Mail is sent sucessfully',
        PASSWORD_UPDATED_SUCCESS: `Password updated sucessfully`,
        EMAIL_VERIFY_SUCCESS: 'Verification mail sent sucessfully',
        EMAIL_VERIFIED_SUCCESS: 'Email is verified sucessfully',
    },
    info: {
     

    }
}