import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { verifyUser } from '../api/userapi'
import Link from 'next/link'

const verify = () => {
    const router = useRouter()
    const { token } = router.query

    let [error, setError] = useState('')
    let [success, setSuccess] = useState('')

    let [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        if (token) {
            verifyUser(token)
                .then(data => {
                    if (data.error) {
                        setError(data.error)
                    }
                    else {
                        setSuccess(data.message)
                    }
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [token])

    const showError = () => {
        if (error) {
            return <div className='text-red-500 text-lg font-bold text-center'>{error}
            <br />
            <Link className='inline-block p-2 bg-green-400 rounded-lg' href={'/login'}>Login</Link>
            </div>
        }
    }

    const showSuccess = () => {
        if (success) {
            return <div className='text-green-500 text-lg font-bold text-center'>
                {success}<br />
            <Link className='inline-block p-2 bg-green-400 rounded-lg' href={'/login'}>Login</Link>
            </div>
        }
    }

    return (

        <div className='w-full flex flex-col justify-center items-center' style={{ height: '100vh' }}>
            {isLoading ? <p>LOADING...</p> : <>
                {showSuccess()}
                {showError()}
            </>}
        </div>
    )
}

export default verify