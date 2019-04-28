
import dotenv from 'dotenv';
import { Pool } from 'pg';
import userTable from './a-user-migration';
import budgetMigration from './b-budget-migration';
import dropMigration from './dropMigration';


dotenv.config();

const connection = 'postgres://postgres:uwahope007@localhost:5432/stackoverflowlite';
console.log(process.env.DATABASE_URL)
const pool = (process.env.NODE_ENV === 'test') ? new Pool({ connectionString: process.env.TEST_DATABASE_URL }) : new Pool({ connectionString: process.env.DATABASE_URL });

pool.on('connect', () => {
  console.log('connected to the db');
});

pool.query(dropMigration)
      .then(() => pool.query(userTable))
      .then(() => pool.query(budgetMigration))
      .then(() => res.send('Tables Created'))
      .catch(err => err);


pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


