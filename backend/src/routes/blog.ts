/** @format */

import { GetPrismaClient } from '../prismaClient';
import { verify } from 'hono/jwt';
import { factory, middleware } from '../factory';

// POST api/v1/blog/
// PUT api/v1/blog/
// GET api/v1/blog/
const blogRouter = factory.createApp();

blogRouter.post('/', async c => {
  const prisma = GetPrismaClient(c.env.DATABASE_URL);
  const body = await c.req.json();
  const userId = c.get('JWTPayload').id as string;

  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: true,
        author: {
          connect: { id: userId },
        },
      },
    });

    return c.json(
      {
        msg: 'post created',
        postId: post.id,
      },
      201
    );
  } catch (e) {
    return c.json(
      {
        msg: "Post didn't create",
        err: e,
      },
      500
    );
  }
});

blogRouter.put('/', async c => {
  const prisma = GetPrismaClient(c.env.DATABASE_URL);
  const body = await c.req.json();

  if (typeof body.published !== 'boolean') {
    if (body.published === 'true' || body.published === 'false') {
      body.published = body.published === 'true'; // Convert string to boolean
    } else {
      return c.json({ msg: 'invalid inputs' }, 400);
    }
  }

  try {
    const post = await prisma.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
      },
    });

    return c.json(
      {
        msg: 'post updated',
        postId: post.id,
      },
      200
    );
  } catch (e) {
    return c.json(
      {
        msg: "Post didn't update",
        err: e,
      },
      500
    );
  }
});

blogRouter.get('/', async c => {
  const prisma = GetPrismaClient(c.env.DATABASE_URL);
  const body = await c.req.json();

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: body.id,
      },
    });

    return c.json(
      {
        post,
      },
      200
    );
  } catch (e) {
    return c.json(
      {
        msg: 'unable to fetch post',
        err: e,
      },
      500
    );
  }
});

export default blogRouter;
