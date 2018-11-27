import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';

import { router } from './routes';
import { NotFoundError, ValidationError } from './types/errors';

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

app.use(bodyParser());
app.use(router.routes());

app.on('error', (error, ctx) => {
  if (error instanceof NotFoundError) {
    ctx.status = 404;
  } else if (error instanceof ValidationError) {
    ctx.status = 400;
    ctx.body = error.details;
  } else {
    console.log(error); // tslint:disable-line:no-console
  }
});

export default app;
