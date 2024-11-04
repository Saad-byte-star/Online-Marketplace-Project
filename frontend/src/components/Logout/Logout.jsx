import React from 'react'
import { useAuth } from '../store/auth'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
function Logout() {
    const{LogoutUser} = useAuth()
    useEffect(() => {
    LogoutUser()
    }, [LogoutUser])
    
  return (
    <>
      <Navigate to="/" />
    </>
  )
}

export default Logout
