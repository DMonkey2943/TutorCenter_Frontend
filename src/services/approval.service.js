import createApiClient from "./api.service";

class ApprovalService {
  constructor(baseUrl = "/api/approval") {
    this.api = createApiClient(baseUrl);
  }

  async enrollClass(request) {
    return (await this.api.post("/enroll", request)).data;
  }
}

export default new ApprovalService();
