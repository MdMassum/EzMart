import React from 'react'
import AuthForm from './AuthForm'

const Auth:React.FC = () => {
  return (
    <div>
        <div 
    className="flex min-h-screen flex-col justify-center py-6 sm:px-6 md:px-8 bg-gray-100">
        <div
        className="sm:mx-auto sm:w-full sm:max-w-md">

            <h2 className="font-robotoSerif mt-1 text-center text-4xl font-bold tracking-tight text-gray-900">Sign In </h2>
        </div> 

        {/* authform */}
        <AuthForm/>
    </div>
    </div>
  )
}

export default Auth