import z from 'zod'

export const signupInput = z.object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
    about: z.string().optional()
})
export type SignupType = z.infer<typeof signupInput>;

export const updateUserInput = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    about: z.string().optional()
})

export type UpdateUserType = z.infer<typeof updateUserInput>



export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export type SigninType = z.infer<typeof signinInput>

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})

export type createBlogType = z.infer<typeof createBlogInput>;
export const updateBlogInput = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string()
})
export type updateBlogType = z.infer<typeof updateBlogInput>;