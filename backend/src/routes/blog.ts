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
        datasourceUrl: c.env.DATABASE_URL,
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



blogRouter.get('/:id', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogId = c.req.param('id')
    const userId = c.get('userId')

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
                /*Explanation :post.findUnique: Fetches the post by postId.
                  include { likedBy: { where: { userId: userId } } }: Filters the likedBy relationship to 
                 only include entries where the userId matches the current user.
                 isLikedByUser: If the user has liked the post, the likedBy array will contain one 
                 or more entries; otherwise, it will be empty. */
                likedBy: {
                    where: { userId: userId }
                },
                /*explanation :  _count: Counts the number of users who have liked the post.
            likedBy: { where: { userId: userId } }: Filters the likedBy relationship to check if 
           the user has liked the post.If the likedBy array has entries, the user has liked the post; otherwise,
            they haven't. */
                _count: {
                    select: {
                        likedBy: true
                    }
                },
                author: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            }
        })


        const hasliked = post ? post.likedBy.length > 0 : false
        c.status(200)
        return c.json({ post, hasliked })
    } catch (error) {
        c.status(403)
        return c.json({ message: "Error while fetching  post", error })
    }
})

blogRouter.post('/:id/likes', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogId = c.req.param('id')
    const userId = c.get('userId')

    const body = c.req.json()

    try {
        const response = await prisma.likedPost.create({
            data: {
                userId: userId,
                postId: blogId
            }
        })

        c.status(200)
        return c.json({ Message: 'Post Liked :)', response })

    } catch (error) {
        c.status(403)
        return c.json({ Message: error })
    }

})

blogRouter.get('/:id/likes/count', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogId = c.req.param('id')

    try {
        // const likeCount = await prisma.likedPost.count({
        //     where: {
        //         postId: blogId
        //     }
        // })
        const postWithLikeCount = await prisma.post.findUnique({
            where: {
                id: blogId // The ID of the post you're fetching
            },
            include: {
                _count: {
                    select: {
                        likedBy: true  // Count the number of entries in the `likedBy` relationship (likes)
                    }
                }
            }
        });

        console.log(postWithLikeCount);


        // const post = await prisma.post.findUnique({
        //     where: {
        //         id: blogId
        //     },
        //     include: {
        //         _count: {
        //             select: {
        //                 likedBy: true
        //             }
        //         }
        //     }
        // })

        // const likeCount = post?._count.likedBy


        /*Explanation : Both methods you’ve provided for counting likes on a post are valid, 
        but they work slightly differently in terms of **how** they interact with the Prisma 
        Client and database.
        
        Let’s break down both methods in detail:
        
        ### 1. **Using `prisma.likedPost.count()`**
        
        ```ts
        const likeCount = await prisma.likedPost.count({
          where: {
            postId: blogId
          }
        });
        ```
        
        **Explanation:**
        
        - **`likedPost.count()`**: This method counts the number of rows in the `LikedPost` table 
        where the `postId` matches the given `blogId`.
          
        - **Behind the Scenes**: 
          - `prisma.likedPost.count()` directly queries the `LikedPost` table, where each record 
          represents a user who liked a post.
          - It's a simple query to count the number of entries that correspond to the specified 
          `postId`.
          
        - **Query Generated**: In SQL terms, it generates something like:
          
          ```sql
          SELECT COUNT(*) 
          FROM "LikedPost"
          WHERE "postId" = 'blogId';
          ```
        
        - **Performance**: 
          - Since this query is targeting only the `LikedPost` table and counting the rows where 
          `postId = blogId`, it’s a more efficient query, especially if you’re only interested in
           the like count.
          - It’s a **direct count** on the join table, without fetching the entire `Post` record.
        
        ### 2. **Using `findUnique()` with `_count`**
        
        ```ts
        const post = await prisma.post.findUnique({
          where: {
            id: blogId
          },
          include: {
            _count: {
              select: {
                likedBy: true
              }
            }
          }
        });
        
        const likeCount = post?._count.likedBy;
        ```
        
        **Explanation:**
        
        - **`post.findUnique()`**: This method fetches a single `Post` record based on its `id`
         (`blogId` in this case).
          
        - **`_count` with `select: { likedBy: true }`**: This tells Prisma to include a count of
         how many records exist in the `LikedPost` join table that are linked to this `Post`. 
         Specifically, it counts how many `likedBy` relations (from the join table `LikedPost`)
          the `Post` has.
        
        - **Behind the Scenes**:
          - Prisma performs a query on the `Post` table but also joins with the `LikedPost` table 
          to count the related `likedBy` records.
          - It retrieves the `Post` itself along with the count of the `likedBy` relation.
        
        - **Query Generated**: In SQL terms, it generates something like this:
          
          ```sql
          SELECT 
            "Post".*,
            (SELECT COUNT(*)
             FROM "LikedPost"
             WHERE "LikedPost"."postId" = "Post"."id") AS "likedBy"
          FROM "Post"
          WHERE "Post"."id" = 'blogId';
          ```
        
        - **Performance**: 
          - This query is slightly heavier because it retrieves the entire `Post` record in addition 
          to counting the `likedBy` relations.
          - This method is more useful if you want to fetch both the post details **and** the like 
          count at the same time. However, if you only need the like count, the first method is more 
          efficient.
        
        ### Comparison Between the Two Approaches
        
        | Feature                              | `likedPost.count()`                                             | `post.findUnique()` with `_count`                                |
        |--------------------------------------|-----------------------------------------------------------------|-----------------------------------------------------------------|
        | **What it counts**                   | Counts rows in the `LikedPost` table for the given `postId`.     | Fetches the `Post` and counts related `likedBy` records (likes). |
        | **Tables Queried**                   | Only the `LikedPost` table.                                     | Queries both the `Post` and `LikedPost` tables.                 |
        | **Performance**                      | More efficient if you only need the count (direct row count).    | Heavier because it fetches the post and counts relations.        |
        | **Use Case**                         | Best when you only need the like count.                         | Best when you need both post details and the like count.         |
        | **SQL Query**                        | Simple `COUNT(*)` query on `LikedPost`.                         | Joins `Post` and counts related `LikedPost` rows.                |
        
        ### How the `count()` Method Works in Prisma
        
        - The `count()` method in Prisma is used to count rows in a table that match a given condition.
         You provide a `where` condition, and Prisma runs an SQL `COUNT(*)` query under the hood.
        
        - **Example:**
          - When you use `prisma.likedPost.count({ where: { postId: blogId } })`, it directly generates 
          a `COUNT(*)` SQL query on the `LikedPost` table, filtered by the `postId`.
          - This is a **direct query** to the database and doesn't involve fetching related data unless 
          explicitly required.
        
        ### How the `_count` Field Works in Prisma
        
        - The `_count` field is used to **count related records** when you're querying a parent model 
        (`Post` in this case).
          
        - When you specify `_count: { select: { likedBy: true } }`, Prisma fetches the `Post` and counts
         the number of `LikedPost` records that are related to that `Post` through the `likedBy` relation.
        
        - This approach is helpful when you want to **fetch both the parent record (Post) and count of
         related records** (like the number of likes) in one query. But it’s slightly more complex and 
         performs additional joins, which can make it less efficient if you only need the count.
        
        ### Which Approach to Use?
        
        - **If you only need the like count**: Use `prisma.likedPost.count()` as it’s more efficient
         and directly counts the entries in the `LikedPost` table.
        - **If you need both the post data and the like count**: Use `post.findUnique()` with `_count` 
        to get both the post details and the count of likes in a single query.
        
        By understanding the differences between the two approaches, you can choose the one that fits
         your specific use case and performance needs. */

        c.status(200)
        return c.json(postWithLikeCount)

    } catch (error) {
        c.status(403)
        return c.json({ message: 'Some error took place !', error })

    }
})

