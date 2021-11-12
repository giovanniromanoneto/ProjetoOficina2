/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Inicio } from '../src/pages/login'
import 'regenerator-runtime/runtime'

describe('Login', () => {
  test('Login renderizado com sucesso', async () => {
    render(<Inicio />)
    const inputEmail = screen.getByTestId('email')
    const inputSenha = screen.getByTestId('senha')
    const titulo = screen.getByTestId('titulo')
    const subtitulo = screen.getByTestId('subtitulo')
    const botao = screen.getByTestId('botao')

    fireEvent.change(inputEmail, { target: { value: 'teste@email.com' } })
    fireEvent.change(inputSenha, { target: { value: 'teste123' } })

    expect(titulo.innerHTML).toEqual('Gerenciador de Vendas')
    expect(subtitulo.innerHTML).toEqual('Não importa qual seu ramo de atuação, gerencie suas vendas com um sistema descomplicado e intuitivo.')
    expect(inputEmail.value).toEqual('teste@email.com')
    expect(inputSenha.value).toEqual('teste123')
    expect(botao.innerHTML).toEqual('Entrar')
  })
})
