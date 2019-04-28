import users from '../db/model/users';
import helper from '../helpers/userHelper';
/**
 * @class UserController
 * @description Controller for signup and signin
 * @exports UserController
 */
class UserController {
  /**
   * @method signUp
   * @description Method to create a user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} New user informations
   */
  static async createUser(req, res) {
    try {
      const response = await users.create(req.body);
      const user = response.rows[0];
      const token = helper.generateToken(user);
      return res.status(201).json({
        status: res.statusCode,
        data: [{
          token,
          ...user,
        }],
      });
    } catch (error) {
      if (error.code === '23505') {
        return res.status(409).json({
          status: res.statusCode,
          error: 'Username is been used by another user',
        });
      }
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }

  /**
   * @method login
   * @description Method to sign in a user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} User informations
   */
  static async login(req, res) {
    const { email, password } = req.body;
    const response = await helper.emailExist(email);

    if (response.rowCount < 1 || !helper.verifyPassword(password, response.rows[0].password)) {
      return res.status(401).json({
        status: res.statusCode,
        error: 'Authentication Failed: Email or Password is incorrect',
      });
    }
    const {
      id, username, email: userEmail, income
    } = response.rows[0];
    const user = {
      id, username, email: userEmail, income
    };
    const token = helper.generateToken(user);

    return res.status(200).json({
      status: 200,
      data: [{
        token,
        id: user.id,
        username,
        email: userEmail,
        income
      }],
    });
  }

  /**
   * @method updateIncome
   * @description Method to sign in a user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} User informations
   */
  static async updateIncome(req, res) {
    const { income } = req.body;
    const { id } = req.user;
    try {
      const update = await users.updateIncome({ id, income });
      if (update) {
        return res.status(201).json({
          status: 201,
          data: {
            income
          }
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }
}

export default UserController;
