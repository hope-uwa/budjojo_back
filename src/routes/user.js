import express from 'express';
import UserController from '../controllers/UserController';
import Authenticate from '../helpers/auth';

const router = express.Router();

const {
  verify,
} = Authenticate;

const {
  createUser,
  login,
  updateIncome
} = UserController;

router.post('/auth/signup', createUser);
router.post('/auth/login', login);
router.put('/income', verify, updateIncome);

export default router;
