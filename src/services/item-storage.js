export class ItemStorage {
  // static setStaticProperties() {
  //   ItemStorage.instanceCounter = ItemStorage.instanceCounter || 0;
  // }

  constructor(storage) {
    if (storage) {
      this.storage = storage;
    } else {
      throw new Error('ItemStorage constructor expected a storage parameter');
    }
    // ItemStorage.setStaticProperties();
    //
    // if (ItemStorage.instanceCounter === 1) {
    //   throw new Error('ItemStorage already has instance');
    // } else {
    //   if (storage) {
    //     ++ItemStorage.instanceCounter;
    //     this.storage = storage;
    //   } else {
    //     throw new Error('ItemStorage constructor expected a storage parameter');
    //   }
    // }

    if (!this.getIDCounter()) {
      this.storage.setItem('IDCounter', 0);
    }
  }

  getItems(table, isArray, state) {
    let items = JSON.parse(this.storage.getItem(table) || '{}');
    let collection;
    if (isArray) {
      collection = [];
      for (let key in items) {
        let item = items[key];
        if (item.state === state) {
          item.id = key;
          collection.push(item);
        }
      }
    } else {
      collection = {};
      for (let key in items) {
        if (items[key].state === state) { collection[key] = items[key]; }
      }
    }
    return collection;
  }

  deleteItems(itemsArray) {
    let items = this.getItems();
    itemsArray.forEach((id) => {
      delete items[id];
    });
    this.storage.setItem('items', JSON.stringify(items));
  }

  addItem(table, itemObject) {
    let IDCounter = this.incrementIDCounter();
    let items = this.getItems(table);
    items[IDCounter] = itemObject;
    this.storage.setItem(table, JSON.stringify(items));
    return {[IDCounter]: itemObject};
  }

  updateItemState(id, state) {
    let items = this.getItems();
    items[id].state = state;
    this.storage.setItem('items', JSON.stringify(items));
  }

  getIDCounter() {
    return this.storage.getItem('IDCounter');
  }

  incrementIDCounter() {
    let IDCounter = this.getIDCounter();
    this.storage.setItem('IDCounter', ++IDCounter);
    return IDCounter;
  }
}
