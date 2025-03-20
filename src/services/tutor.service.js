import createApiClient from "./api.service";

class TutorService {
  constructor(baseUrl = "/api/tutors") {
    this.api = createApiClient(baseUrl);
  }

  async approveProfile(id, request) {
    return (await this.api.patch(`/${id}/approve`, request)).data;
  }

  async averageRating(id) {
    return (await this.api.get(`/${id}/averageRating`)).data;
  }

  async getAvailableTutors(request) {
    return (await this.api.post("/available", request)).data;
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

  async getByUserId(userId) {
    return (await this.api.get(`/user/${userId}`)).data;
  }
}

export default new TutorService();
