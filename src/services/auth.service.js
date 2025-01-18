import createApiClient from "./api.service";

class AuthService {
  constructor(baseUrl = "/api") {
    this.api = createApiClient(baseUrl);
  }

  async register(request) {
    return (await this.api.post("/register", request)).data;
  }
}

export default new AuthService();
