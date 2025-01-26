import createApiClient from "./api.service";

class LevelService {
  constructor(baseUrl = "/api/levels") {
    this.api = createApiClient(baseUrl);
  }

  async index() {
    return (await this.api.get("/")).data;
  }
}

export default new LevelService();
