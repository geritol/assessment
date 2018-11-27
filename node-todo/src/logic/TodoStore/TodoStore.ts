import { validate } from 'class-validator';
import * as uuidv4 from 'uuid/v4';

import { Todo } from '../../types/entities/Todo';

export class TodoStore {
  private todos: Todo[] = [];
  public findAll() {
    return [...this.todos];
  }
  public async add(todo: Todo) {
    const todoCopy = this.copyInstance(todo);
    todoCopy.id = uuidv4();
    await this.validateTodo(todoCopy);
    this.todos.push(todoCopy);
    return todoCopy.id;
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
