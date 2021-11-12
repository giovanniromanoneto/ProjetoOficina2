/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { CadastroUser } from '../src/pages/cadastroUser'
import 'regenerator-runtime/runtime'

describe('Login', () => {
  test('Cadastro renderizado com sucesso', async () => {
    render(<CadastroUser />)
    const inputEmail = screen.getByTestId('email')
    const inputSenha = screen.getByTestId('senha')
    const titulo = screen.getByTestId('titulo')
    const botao = screen.getByTestId('botao')

    fireEvent.change(inputEmail, { target: { value: 'testeCadastro@email.com' } })
    fireEvent.change(inputSenha, { target: { value: 'teste123' } })

    expect(titulo.innerHTML).toEqual('Cadastro de Usuário')
    expect(inputEmail.value).toEqual('testeCadastro@email.com')
    expect(inputSenha.value).toEqual('teste123')
    expect(botao.innerHTML).toEqual('Cadastrar')
  })
})
