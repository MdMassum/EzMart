
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth'
import AdminLayout from './components/admin-view/AdminLayout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminFeatures from './pages/admin-view/features'
import AdminOrders from './pages/admin-view/orders'
import AdminProducts from './pages/admin-view/AdminProducts'
import ShoppingLayout from './components/shopping-view/layout'
import NotFound from './pages/not-found'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingListing from './pages/shopping-view/listing'
import ShoppingCheckOut from './pages/shopping-view/checkout'
import Account from './pages/shopping-view/account'
import CheckAuth from './components/common/check-auth'
import UnAuthPage from './pages/unauth-page'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { signOutSuccess } from './redux/authSlice.ts'



function App() {

  let {isAuthenticated, user} = useSelector((state:any)=>state.auth)
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   // dispatch(signOutSuccess());
  //   console.log()
  // }, [])
  
  
  return (
    <BrowserRouter>
      <div>
          <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Routes>

        <Route path='/login' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <Auth />
        </CheckAuth> 
        }/>

        <Route path='/admin' element={ 
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
         }>
          <Route path='dashboard' element={ <AdminDashboard/>} />
          <Route path='products' element={ <AdminProducts/>} />
          <Route path='orders' element={ <AdminOrders/>} />
          <Route path='features' element={ <AdminFeatures/>} />
        </Route>

        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout /> 
          </CheckAuth>
          }>
          <Route path='home' element={ <ShoppingHome /> }/>
          <Route path='listing' element={ <ShoppingListing /> }/>
          <Route path='checkout' element={ <ShoppingCheckOut /> }/>
          <Route path='account' element={ <Account /> }/>
          
        </Route>
        <Route path='*' element={ <NotFound/>} />
        <Route path='unauth-page' element={ <UnAuthPage/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
