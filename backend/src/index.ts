/** @format */

import { Hono } from 'hono';
import { swaggerUI } from '@hono/swagger-ui';
import mainRouter from './routes/index';
import { openApiSpec } from './routes/doc';

const app = new Hono();

// Serve Swagger UI with the OpenAPI spec
app.get(
  '/ui',
  swaggerUI({
    url: '/doc',
    title: 'Blogo API Documentation',
  })
);

// Serve OpenAPI spec
app.get('/doc', c => {
  return c.json(openApiSpec);
});

app.route('/api/v1', mainRouter);

export default app;

