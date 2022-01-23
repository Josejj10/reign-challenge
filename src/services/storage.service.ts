export class StorageService {
  // This service   so it can be reused

  static set = (name: string, value: any): Promise<void> => {
    return Promise.resolve().then(() => {
      localStorage.setItem(name, JSON.stringify(value));
    });
  };

  static get = (name: string): Promise<any> => {
    return Promise.resolve().then(() => {
      const local = localStorage.getItem(name);

      if (local) return JSON.parse(local);

      // If it isn't in local storage, return undefined
      return undefined;
    });
  };

  static clear = () => {
    localStorage.clear();
  };
}
