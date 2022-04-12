export default class Response {
  constructor(response) {
    this.status = response.status;
    this.data = response.data;
    this.message = response.message;
  }
}
