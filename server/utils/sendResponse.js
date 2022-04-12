import Response from "./response.js";

export default class SendResponse {
  setSuccess(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.status = "success";
    return this;
  }

  setError(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.status = "error";
    return this;
  }

  send(res) {
    const result = new Response(this);

    if (this.type === "success" || this.data)
      return res.status(this.statusCode || 200).json(result);

    return res.status(this.statusCode || 400).json(result);
  }
}
