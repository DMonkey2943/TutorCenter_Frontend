import createApiClient from "./api.service";

class AdminService {
  constructor(baseUrl = "/api/admin") {
    this.api = createApiClient(baseUrl);
  }

  async getStats() {
    return (await this.api.get("/dashboard/stats")).data;
  }
}

export default new AdminService();
