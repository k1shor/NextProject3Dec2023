import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const AdminSidebar = () => {
let params = window.location.href

    let active = ''
    if(params.match(/category/)){
        active = 'category'
    }
    if(params.match('/products/')){
        active = 'products'
    }
    

    return (
        <div className='w-1/4 p-5 bg-blue-700 text-white font-bold text-2xl' style={{ minHeight: '100vh' }}>
            <ul>
                <li><Link href={'/admindashboard'}>Admin Dashboard</Link></li>
                <li><Link href={'/admindashboard/category'} className={active === 'category'? 'active' : ''}>Category</Link></li>
                <li><Link href={'/admindashboard/products'} className={active === 'products'? 'active' : '' }>Product</Link></li>
                <li><Link href={'/orders'}>Orders</Link></li>
                <li><Link href={'/users'}>Users</Link></li>

            </ul>
        </div>
    )
}

export default AdminSidebar