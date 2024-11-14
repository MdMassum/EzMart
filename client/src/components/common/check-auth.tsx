import React, { ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { User } from '../../types';

interface CheckAuthProps{
    isAuthenticated : boolean,
    user : User | null,
    children : ReactElement
}
const CheckAuth : React.FC<CheckAuthProps> = ({isAuthenticated, user, children}) => {

    const location = useLocation();

    if(!isAuthenticated && !location.pathname.includes('/login')){
        return <Navigate to='/login'/>
    }

    if(isAuthenticated && location.pathname.includes('/login')){
        return user?.role === 'admin' ?  <Navigate to='/admin/dashboard'/> : <Navigate to='/shop/home'/> ; 

    }
    if(isAuthenticated && user?.role !== 'admin' && location.pathname.includes('admin')){
        return <Navigate to='/unauth-page'/>
    }
    if(isAuthenticated && user?.role === 'admin' && location.pathname.includes('shop')){
        return <Navigate to='/admin/dashboard'/>
    }

  return (
    <>
    {children}
    </>
  )
}

export default CheckAuth