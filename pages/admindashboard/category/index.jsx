import AdminSidebar from '@/pages/components/AdminSidebar'
import React from 'react'

const index = () => {

  return (
    <div className='flex'>
      <AdminSidebar/>
      <div>
        <h1>Welcome to Admin Dashboard</h1>
      </div>
    </div>
  )
}

export default index