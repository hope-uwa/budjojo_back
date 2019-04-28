import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../db/config';

/**
 * @class Helper
 * @description Contains method for hasing password and genrating tokens
 * @export Auth
 */
class UserHelper {
  /**
   * @method hashPassword
   * @description Helps to hash the user password
   * @param  {string} password - Plain password to be hashed
   * @returns {string} The hashed password
   */
  static hashPassword(password) {
      console.log('saltround', process.env.SALT_ROUNDS)
    const saltrounds = parseInt(process.env.SALT_ROUNDS, 10);
    console.log(password)
    return bcrypt.hashSync(password, 2);
  }

  /**
   * @method verifyPassword
   * @description Helps to compare the hashed password and plain Password
   * @param  {string} hashedpassword - Plain password to be hashed
   * @param  {string} plainPassword - The password to be compared
   * @returns {boolean} True/False indicating if password matches or Not
   */
  static verifyPassword(unHashedPassword, hashedPassword) {
    return bcrypt.compareSync(unHashedPassword, hashedPassword);
  }

  /**
   * @method generateToken
   * @description Uses the user payload to generate a unique token
   * @param {object} payload - User payloaod for generating token
   * @returns {string} Token in form of a string
   */
  static generateToken(payload) {
    const {
        id, username, email, income
      } = payload;
    const token = jwt.sign({ id, username, email, income }, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });
    return token;
  }

  /**
  * @method verifyToken
  * @description verifies the given token
  * @param {string} token - The token to be verified
  * @returns {object} The payload of the token
  */
  static verifyToken(token) {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    return decoded;
  }

  static emailExist(email) {
    const queryText = `SELECT * FROM users WHERE email=$1;`;
    const response = db.query(queryText, [email]);
    return response;
  }

}

export default UserHelper;
