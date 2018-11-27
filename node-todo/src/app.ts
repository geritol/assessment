import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';

import { router } from './routes';

const app = new Koa();
app.use(bodyParser());
app.use(router.routes());

export default app;
