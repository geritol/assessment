import { validateSync } from 'class-validator';

import { Todo } from '../../types/entities/Todo';
import { NotFoundError, ValidationError } from '../../types/errors';

export const copyInstance = (original) => {
  return Object.assign(
    Object.create(Object.getPrototypeOf(original)),
    original,
  );
};

export const validateTodo = (todo: Todo) => {
  const errors = validateSync(todo);
  if (errors.length > 0) {
    throw new ValidationError('Invalid todo', errors);
  }
};

export const todosHandler = (handleChangeCallback) => ({
  get(todos, id) {
    this.assertTodoExists(todos, id);
    return copyInstance(todos[id]);
  },
  set(todos, id, todo) {
    if (todo.done) {
      todo.expires = new Date(Date.now() + 5 * 60 * 1000);
    } else {
      delete todo.expires;
    }
    validateTodo(todo);
    todos[id] = todo;
    handleChangeCallback();
    return true;
  },
  deleteProperty(todos, id) {
    this.assertTodoExists(todos, id);
    delete todos[id];
    handleChangeCallback();
    return true;
  },
  assertTodoExists(todos, id) {
    if (!this.todoExists(todos, id)) {
      throw new NotFoundError('Todo not found', { todos, id });
    }
  },
  todoExists: (todos, id) => {
    return id in todos;
  },
});
