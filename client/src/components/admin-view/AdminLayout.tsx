
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useState } from 'react'

const AdminLayout = () =>{

  const [openSidebar, setOpenSideBar] = useState<boolean>(false);
  return (
    <div className='flex min-h-screen w-full'>
        {/* admin sidebar */}
        <Sidebar open={openSidebar} setOpen={setOpenSideBar}/>
        <div className='flex flex-1 flex-col'>
            {/* admin header */}
            <Header setOpen={setOpenSideBar}/>

            <main className='flex flex-1 bg-muted/40 p-4 md:p-6'>
                <Outlet/>
            </main>
        </div>

    </div>
  )
}

export default AdminLayout