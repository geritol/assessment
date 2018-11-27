import { BaseContext } from 'koa';
import { Container } from 'typedi';

import { TodoStore } from '../logic/TodoStore';
import { Todo } from '../types/entities';

export default class TodoController {
  public static async getTodos(ctx: BaseContext) {
    const todoStore = Container.get(TodoStore);
    ctx.body = todoStore.findAll();
  }

  public static async getTodo(ctx: BaseContext) {
    const todoStore = Container.get(TodoStore);
    try {
      ctx.body = todoStore.findById(ctx.params.id);
    } catch (error) {
      ctx.status = 404;
    }
  }

  public static async create(ctx: BaseContext) {
    const todoStore = Container.get(TodoStore);
    const todo = new Todo(ctx.request.body);
    const id = todoStore.add(todo);
    ctx.status = 201;
    ctx.body = todoStore.findById(id);
  }

  public static async update(ctx: BaseContext) {
    const todoStore = Container.get(TodoStore);
    try {
      ctx.body = todoStore.update(ctx.params.id, ctx.request.body);
    } catch (error) {
      ctx.status = 404;
    }
  }

  public static async delete(ctx: BaseContext) {
    const todoStore = Container.get(TodoStore);
    try {
      todoStore.delete(ctx.params.id);
      ctx.status = 200;
    } catch (error) {
      ctx.status = 404;
    }
  }
}
