import React from 'react'
import './navbar.css'
import { Link, NavLink } from 'react-router-dom'

function Navbar () {
  return (
    <>
    <nav className="navbar navbar-expand-md navbar-dark">
      <Link className="navbar-brand link-home mx-4" to="/home">Gerenciador de Vendas</Link>

      <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
              <li className="nav-item mx-3"><NavLink className="nav-link" to="/home">Painel</NavLink></li>
              <li className="nav-item mx-3"><NavLink className="nav-link" exact to="/">Sair</NavLink></li>
          </ul>
      </div>
    </nav>
    </>
  )
}
export default Navbar
