import { SignupType } from '@pritamchak/common-package';
import axios, { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupInput } from "@pritamchak/common-package";

const Auth = ({ type }: { type: 'signin' | 'signup' }) => {
    const navigate = useNavigate()
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<SignupType>({
        resolver: zodResolver(signupInput),
    })

    const onSubmit = async (data: SignupType) => {

        try {
            const response = await axios.post(`${BACKEND_URL}/api/h1/user/auth`, data)
            navigate('/blogs')
            localStorage.setItem('token', response.data.jwt)
        } catch (error) {
            const axiosError = error as AxiosError;
            const response = axiosError.response;

            if (response) {
                console.log(response);
                const errorData: any = response.data;

                if (errorData.errors) {
                    const errors = errorData.errors;

                    if (errors.email) {
                        setError("email", {
                            type: "server",
                            message: errors.email,
                        });
                    }

                    if (errors.name) {
                        setError("name", {
                            type: "server",
                            message: errors.name,
                        });
                    }
                    if (errors.password) {
                        setError("password", {
                            type: "server",
                            message: errors.password,
                        });
                    }
                }
            }
        }
    }

    return (
        <div className=" bg-white-200 h-screen flex justify-center items-center flex-col">
            <div className='' >
                <div className='text-center'>
                    <h2 className='font-bold text-3xl ' >Create An Account</h2>
                    <p className='text-slate-400 font-semibold ' >
                        {type === 'signup' ? 'Already have an account?' : "Don't have an account?"}
                        <span className='underline '>
                            <Link to={type === 'signin' ? '/' : type === 'signup' ? '/signin' : ''}>
                                {type === 'signin' ? 'Signup' : type === 'signup' ? 'Login' : ''}
                            </Link>
                        </span>
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {type === 'signup' ? (
                        <>
                            <Label htmlFor="name" className="block mb-2">
                                Name
                            </Label>
                            <Input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                id="name"
                                type="text"
                                placeholder="Name"
                                {...register('name')}
                            />
                            {errors.name && (
                                <p className="text-red-500">{`${errors.name.message}`}</p>
                            )}
                        </>
                    ) : null}
                    <Label
                        className='block mb-2'
                        htmlFor="username">
                        username
                    </Label>
                    <Input
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        id='username'
                        type="email"
                        placeholder="username"
                        {...register("email")}
                    />
                    {
                        errors.email && <p className="text-red-500">{`${errors.email.message}`}</p>
                    }

                    <Label
                        className='block mb-2 '
                        htmlFor="password">
                        password
                    </Label>
                    <Input
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        id='password'
                        type="password"
                        placeholder="password"
                        {...register("password")}
                    />
                    {
                        errors.password && <p className="text-red-500">{`${errors.password.message}`}</p>
                    }



                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        className='border border-blue-200 text-lg text-bold rounded-lg focus:border focus:border-slate-200 w-full bg-slate-800 text-white  p-2.5 mt-4 ' variant={'ghost'}
                    >
                        Signup
                    </Button>
                </form>
            </div>
        </div >
    )
}

export default Auth