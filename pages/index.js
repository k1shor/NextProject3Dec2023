import { Inter } from 'next/font/google'
import Link from 'next/link'
import { isAuthenticated } from './api/userapi'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  let [user, setUser] = useState({})

  useEffect(()=>{
    if(typeof window !== 'undefined'){
      let {user} = isAuthenticated()
      setUser(user)
    }
  },[])

  
  return (
    <div className='w-full flex justify-center items-center flex-col' style={{ height: '100vh' }}>
      <span>Welcome <span className='font-bold underline text-xl'>{user?user.username:'Guest'}</span></span>
      <div className='flex p-5 justify-evenly w-96'>
        <Link href={'/home'}>Homepage</Link>
        {!user &&
        <>
          <Link href={'/login'}>Login</Link>
          <Link href={'/register'}>Register</Link>
        </>
        }

      </div>
    </div>
  )
}
