import createApiClient from "./api.service";

class ReportService {
  constructor(baseUrl = "/api/reports") {
    this.api = createApiClient(baseUrl);
  }

  async store(request) {
    return (await this.api.post("/", request)).data;
  }
}

export default new ReportService();
