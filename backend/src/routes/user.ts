import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from "hono/jwt";
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


userRouter.use('/details', async (c, next) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());


    const jwt = c.req.header('Authorization')

    if (!jwt) {
        c.status(403)
        return c.json({ error: "Unauthorized User" })
    }

    const decodedUser = await verify(jwt, c.env.JWT_SECRET)

    if (!decodedUser) {
        c.status(403)
        return c.json({ error: "User Does not Exist!" })
    }

    c.set('userId', decodedUser.id);
    await next()

})


userRouter.get('/details', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const authorId = c.get("userId")


    try {

        const user = await prisma.user.findFirst({
            where: {
                id: authorId
            },
            select: {
                id: true,
                email: true,
                password: true,
                name: true,
                posts: true,
            }
        })

        return c.json({ user })

    } catch (error) {
        c.status(403)
        return c.json({ error: "error while fetching user details!!" })


    }



})