import createApiClient from "./api.service";

class AuthService {
  constructor(baseUrl = "/api") {
    this.api = createApiClient(baseUrl);
  }

  async register(request) {
    return (await this.api.post("/register", request)).data;
  }

  async login(request) {
    return (await this.api.post("/login", request)).data;
  }

  async logout() {
    return (await this.api.get("/logout")).data;
  }

  async changePassword(request) {
    return (await this.api.post("/account/changePassword", request)).data;
  }

  async getAccount() {
    return (await this.api.get("/account")).data;
  }
}

export default new AuthService();
