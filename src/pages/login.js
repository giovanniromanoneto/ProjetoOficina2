import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/login.css'
import { firebase } from '../config/firebase'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'

import loja from '../assets/iconLojas.jpg'

export function Inicio () {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [sucesso, setSucesso] = useState(true)

  async function handleLogin (e) {
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then(result => {
        if (result) {
          setSucesso(true)
          history.push('/home')
        }
      })
      .catch(err => {
        setSucesso(false)
        console.log(err)
      })
  }

  function handleCadastro () {
    history.push('/cadastroUser')
  }

  return (
    <Container className="container">
        <Row id="tela" className="h-100">
        <Col md={5} className="colunaMensagem">
          <h1 className="titulo">Gerenciador de Vendas</h1>
          <h5 className="subtitulo">Não importa qual seu ramo de atuação, gerencie suas vendas com um sistema descomplicado e intuitivo.</h5>
          <Image src={loja} fluid/>
          <p/>
        </Col>
        <Col md={7} className="colunaLogin">
            <Card bg="light" style={ { width: '40rem' }}>
                <Card.Body>
                    <Card.Title className="text-center">Faça seu Login</Card.Title>
                        <Form>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                type="email"
                                placeholder="Ex.: nome@email.com"
                                value={ email }
                                onChange={(event) => setEmail(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="senha">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                type="password"
                                placeholder="Senha"
                                value={ senha }
                                onChange={(event) => setSenha(event.target.value)}
                                />
                            </Form.Group>

                            <Card.Text className="texto" >Ainda não se cadastrou?</Card.Text>
                            <Button className="padding-bottom-25px" variant='link' onClick={handleCadastro}>Clique aqui e se cadastre</Button><p/>

                            <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="md" onClick={handleLogin}>
                                Entrar
                            </Button>
                            </div>
                        </Form>
                        <p/>
                        { sucesso
                          ? (console.log(sucesso))
                          : (<Alert variant={'danger'} >
                              Erro no login! Por favor verifique as informações
                            </Alert>
                            ) }
                </Card.Body>
            </Card>
        </Col>
        </Row>
    </Container>
  )
}
