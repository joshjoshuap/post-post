class HttpError extends Error {
    constructor(message, errorCode) {
      super(message); // message error
      this.code = errorCode; // error status code
    }
  }
  
  module.exports = HttpError;