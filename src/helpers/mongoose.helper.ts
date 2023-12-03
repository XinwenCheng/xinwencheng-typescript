import mongoose from 'mongoose';

export default class MongooseHelper {
  static #connection?: any;

  static async startConnection() {
    if (
      !this.#connection ||
      this.#connection.readyState === 0 ||
      this.#connection.readyState === 3
    )
      this.#connection = await mongoose.connect(`${process.env.DB_CONNECTION}`);
  }

  static async closeConnection() {
    if (!this.#connection) return;

    await this.#connection.disconnect();
    this.#connection = undefined;
  }
}
