import createApiClient from "./api.service";

class DistrictService {
  constructor(baseUrl = "/api/districts") {
    this.api = createApiClient(baseUrl);
  }

  async index() {
    return (await this.api.get("/")).data;
  }
}

export default new DistrictService();
