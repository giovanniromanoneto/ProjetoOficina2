/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { createContext, useState, useEffect } from 'react'
import { firebase } from '../config/firebase'

const auth = firebase.auth()

export const AuthContext = createContext({})

export function AuthContextProvider (props) {
  const [user, setUser] = useState()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  return (
      <AuthContext.Provider value = { { user } }>
          {props.children}
      </AuthContext.Provider>
  )
}
