import axiosClient, { CanceledError } from "./apiClientService";

export interface User {
  id: number;
  name: string;
}

class UserService {
  getAllUsers() {
    const controller = new AbortController();
    const request = axiosClient.get<User[]>("/users", {
      signal: controller.signal,
    });
    return { cancel: () => controller.abort(), request };
  }
  deleteUser(id: number) {
    return axiosClient.delete("/users/" + id);
  }
  addUser(newUser: User) {
    return axiosClient.post("/users", newUser);
  }
  updateUser(id: number, updatedUser: User) {
    return axiosClient.patch("/users/" + id, updatedUser);
  }
}

export default new UserService();
