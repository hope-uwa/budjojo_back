const budgetTableQueries = `
  CREATE TABLE IF NOT EXISTS budgets(
    id SERIAL PRIMARY KEY,
    owner INTEGER REFERENCES users(id) ON DELETE CASCADE,
    budget JSONB NOT NULL,
    period VARCHAR NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW()
    );
  `;

export default budgetTableQueries;
