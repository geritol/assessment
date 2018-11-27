import * as request from 'supertest';

import app from './app';

describe('app', () => {
  test('GET /todos - should respond with 200', async () => {
    const response = await request(app.listen()).get('/todos');
    expect(response.statusCode).toBe(200);
  });
});
