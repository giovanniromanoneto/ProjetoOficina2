/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import '../styles/produto.css'
import { firebase } from '../config/firebase'
import { Container, Form, Spinner, Alert, Button } from 'react-bootstrap'
import Navbar from '../components/navbar'

import { useAuth } from '../auth/useAuth'

// eslint-disable-next-line react/prop-types
export function Produto ({ match }) {
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

  useEffect(() => {
    if (match.params.idProduto) {
      firebase.firestore().collection('produto').doc(match.params.idProduto).get().then(resultado => {
        setNome(resultado.data().nome)
        setPreco(resultado.data().preco)
        setDescricao(resultado.data().descricao)
      })
    }
  }, [carregando, match.params.idProduto])

  function atualizar () {
    setCarregando(1)
    setMensagem(null)

    db.collection('produto').doc(match.params.idProduto).update({
      nome: nome,
      preco: preco,
      descricao: descricao
    }).then(() => {
      setMensagem('ok')
      setCarregando(0)
    }).catch(erro => {
      setMensagem('erro')
      setCarregando(0)
    })
  }

  return (
    <>
    <Navbar />
    <Container className="corpo">
        <h3>{match.params.idProduto ? 'Editar Produto' : 'Cadastrar Produto'}</h3>
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
              : <button onClick={match.params.idProduto ? atualizar : postar} type="button" className="btn-cadastro">{match.params.idProduto ? 'Atualizar' : 'Adicionar'}</button>
            }

            <div className="text-dark text-center my-4">
                {mensagem === 'ok' && alertMessage(<p>&#9745; Operação realizada com sucesso!</p>, 'primary')}
                {mensagem === 'erro' && alertMessage(<p><strong>&#9888;  Atenção! </strong> Falha no envio.</p>, 'danger')}
            </div>

        </Container>
    </Container>
    </>
  )
}
