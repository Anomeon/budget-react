class LocalStorageMock {
  constructor() {
    JSON.stringify
    this.store = {
      items: JSON.stringify({
        "1": {
          item: "test",
          sum: "50",
          category: "test"
        }
      }),
      categories: JSON.stringify({
        "1": {
          category: "test"
        }
      })
    };
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key];
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }
};

global.localStorage = new LocalStorageMock;
