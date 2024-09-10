import { Hono } from "hono";
import { verify } from "hono/jwt";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@pritamchak/common-package";



export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string,
    }
}>()



blogRouter.use('/*', async (c, next) => {
    const jwt = c.req.header('Authorization')

    if (!jwt) {
        c.status(403)
        return c.json({ error: "Unauthorized user" })
    }
    //const token = jwt.split(' ')[1]

    const decodedUser = await verify(jwt, c.env.JWT_SECRET)
    if (!decodedUser) {
        c.json(403)
        return c.json({ error: "Unauthorized user" })
    }
    c.set('userId', decodedUser.id);
    await next()
})



blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());


    const authorId = c.get('userId')
    const body = await c.req.json()

    const { success } = createBlogInput.safeParse(body)

    if (!success) {
        c.status(411)
        return c.json("Incorrect Input")
    }

    try {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId,
                date: body.date
            }
        })

        return c.json({ post })
    } catch (error) {
        c.status(403)
        return c.json({ message: "Error while uploading the  post" })
    }
})
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                date: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json(posts)
    } catch (error) {
        c.status(403)
        return c.json({ error: "error while fetching blog posts!!" })
    }
})


blogRouter.get('/:id', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogId = c.req.param('id')

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: blogId
            },
            select: {
                id: true,
                title: true,
                date: true,
                content: true,
                likes: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        c.status(200)
        return c.json({ post })
    } catch (error) {
        c.status(403)
        return c.json({ message: "Error while fetching  post", error })
    }
})


blogRouter.get('/:id/likes', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogId = c.req.param('id')

    try {
        const postLikes = await prisma.post.findFirst({
            where: {
                id: blogId
            },
            select: {
                likes: true,
                isLiked: true,
            }
        })

        c.status(200)
        return c.json({ postLikes })

    } catch (error) {
        c.status(403)
        return c.json({ Error_Message: "Eror while liking the post !!" })
    }


})


blogRouter.put(`/:id/likes`, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogId = c.req.param('id')
    const body = await c.req.json()

    try {
        const postLikes = await prisma.post.update({
            where: {
                id: blogId
            },
            data: {
                likes: body.likes,
                isLiked: body.isLiked
            }
        })
        c.status(200)
        return c.json({ postLikes })

    } catch (error) {
        c.status(403)
        return c.json({ Error_Message: 'Error while liking the post !!' })
    }

})

blogRouter.put('/blog', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());


    const body = await c.req.json()
    const authorId = c.get("userId")
    const { success } = updateBlogInput.safeParse(body)

    if (!success) {
        c.status(411)
        return c.json("Incorrect Input")
    }

    try {
        const updatedPost = await prisma.post.update({
            where: {
                id: body.id,
                authorId: authorId
            },
            data: {
                title: body.title,
                content: body.content
            }
        })

        return c.json({ updatedPost })
    } catch (error) {
        c.status(403)
        return c.json({ message: "Error while updating the  post" })
    }
})

