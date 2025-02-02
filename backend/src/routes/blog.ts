/** @format */

import { GetPrismaClient } from '../prismaClient';
import { factory } from '../factory';
import { blogInput } from '@yuvraj04/blogo-common';

// POST api/v1/blog/
// PUT api/v1/blog/:id
// DELETE api/blog/:id
// GET api/v1/blog/:id
// GET api/v1/blog/

const blogRouter = factory.createApp();

blogRouter.post('/', async c => {
  const prisma = GetPrismaClient(c.env.DATABASE_URL);
  const body = await c.req.json();
  const userId = c.get('JWTPayload').id as string;
  const { success } = blogInput.safeParse(body);

  if (!success) {
    return c.json({ msg: 'invalid bloginput type' }, 400);
  }

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

blogRouter.put('/:id', async c => {
  const prisma = GetPrismaClient(c.env.DATABASE_URL);
  const body = await c.req.json();
  const blogId = c.req.param('id');
  const { success } = blogInput.safeParse(body);

  if (!success) {
    return c.json({ msg: 'invalid bloginput type' }, 400);
  }

  if (typeof body.published !== 'boolean') {
    if (body.published === 'true' || body.published === 'false') {
      body.published = body.published === 'true'; // Convert string to boolean
    } else {
      return c.json({ msg: 'invalid inputs' }, 400);
    }
  }

  try {
    const post = await prisma.post.update({
      where: { id: blogId },
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

blogRouter.get('/bulk?offset&limit', async c => {
  const prisma = GetPrismaClient(c.env.DATABASE_URL);
  const offset = parseInt(c.req.param('offset') || '0');
  const limit = parseInt(c.req.param('limit') || '10');

  try {
    const blogs = prisma.post.findMany({
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

blogRouter.get('/:id', async c => {
  const prisma = GetPrismaClient(c.env.DATABASE_URL);
  const body = await c.req.json();
  const blogId = c.req.param('id');

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: blogId,
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

blogRouter.delete('/:id', async c => {
  const prisma = GetPrismaClient(c.env.DATABASE_URL);
  const body = await c.req.json();
  const blogId = c.req.param('id');

  try {
    const post = await prisma.post.delete({
      where: { id: blogId },
      select: {
        title: true,
      },
    });

    return c.json({
      msg: 'post deleted successfully',
      post,
    });
  } catch (err) {
    return c.json({
      msg: 'Post deletion falied',
      err,
    });
  }
});

export default blogRouter;
