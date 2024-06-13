import { SignupType } from '@pritamchak/common-package';
import axios from 'axios';
import React, { ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';

interface LabelledInputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string
}



function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <div className=''>
            <label className='block mb-2 text-sm text-black font-semibold pt-4  text-base text-black font-semibold pt-4 '>{label}</label>
            <input className='bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type={type || "text"} placeholder={placeholder} onChange={onChange} />
        </div>
    )
}






const Auth = ({ type }: { type: 'signin' | 'signup' }) => {
    const navigate = useNavigate()
    const [userInputs, setUserInputs] = React.useState<SignupType>({
        email: '',
        password: '',
        name: ''
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/h1/user/${type === 'signup' ? 'signup' : 'signin'}`, userInputs)
            navigate('/blogs')
            localStorage.setItem('token', response.data.jwt)
        } catch (error) {
            alert("Error while signing up !!!")
            console.error(error)
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
                            <Link to={type === 'signin' ? '/signup' : type === 'signup' ? '/signin' : ''}>
                                {type === 'signin' ? 'Signup' : type === 'signup' ? 'Login' : ''}
                            </Link>
                        </span>
                    </p>
                </div>
                {type === 'signup' ?
                    <LabelledInput label='Name' placeholder='Pritam Chakroborty...' onChange={(e) => setUserInputs({ ...userInputs, name: e.target.value })} />
                    : null}
                <LabelledInput type='email' label='Email' placeholder='chakrobortypritam@gmail.com...' onChange={(e) => setUserInputs({ ...userInputs, email: e.target.value })} />
                <LabelledInput type='password' label='Password' placeholder='*****' onChange={(e) => setUserInputs({ ...userInputs, password: e.target.value })} />

                <button onClick={sendRequest} className='border border-blue-200 text-lg text-bold rounded-lg focus:border focus:border-slate-200 w-full bg-slate-800 text-white  p-2.5 mt-4 ' >{type === 'signup' ? 'SignUp' : "SignIn"}</button>
            </div>
        </div>
    )
}

export default Auth