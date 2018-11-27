import { Todo } from '../../types/entities';
import { TodoStore } from './';

describe('TodoStore', () => {
  test('new store created with no arguments should have an empty list for todos', () => {
    const todoStore = new TodoStore();
    const todos = todoStore.findAll();
    expect(todos).toEqual([]);
  });
  test('todo list should be immutable', () => {
    const todoStore = new TodoStore();
    const todos = todoStore.findAll();
    const todo = new Todo();
    todos.push(todo);
    const todosAferMutation = todoStore.findAll();
    expect(todosAferMutation).toEqual([]);
  });
  test('should be initialisable with a list of Todos', () => {
    const todosList = [new Todo(), new Todo()];
    todosList[0].id = '1';
    todosList[0].text = 'test';
    todosList[1].id = '2';
    todosList[1].text = 'test';
    const todoStore = new TodoStore(todosList);
    const todos = todoStore.findAll();
    expect(todos).toEqual(todosList);
  });
  test("should'nt be initialisable with an invalid list of Todos", () => {
    const todosList = [new Todo(), new Todo()];
    expect(() => new TodoStore(todosList)).toThrow();
  });
  describe('.add()', () => {
    test('adding a valid todo should return its id', () => {
      const todoStore = new TodoStore();
      const todo = new Todo();
      todo.text = 'should test the code';
      const todoId = todoStore.add(todo);
      expect(typeof todoId).toBe('string');
    });
    test('valid todo should be added to the todos', () => {
      const todoStore = new TodoStore();
      const todo = new Todo();
      todo.text = 'should test the code';
      todoStore.add(todo);
      const todos = todoStore.findAll();
      delete todos[0].id;
      expect(todos).toEqual([todo]);
    });
    test('error should be thrown when adding an invalid todo', () => {
      const todoStore = new TodoStore();
      const todo = new Todo();
      expect(() => todoStore.add(todo)).toThrow();
    });
  });
  describe('.findById()', () => {
    test('error should be thrown if todo not found', () => {
      const todoStore = new TodoStore();
      expect(() => todoStore.findById('1')).toThrow();
    });
    test('should return a todo item by id', async () => {
      const todoStore = new TodoStore();
      const todo = new Todo();
      todo.text = 'should test the code';
      const todoId = await todoStore.add(todo);
      expect(todoStore.findById(todoId).text).toBe(todo.text);
    });
  });
  describe('.delete()', () => {
    test('error should be thrown if todo not found', () => {
      const todoStore = new TodoStore();
      expect(() => todoStore.delete('1')).toThrow();
    });
    test('should delete todo from collection', async () => {
      const todoStore = new TodoStore();
      const todo = new Todo();
      todo.text = 'should test the code';
      const todoId = await todoStore.add(todo);
      todoStore.delete(todoId);
      const todos = todoStore.findAll();
      expect(todos).toEqual([]);
    });
  });
});
