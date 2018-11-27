import * as uuidv4 from 'uuid/v4';

import { Todo } from '../../types/entities/Todo';
import { copyInstance, todosHandler } from './helpers';

export class TodoStore {
  private todos: { [key: string]: Todo } = new Proxy({}, todosHandler);

  public findById(id: string) {
    return this.todos[id];
  }
  public findAll() {
    // Todo: implement a caching mechanism to improove performance
    return Object.keys(this.todos).map((todoKey) => this.todos[todoKey]);
  }
  public async add(todo: Todo) {
    const todoCopy = copyInstance(todo);
    todoCopy.id = uuidv4();
    if (todoCopy.id in this.todos) {
      return this.add(todo);
    }
    this.todos[todoCopy.id] = todoCopy;
    return todoCopy.id;
  }
  public delete(id: string) {
    delete this.todos[id];
  }
}
