import createApiClient from "./api.service";

class ApprovalService {
  constructor(baseUrl = "/api/approval") {
    this.api = createApiClient(baseUrl);
  }

  async enrollClass(request) { //store
    return (await this.api.post("/enroll", request)).data;
  }

  async unenrollClass(classId) { //destroy
    return (await this.api.delete(`/unenroll/${classId}`)).data;
  }

  async approve(classId, request) { //update
    return (await this.api.patch(`/${classId}`, request)).data;
  }
}

export default new ApprovalService();
