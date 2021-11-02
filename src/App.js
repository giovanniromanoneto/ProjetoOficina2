/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Route } from 'react-router-dom'
import { AuthContextProvider } from './auth/contextAuth'

import { Inicio } from './pages/login'
import { CadastroUser } from './pages/cadastroUser'
import { Home } from './pages/home'
import { Produto } from './pages/produto'

function App () {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Inicio} />
        <Route path="/cadastroUser" exact component={CadastroUser} />
        <Route path="/home" exact component={Home} />
        <Route path="/produto" exact component={Produto} />
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
