import { BaseContext } from 'koa';

export default class TodoController {
  public static async getTodos(ctx: BaseContext) {
    ctx.body = 'Hello World!';
  }

  public static async getTodo(ctx: BaseContext) {
    ctx.body = 'Hello World!';
  }

  public static async create(ctx: BaseContext) {
    ctx.body = 'Hello World!';
  }

  public static async update(ctx: BaseContext) {
    ctx.body = 'Hello World!';
  }

  public static async delete(ctx: BaseContext) {
    ctx.body = 'Hello World!';
  }
}
