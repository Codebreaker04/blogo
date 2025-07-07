import { GetPrismaClient } from '../prismaClient';
import { factory } from '../factory';
import { blogInput } from '@yuvraj04/blogo-common';

// POST api/v1/blog/
// PUT api/v1/blog/:id
// DELETE api/blog/:id
// GET api/v1/blog/:id
// GET api/v1/blog/

const blogRouter = factory.createApp();

/**
 * @openapi
 * /api/v1/blog:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 postId:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
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

/**
 * @openapi
 * /api/v1/blog/{id}:
 *   put:
 *     summary: Update a blog post
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               published:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Blog post updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
blogRouter.put('/:id', async c => {
  const prisma = GetPrismaClient(c.env.DATABASE_URL);
  const body = await c.req.json();
  const blogId = c.req.param('id');
  const { success } = blogInput.safeParse(body);

  if (!success) {
    return c.json({ msg: 'invalid bloginput type' }, 400);
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

/**
 * @openapi
 * /api/v1/blog/{id}:
 *   get:
 *     summary: Get a specific blog post
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog post ID
 *     responses:
 *       200:
 *         description: Blog post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   type: object
 *       500:
 *         description: Server error
 */
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

/**
 * @openapi
 * /api/v1/blog:
 *   get:
 *     summary: Get all blog posts for the authenticated user
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of posts to skip
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of posts to return
 *     responses:
 *       200:
 *         description: Blog posts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 offset:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 msg:
 *                   type: string
 *                 blogs:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Server error
 */
blogRouter.get('/', async c => {
  const prisma = GetPrismaClient(c.env.DATABASE_URL);
  const offset = parseInt(c.req.query('offset') || '0');
  const limit = parseInt(c.req.query('limit') || '10');
  const userId = c.get('JWTPayload').id as string;

  try {
    const blogs = await prisma.post.findMany({
      skip: offset,
      take: limit,

      where: {
        authorId: userId,
      },
    });

    return c.json({
      offset,
      limit,
      msg: 'fetched all blogs',
      blogs,
    });
  } catch (err) {
    return c.json({
      msg: 'unable to fetch the blogs',
      err,
    });
  }
});

/**
 * @openapi
 * /api/v1/blog/{id}:
 *   delete:
 *     summary: Delete a blog post
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog post ID
 *     responses:
 *       200:
 *         description: Blog post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 post:
 *                   type: object
 *       500:
 *         description: Server error
 */
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
