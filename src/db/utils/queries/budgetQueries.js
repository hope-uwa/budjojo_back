/* eslint-disable quotes */
export default {

    getBudget: `SELECT * FROM budgets WHERE owner= $1`,
    
    getMonthBudget: `SELECT * FROM budgets WHERE owner= $1 AND period = $2`,
  
    createBudget: `INSERT INTO budgets (owner, period, budget ) VALUES ($1, $2, $3) RETURNING *;`,

    updateBudget: `UPDATE budgets SET budget = $1 WHERE id = $2 RETURNING *;`,

    deleteBudget : `DELETE FROM budgets WHERE id = $1;`
  };
  