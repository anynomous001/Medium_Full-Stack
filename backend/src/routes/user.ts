import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@pritamchak/common-package"

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        userId: string,
    }
}>()

// app.use('*', async (c, next) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());
//   c.set('prisma', prisma);
//   await next()
// })




userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json()
    const { success } = signupInput.safeParse(body)

    if (!success) {
        c.status(411)
        return c.json("Incorrect Input")
    }


    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        })

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt })

    } catch (error) {
        c.status(403)
        return c.json({ error });
    }
})

userRouter.post('/signin', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json()

    const { success } = signinInput.safeParse(body)

    if (!success) {
        c.status(411)
        return c.json("Incorrect2 Input")
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })

        if (!user) {
            c.status(403);
            return c.json({ error: "user not found" });
        }
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
        return c.json({ jwt, user })

    } catch (error) {
        c.status(403)
        return c.json({ error });
    }
})


userRouter.get('/user', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());




})