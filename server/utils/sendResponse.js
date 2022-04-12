import Response from "./response.js";

export default class SendResponse {
  setSuccess(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.type = "success";
    return this;
  }

  setError(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.type = "error";
    return this;
  }

  send(res) {
    const result = new Response(this);

    if (result.type === "success" || result.data)
      return res.status(result.statusCode).json(result);

    return res.status(result.statusCode).json({
      status: result.type,
      message: result.message,
    });
  }
}
