import createApiClient from "./api.service";

class WardService {
  constructor(baseUrl = "/api/districts") {
    this.api = createApiClient(baseUrl);
  }

  async getAllBelongToDistrict(districtId) {
    return (await this.api.get(`/${districtId}/wards`)).data;
  }
}

export default new WardService();
