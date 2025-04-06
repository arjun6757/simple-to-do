import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { OAuthButtons } from './oauth-providers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { handleEmailLogin } from './actions';

export default async function Login() {

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
        return redirect('/app')
    }

    return (
        // <div className='flex pt-5 bg-gray-50 justify-center font-inter'>
        <div className='mt-6 font-sans bg-white w-xs sm:w-md mx-auto h-fit border border-[#ddd] shadow-sm rounded-md px-6 py-8 text-sm text-gray-800 flex flex-col gap-4'>
            <div className='mb-2'>
                <span className='text-2xl font-bold'>Sign in</span>
                <p className='text-xs text-gray-500'>Choose your preferred sign in method</p>
            </div>

            <div>
                <form className='flex flex-col gap-4' >
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='email' className='font-medium'>Email</label>
                        <input
                            name="email"
                            type='email'
                            placeholder='name@example.com'
                            className='outline-offset-4 focus:outline-gray-500 p-2 border border-[#ddd] rounded-md'
                            required />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='flex justify-between'>
                            <label htmlFor='password' className='font-medium'>Password</label>
                            <Link href="/forgot-password" className='underline-offset-4 hover:underline font-medium'>
                                Forgot password?
                            </Link>
                        </div>
                        <input
                            name="password"
                            type='password'
                            minLength={6}
                            className='outline-offset-4 focus:outline-gray-500 p-2 border border-[#ddd] rounded-md'
                            required />
                    </div>

                    <Button formAction={handleEmailLogin} className={'cursor-pointer text-xs'}>
                        <Mail className='w-4 h-4' />
                        Sign in with Email
                    </Button>
                </form>
            </div>

            <div className="flex items-center">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="text-gray-500 text-xs mx-2">OR CONTINUE WITH</span>
                <hr className="flex-grow border-t border-gray-300" />
            </div>

            <OAuthButtons />

            <div className='flex gap-1 justify-center'>
                <span className='text-gray-500'>Don&apos;t have an account?</span>
                <Link href={'/signup'} className='underline-offset-4 hover:underline font-medium'>
                    Sign up
                </Link>
            </div>

        </div>
        // </div>
    )
}
