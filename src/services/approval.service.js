import createApiClient from "./api.service";

class ApprovalService {
  constructor(baseUrl = "/api/approval") {
    this.api = createApiClient(baseUrl);
  }

  async enrollClass(request) {
    return (await this.api.post("/enroll", request)).data;
  }

  async unenrollClass(classId) {
    return (await this.api.delete(`/unenroll/${classId}`)).data;
  }
}

export default new ApprovalService();
