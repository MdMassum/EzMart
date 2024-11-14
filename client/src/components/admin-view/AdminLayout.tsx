
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const AdminLayout = () =>{
  return (
    <div className='flex min-h-screen w-full'>
        {/* admin sidebar */}
        <Sidebar/>
        <div className='flex flex-1 flex-col'>
            {/* admin header */}
            <Header/>

            <main className='flex flex-1 bg-muted/40 p-4 md:p-6'>
                <Outlet/>
            </main>
        </div>

    </div>
  )
}

export default AdminLayout