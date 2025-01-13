/** @format */

import { Hono } from 'hono';
import blogRouter from './blog';
import userRouter from './users';
import authRouter from './auth';
import { middleware } from '../factory';

const router = new Hono();

router.route('/auth', authRouter);
router.use(middleware);
router.route('/user', userRouter);
router.route('/blog', blogRouter);

export default router;
