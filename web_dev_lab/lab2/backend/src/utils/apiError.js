class ApiError extends Error {
  constructor(
    status,
    message = "something went wrong...",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.errors = errors;
    this.message = message;
    this.success = false;
    this.status = status;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      success: this.success,
      status: this.status,
      message: this.message,
      errors: this.errors,
      stack: this.stack,
    };
  }
}
export default ApiError;
