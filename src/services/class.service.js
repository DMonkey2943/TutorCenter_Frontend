import createApiClient from "./api.service";

class ClassService {
  constructor(baseUrl = "/api/classes") {
    this.api = createApiClient(baseUrl);
  }

  async getAllNewClasses(page = 1) {
    return (await this.api.get("/new", { params: { page } })).data;
  }

  async recommendClasses(page = 1) {
    return (await this.api.get("/recommended", { params: { page } })).data;
  }

  async getEnrolledClasses(page = 1) {
    return (await this.api.get("/enrolled", { params: { page } })).data;
  }

  async getRegisteredClasses(page = 1) {
    return (await this.api.get("/registered", { params: { page } })).data;
  }

  async confirmClassTeaching(classId) {
    return (await this.api.patch(`/${classId}/confirm`)).data;
  }

  async completeClass(classId) {
    return (await this.api.patch(`/${classId}/complete`)).data;
  }

  async index() {
    return (await this.api.get("/")).data;
  }

  async store(request) {
    return (await this.api.post("/", request)).data;
  }

  async show(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async update(id, request) {
    return (await this.api.patch(`/${id}`, request)).data;
  }

  async destroy(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  async get12Classes() {
    return (await this.api.get("/latest")).data;
  }
}

export default new ClassService();
