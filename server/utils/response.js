export default class Response {
  constructor(response) {
    this.statusCode = response.statusCode;
    this.type = response.type;
    this.data = response.data;
    this.message = response.message;
  }
}
