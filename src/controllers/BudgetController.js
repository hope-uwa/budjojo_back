import Budget from '../db/model/budget';

/**
 * @class BudgetController
 */
class BudgetController {
  /**
     *
     * @param {object} req
     * @param {*} res
     * @return {object} json
     */
  static async createBudget(req, res) {
    const { budget, month, year } = req.body;
    const { id } = req.user;
    try {
      const checkBudget = await Budget.getByPeriod({ id, month, year });
      if (!checkBudget.rows.length) {
        const createBudget = await Budget.create({
          id, month, year, budget
        });
        if (createBudget) {
          return res.status(201).json({
            status: 201,
            data: {
              ...createBudget.rows
            }
          });
        }
      } else {
        return res.status(201).json({
          status: 409,
          error: 'You already have a budget for this month'
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'internal server error'
      });
    }
  }
}

export default BudgetController;
