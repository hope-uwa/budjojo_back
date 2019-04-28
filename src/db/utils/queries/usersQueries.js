/* eslint-disable quotes */
export default {

    signUp: `INSERT INTO users (username, email, password, income) VALUES ($1, $2, $3, $4) RETURNING id, username, email, income;`,
  
    updateIncome: 'UPDATE users SET income = $1 WHERE id = $2 RETURNING *;',
  
    getuserInfo: 'SELECT id, username, income FROM users WHERE id = $1 RETURNING *;',
  };
  