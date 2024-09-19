import { useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";



const Auth2 = () => {

    const { register, handleSubmit, getValues, reset, formState: { errors, isSubmitting } } = useForm()

    const onSubmit = async () => {



        await new Promise((resolve) => setTimeout(resolve, 300))

        reset()
    }


    return (
        <div className="bg-white-200 h-screen flex justify-center items-center flex-col "  >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Label htmlFor="name">Name</Label>
                <Input
                    id='name'
                    type="text"
                    placeholder="Name"
                    {...register('text', { required: 'Name is required' })}
                />
                {errors.text && (
                    <p className="text-red-500">{`${errors.text.message}`}</p>
                )}

                <Label htmlFor="username">username</Label>
                <Input id='username'
                    type="email"
                    placeholder="username"
                    {...register("email", {
                        required: "Email is required"
                    })}
                />
                {
                    errors.email && <p className="text-red-500">{`${errors.email.message}`}</p>
                }

                <Label htmlFor="password">password</Label>
                <Input
                    id='password'
                    type="password"
                    placeholder="password"

                    {...register("password", {
                        required: "password is required",
                        minLength: {
                            value: 5,
                            message: "Password must be at least 5 characters long"
                        }
                    })}
                />
                {
                    errors.password && <p className="text-red-500">{`${errors.password.message}`}</p>
                }
                <Label htmlFor="confirmPassword">Confirm Password </Label>
                <Input
                    {...register("confirmPassword", {
                        required: "Confirm password is required",
                        validate: (value) =>
                            value === getValues("password") || "Passwords must match",
                    })}
                    type="password"
                    placeholder="Confirm password"
                    className="px-4 py-2 rounded"
                />
                {errors.confirmPassword && (
                    <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
                )}


                <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
                    variant={'ghost'}
                >
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default Auth2