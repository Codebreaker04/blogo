/** @format */

import { hashSync } from 'bcrypt-ts';
import { factory, middleware } from '../factory';
import { GetPrismaClient } from '../prismaClient';

const userRouter = factory.createApp();

// GET /api/user/profile
// PUT /api/user/profile/email
// PUT /api/user/profile/username
// PUT /api/user/profile/password
// DELETE /api/user/:userId

userRouter.get('/profile', async c => {
  const prisma = GetPrismaClient(c.env.DATABASE_URL);
  const userId = c.get('JWTPayload').id as string;

  try {
    const profile = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
        username: true,
      },
    });

    return c.json({
      msg: 'profile fetched successfully',
      profile,
    });
  } catch (err) {
    return c.json(
      {
        msg: 'unable to fetch profile',
        err,
      },
      500
    );
  }
});

userRouter.put('/profile/email', async c => {
  const prisma = GetPrismaClient(c.env.DATABASE_URL);
  const body = await c.req.json();
  const userId = c.get('JWTPayload').id as string;
  console.log(userId);

  if (body.email) {
    try {
      const updatedFeild = await prisma.user.update({
        where: { id: userId },
        data: { email: body.email },
      });

      return c.json({
        msg: 'email updated successfully',
        updatedEmail: updatedFeild.email,
      });
    } catch (e) {
      return c.json({
        msg: 'email already exist',
      });
    }
  }
});

userRouter.put('/profile/username', async c => {
  const prisma = GetPrismaClient(c.env.DATABASE_URL);
  const body = await c.req.json();
  const userId = c.get('JWTPayload').id as string;

  if (body.username) {
    try {
      const updatedFeild = await prisma.user.update({
        where: { id: userId },
        data: { username: body.username },
      });

      return c.json({
        msg: 'username updated successfully',
        updatedUsername: updatedFeild.username,
      });
    } catch (e) {
      return c.json({
        msg: 'username already exist',
      });
    }
  }
});

userRouter.put('/profile/password', async c => {
  const prisma = GetPrismaClient(c.env.DATABASE_URL);
  const body = await c.req.json();
  const userId = c.get('JWTPayload').id as string;

  if (body.password) {
    const hashedPass = hashSync(body.password, 10);
    try {
      const updatedFeild = await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPass },
      });

      return c.json({
        msg: 'password updated successfully',
      });
    } catch (err) {
      return c.json({
        msg: 'password update failed',
        err,
      });
    }
  }
});

export default userRouter;
