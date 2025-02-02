/** @format */

import { factory } from '../factory';
import { GetPrismaClient } from '../prismaClient';

const openRouter = factory.createApp();

openRouter.get('bulk', async c => {
  const prisma = GetPrismaClient(c.env.DATABASE_URL);
  const offset = parseInt(c.req.query('offset') || '0');
  const limit = parseInt(c.req.query('limit') || '10');

  try {
    const blogs = await prisma.post.findMany({
      skip: offset,
      take: limit,
    });

    return c.json({
      offset,
      limit,
      msg: 'fetched all blogs',
      blogs,
    });
  } catch (err) {
    return c.json({
      msg: 'uneable to fetch the blogs',
      err,
    });
  }
});

export default openRouter;
