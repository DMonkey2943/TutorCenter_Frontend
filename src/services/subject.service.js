import createApiClient from "./api.service";

class SubjectService {
  constructor(baseUrl = "/api/subjects") {
    this.api = createApiClient(baseUrl);
  }

  async index() {
    return (await this.api.get("/")).data;
  }
}

export default new SubjectService();
