import createApiClient from "./api.service";

class ReportService {
  constructor(baseUrl = "/api/reports") {
    this.api = createApiClient(baseUrl);
  }

  // Map các status text sang số
  statusMap = {
    pending: 0,
    ok: 1,
  };

  async index(statusText = null) {
    let url = "/";
    if (statusText !== null) {
      // Chuyển đổi từ text sang số nếu có trong map
      const statusNumber = this.statusMap[statusText];
      if (statusNumber !== undefined) {
        url = `/?status=${statusNumber}`;
      }
      // Nếu statusText không có trong map, chỉ gửi request không có status
    }
    return (await this.api.get(url)).data;
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
