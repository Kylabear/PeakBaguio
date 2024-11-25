const request = require('supertest');
const app = require('./app');

test('GET /greet returns greeting message', async () => {
  const response = await request(app).get('/greet');
  expect(response.status).toBe(200);
  expect(response.body.message).toBe('Hello, Node.js!');
});
