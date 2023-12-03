import Link from 'next/link'
import React, { useState } from 'react'
import styles from '../styles/register.module.css'
import { useRouter } from 'next/router'
import { authenticate, login } from './api/userapi'

const Login = () => {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [user, setUser] = useState({})

    let [error, setError] = useState('')
    let [success, setSuccess] = useState(false)

    const router = useRouter()

    const handleLogin = e => {
        e.preventDefault()
        login(email, password)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    setSuccess(false)
                }
                else {
                    setSuccess(true)
                    setError('')
                    setUser(data.user)
                    authenticate(data)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    const showError = () => {
        if (error) {
            return <div className='text-red-500 text-lg font-bold text-center'>{error}</div>
        }
    }

    const redirect = () => {
        if (success) {
            if(user.role === 0){
                router.push('/admindashboard')
            }
            else{
                router.push('/home')
            }
        }
    }

    const handleBack = e => {
        e.preventDefault()
        router.back()
    }
    return (
        <div className='w-full flex justify-center items-center' style={{ height: '100vh' }}>
            {redirect()}
            <form className='w-1/2 p-16 mx-auto border border-blue-500 rounded-lg'>
                <h1 className='text-center text-3xl font-bold underline mb-5'>Login</h1>

                <label htmlFor="email" className={styles.label}>Email</label>
                <input type="email" id='email' className={styles.input}
                    onChange={e => setEmail(e.target.value)} />

                <label htmlFor="pwd" className={styles.label}>Password</label>
                <input type="password" id='pwd' className={styles.input}
                    onChange={e => setPassword(e.target.value)} />

                {showError()}
                <div className='text-center mt-3 '>
                    <label className={styles.label}></label>
                    <button className='px-4 py-2 text-xl bg-blue-500 rounded-md text-blue-200 hover:bg-blue-600 hover:text-blue-300 active:bg-blue-400' onClick={handleLogin}>Login</button>
                    <button className='px-4 py-2 text-xl bg-blue-500 rounded-md text-blue-200 hover:bg-blue-600 hover:text-blue-300 active:bg-blue-400 ms-3'>Forget Password</button>
                    <button className='px-4 py-2 text-xl bg-blue-500 rounded-md text-blue-200 hover:bg-blue-600 hover:text-blue-300 active:bg-blue-400 ms-3' onClick={handleBack}>Cancel</button>

                </div>
                <div className='text-center text-xl mt-2'>
                    <label className={styles.label}></label>

                    Do not have an account? <Link href={'/register'} className='text-blue-900 font-bold hover:text-blue-700'>Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login