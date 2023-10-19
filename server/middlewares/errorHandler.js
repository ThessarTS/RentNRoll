const errorHandler = (error, req, res, next) => {
    let code = 500
    let message = 'Internal server error'

    if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
        code = 400
        message = error.errors[0].message
    } else if (error.name == 'empty_field') {
        code = 400
        message = 'Email and Password required'
    } else if (error.name == 'invalid_email_password') {
        code = 401
        message = 'Invalid Email / Password'
    } else if (error.name == 'unauthenticated' || error.name == 'JsonWebTokenError') {
        code = 401
        message = 'Invalid Token'
    }

    res.status(code).json({ message })
}