import createApiClient from "./api.service";

class TutorService {
  constructor(baseUrl = "/api/tutors") {
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
    return (
      await this.api.post(`/${id}`, request, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  }

  async destroy(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}

export default new TutorService();
