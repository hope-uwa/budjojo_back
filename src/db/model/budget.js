import moment from 'moment';
import db from '../config';
import queries from '../utils/queries/budgetQueries';

const { createBudget, updateBudget, getBudget, getMonthBudget, deleteBudget} = queries;

class Budget {
 
  static async create(data) {
    const { id, month, year, budget } = data
    const period = `${month}-${year}`
    const values = [ id, period, budget ];
    const response = await db.query(createBudget, values);
    return response;
    
  }

  static async updateBudget(data) {
    const { budget, id } = data;
    const response = await db.query(updateBudget, [budget, id]);
    return response;
  }

  
  /**
  * @method getByStatus
  * @description Returns all accounts based on the given status
  * @param {string} status - a string
  * @returns {object} the account details
  */
  static getById(userId) {
    const response = db.query(getBudget, [userId]);
    return response;
  }

  static getByPeriod(data) {
    const{ id: userId , month, year } = data;
    const period = `${month}-${year}`;
    const response = db.query(getMonthBudget, [userId, period]);
    return response;
  }


}

export default Budget;
