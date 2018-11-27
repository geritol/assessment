import * as uuidv4 from 'uuid/v4';

import { Todo } from '../../types/entities/Todo';
import { copyInstance, todosHandler, validateTodo } from './helpers';

export class TodoStore {
  private onChangeCallback: (todos) => any;
  private todosHandler: any;
  private todos: { [key: string]: Todo };
  private todosList: Todo[];
  private expiringTodoIds: { [key: string]: true };

  constructor(todos: Todo[] = [], onChangeCallback = (_) => undefined) {
    const todosObject = this.createTodosObject(todos);
    this.onChangeCallback = () => {
      this.todosList = this.assembleTodosList();
      this.expiringTodoIds = this.assembleExpiredTodoIds();
      onChangeCallback(this.todosList);
    };
    this.todosHandler = todosHandler(this.onChangeCallback.bind(this));
    this.todos = new Proxy(todosObject, this.todosHandler);
    this.todosList = this.assembleTodosList();
    this.expiringTodoIds = this.assembleExpiredTodoIds();
  }

  public findById(id: string) {
    this.removeExpiredTodos();
    return this.todos[id];
  }
  public findAll() {
    this.removeExpiredTodos();
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
  public update(id: string, fields) {
    const todo = this.todos[id];
    const filteredFields = Object.keys(fields)
      .filter((fieldKey) => Todo.editableProperties.indexOf(fieldKey) !== -1)
      .reduce(
        (filteredResult, key) => ({ ...filteredResult, [key]: fields[key] }),
        {},
      );
    const newTodo = new Todo({ ...todo, ...filteredFields });
    validateTodo(newTodo);
    this.todos[id] = newTodo;
    return newTodo;
  }
  public delete(id: string) {
    delete this.todos[id];
  }

  private removeExpiredTodos() {
    Object.keys(this.expiringTodoIds).forEach((todoId) => {
      const todo = this.todos[todoId];
      const isExpired = todo.expires < new Date();
      if (isExpired) {
        delete this.todos[todoId];
        delete this.expiringTodoIds[todoId];
      }
    });
  }
  private createTodosObject(todos: Todo[]) {
    return todos.reduce((collection, todo) => {
      todo = new Todo(todo);
      validateTodo(todo);
      return {
        ...collection,
        [todo.id]: copyInstance(todo),
      };
    }, {});
  }
  private assembleTodosList() {
    return Object.keys(this.todos).map((todoKey) => this.todos[todoKey]);
  }
  private assembleExpiredTodoIds() {
    return Object.keys(this.todos)
      .filter((todoKey) => this.todos[todoKey].expires)
      .reduce((object, key) => ({ ...object, [key]: true }), {});
  }
}
