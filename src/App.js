/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Route } from 'react-router-dom'
import { AuthContextProvider } from './auth/contextAuth'

import { Inicio } from './pages/inicio'

function App () {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Inicio} />
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
