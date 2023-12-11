import { useCallback, useState } from 'react';
import axios from 'axios';
import Input from '../components/Input';
import { NextPageContext } from 'next';

import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import AppLogout from '../utilities/AppLogout'

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
  
    if (session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }
  
    return {
      props: {}
    }
  }
const Auth = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [varient, setVarient] = useState('login');

    const toggleVarient = useCallback(
        () => setVarient(currVarient => currVarient === 'login' ? 'register' : 'login'), []
    )
    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                callbackUrl: '/'
            });
            router.push('/');
        }
        catch (e) { console.log(e); }

    }, [email, password, router]);

    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                name,
                password
            });
            login();

        } catch (error) {
            console.log(error);
        }
    }, [email, name, password, login]);


    return (
        <>
        <AppLogout>
            <div className="relative h-screen w-screen bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
                <div className='bg-black w-full h-full lg:bg-opacity-50'>
                    <nav className='px-12 py-5'>
                        <img src="/images/logo.png" alt="logo" className="h-12" />
                    </nav>
                    <div className="flex justify-center">
                        <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                            <h2 className="text-white text-4xl mb-8 font-semibold">
                                {varient === 'login' ? 'Sign In' : 'Register'}
                            </h2>
                            <div className="flex flex-col gap-4">
                                {varient === 'register' &&
                                    <Input
                                        label='Name'
                                        onChange={(e: any) => { setName(e.target.value) }}
                                        id='name'
                                        value={name}
                                        type='name'></Input>
                                }
                                <Input
                                    label='Email'
                                    onChange={(e: any) => { setEmail(e.target.value) }}
                                    id='email'
                                    value={email}
                                    type='email'></Input>
                                <Input
                                    label='Password'
                                    onChange={(e: any) => { setPassword(e.target.value) }}
                                    id='password'
                                    value={password}
                                    type='password'></Input>
                            </div>
                            <button onClick={varient === 'login' ? login : register} className='bg-red-600 py-3 mt-3 text-white rounded-md w-full hover:bg-red-700 transition'>
                                {varient === 'login' ? 'Login' : 'Register'}
                            </button>
                            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                                <div onClick={() => signIn('google', { callbackUrl: '/profile' })} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                    <FcGoogle size={32} />
                                </div>
                                <div onClick={() => signIn('github', { callbackUrl: '/profile' })} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                    <FaGithub size={32} />
                                </div>
                            </div>
                            <p className='text-neutral-500 mt-12 items-center justify-center'>
                                {varient === 'login' ? 'First time using Netflix?' : 'Already have an account'}
                                <span onClick={toggleVarient} className='text-white ml-1 hover:underline cursor-pointer'>{varient === 'login' ? 'Create Account' : 'LogIn'}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </AppLogout>
        </>
    );
}
export default Auth;