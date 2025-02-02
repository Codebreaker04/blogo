/** @format */
import blogRouter from './blog';
import userRouter from './users';
import authRouter from './auth';
import { factory, middleware } from '../factory';
import openRouter from './open';

const router = factory.createApp();

router.route('/', openRouter);
router.route('/auth', authRouter);
router.use(middleware);
router.route('/user', userRouter);
router.route('/blog', blogRouter);

export default router;
