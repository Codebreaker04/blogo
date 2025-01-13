/** @format */
import { createFactory } from 'hono/factory';
import { JWTPayload } from 'hono/utils/jwt/types';
import { verify } from 'hono/jwt';

type Env = {
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    JWTPayload: JWTPayload;
  };
};

export const factory = createFactory<Env>();

export const middleware = factory.createMiddleware(async (c, next) => {
  const header = c.req.header('authorization') || '';

  if (!header) {
    return c.json({ error: 'Authorization header missing' }, 401);
  }

  let token = header;

  if (!header.startsWith('Bearer ')) {
    return c.json({ msg: 'User is not allowed' }, 403);
  }

  token = header.split(' ')[1];
  try {
    const response = await verify(token, c.env.JWT_SECRET);
    c.set('JWTPayload', response);

    if (!response.id) c.json({ msg: 'User is not Authorized' }, 403);
    await next();
  } catch (err) {
    return c.json({
      err,
    });
  }
});
