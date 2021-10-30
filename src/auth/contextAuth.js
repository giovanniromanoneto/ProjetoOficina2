/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { createContext, useEffect, useState } from 'react'
import { firebase } from '../config/firebase'

const auth = firebase.auth()

export const AuthContext = createContext({})

export function AuthContextProvider (props) {
  const [user, setUser] = useState()

  async function login () {
    const response = await auth.signInWithEmailAndPassword(props.email, props.password)
    setUser(response.user)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChange(user => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  return (
      <AuthContext.Provider value = { { user, login } }>
          {props.children}
      </AuthContext.Provider>
  )
}
