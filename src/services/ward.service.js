import createApiClient from "./api.service";

class WardService {
  constructor(baseUrl = "/api/wards") {
    this.api = createApiClient(baseUrl);
  }

  async getAllBelongToDistrict(id) {
    return (await this.api.get(`/getAllBelongToDistrict/${id}`)).data;
  }
}

export default new WardService();
