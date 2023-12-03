import Link from 'next/link'
import React, { useState } from 'react'
import styles from '../styles/register.module.css'
import { register } from './api/userapi'
import { useRouter } from 'next/router'

const Register = () => {
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    let [error, setError] = useState('')
    let [success, setSuccess] = useState(false)

    const router = useRouter()

    const handleRegister = e => {
        e.preventDefault()
        register({ username, email, password })
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    setSuccess(false)
                }
                else {
                    setSuccess(true)
                    setUsername('')
                    setEmail('')
                    setPassword('')
                    setError('')
                }
            })
    }

    const showError = () => {
        if (error) {
            return <div className='text-red-500 text-lg font-bold'>{error}</div>
        }
    }

    const showSuccess = () => {
        if (success) {
            return <div className='text-green-500 text-lg font-bold'>"User registered successfully."</div>
        }
    }

    const handleBack = (e) => {
        e.preventDefault()
        router.back()
    }
    return (
        <div className='w-full flex flex-col justify-center items-center' style={{ height: '100vh' }}>
            {showError()}
            {showSuccess()}
            <form className='md:w-1/2 p-16 mx-auto border border-blue-500 rounded-lg'>
                <h1 className='text-center text-3xl font-bold underline mb-5'>Register</h1>
                <label htmlFor="username" className={styles.label}>Username</label>
                <input type="text" id='username' className={styles.input}
                    onChange={(event) => { setUsername(event.target.value) }} value={username} />

                <label htmlFor="email" className={styles.label}>Email</label>
                <input type="email" id='email' className={styles.input}
                    onChange={e => setEmail(e.target.value)} value={email} />

                <label htmlFor="pwd" className={styles.label}>Password</label>
                <input type="test" id='pwd' className={styles.input}
                    onChange={e => setPassword(e.target.value)} value={password} />

                <div className='text-center mt-3'>
                    <label className={styles.label}></label>
                    <button className='px-4 py-2 text-2xl bg-blue-500 rounded-md text-blue-200 hover:bg-blue-600 hover:text-blue-300 active:bg-blue-400'
                        onClick={handleRegister}
                    >Register</button>

                    <button className='px-4 py-2 text-2xl bg-blue-500 rounded-md text-blue-200 hover:bg-blue-600 hover:text-blue-300 active:bg-blue-400 ms-3'
                        onClick={handleBack}
                    >Go Back</button>

                </div>
                <div className='text-center text-xl mt-2'>
                    <label className={styles.label}></label>

                    Already have an account? <Link href={'/login'} className='text-blue-900 font-bold hover:text-blue-700'>Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register