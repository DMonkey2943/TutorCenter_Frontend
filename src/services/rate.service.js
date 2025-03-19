import createApiClient from "./api.service";

class RateService {
  constructor(baseUrl = "/api/rates") {
    this.api = createApiClient(baseUrl);
  }

  async store(request) {
    return (await this.api.post("/", request)).data;
  }

  async show(classId) {
    return (await this.api.get(`/${classId}`)).data;
  }
}

export default new RateService();
