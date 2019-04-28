import express from 'express';
import BudgetController from '../controllers/BudgetController';
import Authenticate from '../helpers/auth';

const router = express.Router();

const {
  verify,
} = Authenticate;
const {
  createBudget
} = BudgetController;

router.post('/budget', verify, createBudget);

export default router;
