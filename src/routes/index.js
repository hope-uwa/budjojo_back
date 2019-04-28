import express from 'express';
import user from './user';
import budget from './budget';

const router = express.Router();

router.use('/api/v1', user);
router.use('/api/v1', budget);

router.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome to Budjojo</h1>');
});

export default router;
