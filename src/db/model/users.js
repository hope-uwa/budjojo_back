import db from '../config';
import helper from '../../helpers/userHelper';
import queries from '../utils/queries/usersQueries';

const { signUp, updateIncome, getuserInfo } = queries;
/**
 * @class User
 * @description Contains methods for creating and login user
 */
class User {
  /**
   * @param  {object} data - Fields client inputed
   * @method create()
   * @returns {object} New User information
   */
  static async create(data) {
    const {
      username, email, password, income
    } = data;

    const hashedPassword = helper.hashPassword(password);
    const values = [username, email, hashedPassword, income];
    const response = await db.query(signUp, values);
    return response;
  }

  /**
   * @param  {object} data - Fields client inputed
   * @method updateIncome()
   * @returns {object} Income information
   */
  static async updateIncome(data) {
    const {
      income, id
    } = data;
    const values = [income, id];
    const response = await db.query(updateIncome, values);
    return response;
  }
}

export default User;
