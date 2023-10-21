const errorHandler = (error, req, res, next) => {
  let code = 500;
  let message = "Internal server error";
  console.log(error);
  if (error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
    code = 400;
    message = error.errors[0].message;
  } else if (error.name == "empty_field") {
    code = 400;
    message = "Email and Password required";
  } else if (error.name == "invalid_email_password") {
    code = 401;
    message = "Invalid Email / Password";
  } else if (error.name == "unauthenticated" || error.name == "JsonWebTokenError") {
    code = 401;
    message = "Invalid Token";
  } else if (error.name === "not_found") {
    code = 404;
    message = "Not Found";
  } else if (error.name == "KTP is required!") {
    code = 400;
    message = error.name;
  } else if (error.name == "invalid_otp") {
    code = 401;
    message = "Invalid otp code!";
  } else if (
    error.name == "email_is_not_registered" ||
    error.name == "invalid_password"
  ) {
    code = 401;
    message = "Invalid Email / Password";
  } else if (error.name == "login_empty_field") {
    code = 400;
    message = "Email/Password is required!";
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
