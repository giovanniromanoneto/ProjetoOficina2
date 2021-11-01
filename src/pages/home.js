import React from 'react'
// import { useHistory } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

export function Home () {
  // const history = useHistory()
  const { user } = useAuth()

  console.log(user)

  return (
    <>
        <h1>Home</h1>
        <h2>{user.email}</h2>
    </>
  )
}
