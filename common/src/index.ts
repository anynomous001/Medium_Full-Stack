import z from 'zod'

export const signupInput = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    about: z.string().optional()
})
export type SignupType = z.infer<typeof signupInput>;

export const updateUserInput = z.object({
    name: z.string().optional(),
    email: z.string().email("Please enter a valid email address").optional(),
    password: z.string().min(6, "password must be atleast 6 characters long").optional(),
    about: z.string().optional()
})

export type UpdateUserType = z.infer<typeof updateUserInput>



export const signinInput = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
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


export const commentInput = z.object({
    content: z.string()
})

export type commentInputType = z.infer<typeof commentInput>