import axiosClient from "./apiClientService";

interface Entity {
  id: number;
}

class HttpService {
  endPoint: string;
  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }
  getAll<T>() {
    const controller = new AbortController();
    const request = axiosClient.get<T[]>(this.endPoint, {
      signal: controller.signal,
    });
    return { cancel: () => controller.abort(), request };
  }
  delete(id: number) {
    return axiosClient.delete(this.endPoint + "/" + id);
  }
  add<T>(entity: T) {
    return axiosClient.post(this.endPoint, entity);
  }
  update<T extends Entity>(updatedEntity: T) {
    return axiosClient.patch(
      this.endPoint + "/" + updatedEntity.id,
      updatedEntity
    );
  }
}

const create = (endPoint: string) => new HttpService(endPoint);

export default create;