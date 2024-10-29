import { Router } from 'express';
import { thoughtsRouter } from './thoughtRoutes.js';
import { userRouter } from './userRoutes.js';

const router = Router();

// /api/thoughts
router.use('/thoughts', thoughtsRouter);

// /api/users
router.use('/users', userRouter);

export default router;