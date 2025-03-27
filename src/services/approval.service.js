import createApiClient from "./api.service";

class ApprovalService {
  constructor(baseUrl = "/api/approval") {
    this.api = createApiClient(baseUrl);
  }

  async enrollClass(request) {
    //store
    return (await this.api.post("/classes/", request)).data;
  }

  async unenrollClass(classId) {
    //destroy
    return (await this.api.delete(`/classes/${classId}`)).data;
  }

  async approve(classId, request) {
    //update
    return (await this.api.patch(`/classes/${classId}`, request)).data;
  }

  async index(classId) {
    return (await this.api.get(`/classes/${classId}`)).data;
  }
}

export default new ApprovalService();