blogRouter.post('/:id/like-toggle', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const postId = c.req.param('id')
    const userId = c.get('userId')



    try {
        const hasliked = await prisma.likedPost.findFirst({
            where: {
                postId,
                userId
            },
        })

        var likeCount = 0

        if (hasliked) {
            await prisma.likedPost.delete({
                where: {
                    id: hasliked.id
                }
            })


            likeCount = await prisma.likedPost.count({
                where: {
                    postId
                }
            })

            console.log('post unliked')
        } else {
            await prisma.likedPost.create({
                data: {
                    postId,
                    userId
                }
            })


            likeCount = await prisma.likedPost.count({
                where: {
                    postId
                }
            })

            console.log('post liked')
        }


        const haslikedNow = !hasliked
        console.log(haslikedNow, likeCount)
        c.status(200)
        return c.json({ hasliked: haslikedNow, likeCount })
    } catch (error) {

    }




})

blogRouter.delete('/:id', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const postId = c.req.param('id')  // Replace this with the actual post ID

    try {
        const response = await prisma.post.delete({
            where: {
                id: postId
            }
        });
        c.status(200)
        return c.json({ response, message: 'Post Deleted :(' })
    } catch (error) {
        c.status(403)
        return c.json({ message: "Error while deleting the post", error })
    }



})


// blogRouter.get('/:id/likes', async (c) => {

//     const prisma = new PrismaClient({
//         datasourceUrl: c.env?.DATABASE_URL,
//     }).$extends(withAccelerate());

//     const blogId = c.req.param('id')

//     try {
//         const postLikes = await prisma.post.findFirst({
//             where: {
//                 id: blogId
//             },
//             select: {
//                 likes: true,
//                 isLiked: true,
//             }
//         })

//         c.status(200)
//         return c.json({ postLikes })

//     } catch (error) {
//         c.status(403)
//         return c.json({ Error_Message: "Eror while liking the post !!" })
//     }


// })


// blogRouter.put(`/:id/likes`, async (c) => {
//     const prisma = new PrismaClient({
//         datasourceUrl: c.env?.DATABASE_URL,
//     }).$extends(withAccelerate());

//     const blogId = c.req.param('id')
//     const body = await c.req.json()

//     try {
//         const postLikes = await prisma.post.update({
//             where: {
//                 id: blogId
//             },
//             data: {
//                 likes: body.likes,
//                 isLiked: body.isLiked
//             }
//         })
//         c.status(200)
//         return c.json({ postLikes })

//     } catch (error) {
//         c.status(403)
//         return c.json({ Error_Message: 'Error while liking the post !!' })
//     }

// })



