export default class Product {
  constructor(db) {
    this._db = db
    this.test = "test"
  }
  getAll() {
    return this.test
  }
}