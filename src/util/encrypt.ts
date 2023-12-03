export default class EncryptUtil {
  static encryptPassword(password: string, salt: string) {
    return salt + password;
  }
}
