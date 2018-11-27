import * as request from 'supertest';

import { Container } from 'typedi';
import { TodoStore } from './logic/TodoStore';
import { Todo } from './types/entities';

const createServer = (todos = []) => {
  Container.set(TodoStore, new TodoStore(todos));
  const app = require('./app').default;
  return request(app.listen());
};

describe('app', () => {
  describe('todos', () => {
    test('GET /todos - should respond with 200', async () => {
      const response = await createServer().get('/todos');
      expect(response.statusCode).toBe(200);
    });
    test('GET /todos/nonexistent - should respond with 404', async () => {
      const response = await createServer().get('/todos/nonexistent');
      expect(response.statusCode).toBe(404);
    });
    test('GET /todos/existing - should respond with the todo', async () => {
      const testTodoId = 'existing';
      const server = createServer([new Todo({ text: 'test', id: testTodoId })]);
      const response = await server.get(`/todos/${testTodoId}`);
      expect(response.statusCode).toBe(200);
      const receivedTodo = JSON.parse(response.text);
      expect(receivedTodo.id).toBe(testTodoId);
    });
    test('PUT /todos/nonexistent - should respond with 404', async () => {
      const response = await createServer().put('/todos/nonexistent');
      expect(response.statusCode).toBe(404);
    });
    test('PUT /todos/existing - should the updated todo', async () => {
      const testTodoId = 'existing';
      const testModifiedText = 'test are awesome';
      const server = createServer([new Todo({ text: 'test', id: testTodoId })]);
      const response = await server.put(`/todos/${testTodoId}`).send({
        text: testModifiedText,
      });
      expect(response.statusCode).toBe(200);
      const modifiedTodo = JSON.parse(response.text);
      expect(modifiedTodo.text).toBe(testModifiedText);
    });
    test('PUT /todos/existing - with invalid values should get 400', async () => {
      const testTodoId = 'existing';
      const testModifiedText = 'test are awesome 0';
      const server = createServer([new Todo({ text: 'test', id: testTodoId })]);
      const response = await server.put(`/todos/${testTodoId}`).send({
        text: testModifiedText,
      });
      expect(response.statusCode).toBe(400);
    });
    test('DELETE /todos/nonexistent - should respond with 404', async () => {
      const response = await createServer().delete('/todos/nonexistent');
      expect(response.statusCode).toBe(404);
    });
    test('DELETE /todos/existing - should respond with 200 and delete the todo from the collection', async () => {
      const testTodoId = 'existing';
      const server = createServer([new Todo({ text: 'test', id: testTodoId })]);
      const response = await server.delete(`/todos/${testTodoId}`);
      expect(response.statusCode).toBe(200);
      const listAllResponse = await server.get('/todos');
      const todoList = JSON.parse(listAllResponse.text);
      expect(todoList.length).toBe(0);
    });
    test('POST /todos - should create a todo', async () => {
      const server = createServer();
      const testText = 'test';
      const createResponse = await server
        .post('/todos')
        .send({ text: testText });
      expect(createResponse.statusCode).toBe(201);
      const listAllResponse = await server.get('/todos');
      const todoList = JSON.parse(listAllResponse.text);
      expect(todoList.length).toBe(1);
      expect(todoList[0].text).toBe(testText);
    });
    test('POST /todos - invalid todo should get 400', async () => {
      const server = createServer();
      const createResponse = await server.post('/todos').send({ text: '333' });
      expect(createResponse.statusCode).toBe(400);
    });
  });
});
