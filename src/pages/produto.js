import React, { useState } from 'react'
import '../styles/produto.css'
import { firebase } from '../config/firebase'
import { Container, Form, Spinner, Alert, Button } from 'react-bootstrap'
import Navbar from '../components/navbar'

import { useAuth } from '../auth/useAuth'

export function Produto () {
  const [mensagem, setMensagem] = useState()
  const [carregando, setCarregando] = useState(0)
  const [show, setShow] = useState(true)
  const [nome, setNome] = useState()
  const [preco, setPreco] = useState()
  const [descricao, setDescricao] = useState()

  const { user } = useAuth()
  console.log(user.email)
  const db = firebase.firestore()

  function postar () {
    setCarregando(1)

    db.collection('produto').add({
      nome: nome,
      preco: preco,
      descricao: descricao,
      criacao: new Date(),
      user: user.email
    }).then(() => {
      setMensagem('ok')
      limpaCampo()
      setCarregando(0)
    }).catch(() => {
      setMensagem('erro')
      setCarregando(0)
    })
  };

  function limpaCampo () {
    setNome('')
    setPreco('')
    setDescricao('')
  };

  function alertMessage (mensagem, tipo) {
    if (show) {
      return (
        <Alert variant={tipo} onClose={() => setShow(false)} dismissible>{mensagem}</Alert>
      )
    }
    return <Button variant="outline-secondary" onClick={() => setShow(true)}>Mostrar Aviso</Button>
  };

  return (
    <>
    <Navbar />
    <Container className="corpo">
        <h3>Cadastrar Produto</h3>
        <Container className="justify-content-md-center">
            {/* Formulário */}
            <Form.Group>
                <Form.Label>Nome do Produto</Form.Label>
                <Form.Control onChange={(e) => setNome(e.target.value)} type="text" value={nome}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Preço</Form.Label>
                <Form.Control onChange={(e) => setPreco(e.target.valueAsNumber)} type="number" value={preco}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Descrição</Form.Label>
                <Form.Control onChange={(e) => setDescricao(e.target.value)} as="textarea" rows="5" value={descricao}/>
            </Form.Group>

            { carregando
              ? <Spinner animation="border" variant="success" role="status"></Spinner>
              : <button onClick={postar} type="button" className="btn-cadastro">{'Adicionar'}</button>
            }

            <div className="text-dark text-center my-4">
                {mensagem === 'ok' && alertMessage(<p>&#9745; A publicação foi enviada com sucesso!</p>, 'primary')}
                {mensagem === 'erro' && alertMessage(<p><strong>&#9888;  Atenção! </strong> Falha no envio.</p>, 'danger')}
            </div>

        </Container>
    </Container>
    </>
  )
}
