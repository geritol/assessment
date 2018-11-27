import * as request from 'supertest';

import app from './app';

describe('app', () => {
  test('GET / - should respond with 200', async () => {
    const response = await request(app.listen()).get('/');
    expect(response.statusCode).toBe(200);
  });
});
