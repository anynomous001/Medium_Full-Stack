import { Hono } from 'hono';
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>()

app.route("/api/h1/user", userRouter)
app.route("/api/h1/blog", blogRouter)

export default app;
