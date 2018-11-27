import * as Koa from 'koa';
const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

app.listen(3000);

console.log('Server running on port 3000'); // tslint:disable-line:no-console
