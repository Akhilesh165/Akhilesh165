const test = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('../server');

test('health endpoint responds successfully', async () => {
  const app = createApp();
  const server = app.listen(0);

  await new Promise((resolve) => server.once('listening', resolve));
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/health`);
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.status, 'ok');
  } finally {
    await new Promise((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  }
});

test('auth register works without a database connection', async () => {
  const app = createApp();
  const server = app.listen(0);

  await new Promise((resolve) => server.once('listening', resolve));
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/auth/register`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username: 'demo@example.com', password: 'secret123' }),
    });

    assert.equal(response.status, 200);
    const body = await response.json();
    assert.ok(body.token);
    assert.equal(body.user.username, 'demo@example.com');
  } finally {
    await new Promise((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  }
});
