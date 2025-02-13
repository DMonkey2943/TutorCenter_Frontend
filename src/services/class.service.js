import createApiClient from "./api.service";

class ClassService {
  constructor(baseUrl = "/api/classes") {
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
    return (await this.api.patch(`/${id}`, request)).data;
  }

  async destroy(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  async get12Classes() {
    return (await this.api.get("/get12Classes")).data;
  }
}

export default new ClassService();
