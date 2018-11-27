import { validate } from 'class-validator';
import * as uuidv4 from 'uuid/v4';

import { Todo } from '../../types/entities/Todo';

export class TodoStore {
  private todos: { [key: string]: Todo } = {};

  public findById(id: string) {
    if (!this.todoExists(id)) {
      throw new Error('Todo not found');
    }
    return this.copyInstance(this.todos[id]);
  }
  public findAll() {
    // Todo: implement a caching mechanism to improove performance
    return Object.keys(this.todos).map((todoKey) => this.todos[todoKey]);
  }
  public async add(todo: Todo) {
    const todoCopy = this.copyInstance(todo);
    todoCopy.id = uuidv4();
    await this.validateTodo(todoCopy);
    if (this.todoExists(todoCopy)) {
      return this.add(todo);
    }
    this.todos[todoCopy.id] = todoCopy;
    return todoCopy.id;
  }
  public delete(id: string) {
    if (!this.todoExists(id)) {
      throw new Error('Todo not found');
    }
    delete this.todos[id];
  }

  private todoExists(id: string) {
    return id in this.todos;
  }
  private async validateTodo(todo: Todo) {
    const errors = await validate(todo);
    if (errors.length > 0) {
      throw new Error('Invalid todo');
    }
  }
  private copyInstance(original) {
    return Object.assign(
      Object.create(Object.getPrototypeOf(original)),
      original,
    );
  }
}
