import createApiClient from "./api.service";

class TutorService {
  constructor(baseUrl = "/api/tutors") {
    this.api = createApiClient(baseUrl);
  }

  // Map các status text sang số
  statusMap = {
    failed: -1,
    pending: 0,
    ok: 1,
    not_created: "",
  };

  async approveProfile(id, request) {
    return (await this.api.patch(`/${id}/approve`, request)).data;
  }

  async averageRating(id) {
    return (await this.api.get(`/${id}/rating`)).data;
  }

  async getAvailableTutors(request) {
    return (await this.api.post("/available", request)).data;
  }

  async index(statusText = null) {
    let url = "/";
    if (statusText !== null) {
      // Chuyển đổi từ text sang số nếu có trong map
      const statusNumber = this.statusMap[statusText];
      if (statusNumber !== undefined) {
        url = `/?profile_status=${statusNumber}`;
      }
      // Nếu statusText không có trong map, chỉ gửi request không có status
    }
    return (await this.api.get(url)).data;
  }

  async store(request) {
    return (await this.api.post("/", request)).data;
  }

  async show(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async update(id, request) {
    return (
      await this.api.post(`/${id}`, request, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  }

  async destroy(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  async getByUserId(userId) {
    return (await this.api.get(`/user/${userId}`)).data;
  }
}

export default new TutorService();
