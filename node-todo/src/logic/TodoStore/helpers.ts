import { validateSync } from 'class-validator';

import { Todo } from '../../types/entities/Todo';

export const copyInstance = (original) => {
  return Object.assign(
    Object.create(Object.getPrototypeOf(original)),
    original,
  );
};

export const validateTodo = (todo: Todo) => {
  const errors = validateSync(todo);
  if (errors.length > 0) {
    throw new Error('Invalid todo');
  }
};

export const todosHandler = {
  get(todos, id) {
    this.assertTodoExists(todos, id);
    return copyInstance(todos[id]);
  },
  set(todos, id, todo) {
    validateTodo(todo);
    todos[id] = todo;
    return true;
  },
  deleteProperty(todos, id) {
    this.assertTodoExists(todos, id);
    delete todos[id];
    return true;
  },
  assertTodoExists(todos, id) {
    if (!this.todoExists(todos, id)) {
      throw new Error('Todo not found');
    }
  },
  todoExists: (todos, id) => {
    return id in todos;
  },
};
