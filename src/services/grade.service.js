import createApiClient from "./api.service";

class GradeService {
  constructor(baseUrl = "/api/grades") {
    this.api = createApiClient(baseUrl);
  }

  async index() {
    return (await this.api.get("/")).data;
  }
}

export default new GradeService();
