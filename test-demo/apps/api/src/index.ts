import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

// Middleware
app.use('/*', cors());

// Routes
app.get('/', (c) => {
  return c.json({ 
    message: 'Welcome to the API',
    status: 'healthy'
  });
});

app.get('/health', (c) => {
  return c.json({ status: 'ok' });
});

const port = process.env.PORT || 3001;
console.log(`🚀 Server running on http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
