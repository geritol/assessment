import * as uuidv4 from 'uuid/v4';

import { Todo } from '../../types/entities/Todo';
import { copyInstance, todosHandler, validateTodo } from './helpers';

export class TodoStore {
  private todosHandler = todosHandler(this.assembleTodosList.bind(this));
  private todos: { [key: string]: Todo };
  private todosList: Todo[];

  constructor(todos: Todo[] = []) {
    const todosObject = this.createTodosObject(todos);
    this.todos = new Proxy(todosObject, this.todosHandler);
    this.assembleTodosList();
  }

  public findById(id: string) {
    return this.todos[id];
  }
  public findAll() {
    return [...this.todosList];
  }
  public add(todo: Todo) {
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
  private createTodosObject(todos: Todo[]) {
    return todos.reduce((collection, todo) => {
      validateTodo(todo);
      return {
        ...collection,
        [todo.id]: copyInstance(todo),
      };
    }, {});
  }
  private assembleTodosList() {
    this.todosList = Object.keys(this.todos).map(
      (todoKey) => this.todos[todoKey],
    );
  }
}
