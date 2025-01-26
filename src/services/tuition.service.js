import createApiClient from "./api.service";

class TuitionService {
  constructor(baseUrl = "/api/tuitions") {
    this.api = createApiClient(baseUrl);
  }

  async index() {
    return (await this.api.get("/")).data;
  }
}

export default new TuitionService();
