import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from "hono/jwt";
import { signinInput, signupInput, updateUserInput } from "@pritamchak/common-package"

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




userRouter.post('/auth', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json()
    const { success, error } = signupInput.safeParse(body)




    let zodErrors = {};
    if (!success) {
        error.issues.forEach((issue) => {
            zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
        })


        c.status(403)
        return c.json(
            Object.keys(zodErrors).length > 0 ? { errors: zodErrors } : { success: true }
        )
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
        c.status(200)
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
                about: true,
                posts: true,
                likedPost: {
                    include: {
                        post: true
                    }
                },
                SavedPost: {
                    select: {
                        post: true
                    }
                }
            }
        })

        return c.json({ user })

    } catch (error) {
        c.status(403)
        return c.json({ error: "error while fetching user details!!" })
    }
})


userRouter.put('/details', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get('userId')
    const body = await c.req.json()

    const { success } = updateUserInput.safeParse(body)

    if (!success) {
        c.status(411)
        console.log('validated')
        return c.json("Incorrect Input")
    }


    try {
        const response = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name: body.name,
                password: body.password,
                email: body.email,
                about: body.about
            }
        })

        c.status(200)
        return c.json({ message: 'User Details Updated', response })
    } catch (error) {
        c.status(403)
        return c.json({ message: 'Error Occurred', error })
    }
})