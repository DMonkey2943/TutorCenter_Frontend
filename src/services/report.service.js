import createApiClient from "./api.service";

class ReportService {
  constructor(baseUrl = "/api/reports") {
    this.api = createApiClient(baseUrl);
  }

  async index() {
    return (await this.api.get("/")).data;
  }

  async store(request) {
    return (await this.api.post("/", request)).data;
  }

  async update(id, request) {
    return (await this.api.patch(`/${id}`, request)).data;
  }

  async show(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async getTutorReportsForClass(classId) {
    return (await this.api.get(`/classes/${classId}`)).data;
  }
}

export default new ReportService();
