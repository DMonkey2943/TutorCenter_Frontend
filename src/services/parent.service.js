import createApiClient from "./api.service";

class ParentService {
  constructor(baseUrl = "/api/parents") {
    this.api = createApiClient(baseUrl);
  }

  async index() {
    return (await this.api.get("/")).data;
  }

  async getAll() {
    return (await this.api.get("/getAll")).data;
  }

  async store(request) {
    return (await this.api.post("/", request)).data;
  }

  async show(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async update(id, request) {
    return (await this.api.patch(`/${id}`, request)).data;
  }

  async destroy(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  async getByUserId(userId) {
    return (await this.api.get(`/user/${userId}`)).data;
  }
}

export default new ParentService();
