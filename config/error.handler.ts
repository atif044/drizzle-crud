class ErrorHandler extends Error {
    statusCode: number;
    status: string;
    operational: Boolean;
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith("4") ? "failed" : "error";
      this.operational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  export default ErrorHandler;
  