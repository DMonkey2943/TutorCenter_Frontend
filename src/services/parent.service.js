import createApiClient from "./api.service";

class ParentService {
  constructor(baseUrl = "/api/parents") {
    this.api = createApiClient(baseUrl);
  }

  async index() {
    return (await this.api.get("/")).data;
  }

  async store(request) {
    return (await this.api.post("/", request)).data;
  }

  async show(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async update(id, request) {
    return (await this.api.patch(`/${id}`)).data;
  }

  async destroy(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}

export default new ParentService();
