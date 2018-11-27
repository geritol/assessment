import * as uuidv4 from 'uuid/v4';

import { Todo } from '../../types/entities/Todo';
import { copyInstance, todosHandler, validateTodo } from './helpers';

export class TodoStore {
  private onChangeCallback: (todos) => any;
  private todosHandler: any;
  private todos: { [key: string]: Todo };
  private todosList: Todo[];

  constructor(todos: Todo[] = [], onChangeCallback = (_) => undefined) {
    const todosObject = this.createTodosObject(todos);
    this.onChangeCallback = () => {
      this.assembleTodosList();
      onChangeCallback(this.todosList);
    };
    this.todosHandler = todosHandler(this.onChangeCallback.bind(this));
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
    this.todosList = Object.keys(this.todos).map(
      (todoKey) => this.todos[todoKey],
    );
  }
}
