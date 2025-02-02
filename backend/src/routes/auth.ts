/** @format */

import { GetPrismaClient } from '../prismaClient';
import { compareSync, hashSync } from 'bcrypt-ts';
import { sign } from 'hono/jwt';
import { factory } from '../factory';
import { signinInput } from '@yuvraj04/blogo-common';
import { signupInput } from '@yuvraj04/blogo-common';

// POST api/v1/auth/signup
// POST api/v1/auth/signin
const authRouter = factory.createApp();

authRouter.post('/signup', async c => {
  const prisma = GetPrismaClient(c.env.DATABASE_URL);
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);

  if (!success) {
    return c.json({ msg: 'invalid credential type' }, 400);
  }

  const isUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (isUser) {
    return c.json(
      { msg: 'user with this email already exist try Signing in' },
      400
    );
  }

  const hashedPass = hashSync(body.password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        username: body.username,
        password: hashedPass,
      },
    });

    const token = await sign(
      { id: user.id, email: user.email },
      c.env.JWT_SECRET
    );
    return c.json(
      {
        token: token,
        msg: 'user created',
        // user: user,
      },
      201
    );
  } catch (err) {
    return c.json({
      msg: 'signup failed pls try after some time',
      err,
    });
  }
});

authRouter.post('/signin', async c => {
  const prisma = GetPrismaClient(c.env.DATABASE_URL);
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);

  if (!success) {
    return c.json({ msg: 'invalid credential type' }, 400);
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return c.json({ msg: 'user does not exist try signing up' }, 400);
  }

  const userAuthorized = compareSync(body.password, user.password);

  if (userAuthorized) {
    const token = await sign(
      { id: user.id, email: user.email },
      c.env.JWT_SECRET
    );
    return c.json(
      {
        token: token,
      },
      201
    );
  }

  return c.json(
    {
      msg: 'invalid password',
    },
    401
  );
});

export default authRouter;
