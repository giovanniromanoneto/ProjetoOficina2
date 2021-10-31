import { useAuth } from '../auth/useAuth'
import React, { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import '../styles/login.css'
import { firebase } from '../config/firebase'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'

export function Inicio () {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')
  const { user } = useAuth()

  async function handleLogin (e) {
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then(result => {
        if (!result) {
          window.alert('Erro no login!')
        } else {
          setMensagem('ok')
          console.log(mensagem)
          history.push('/home')
        }
      })
      .catch(err => {
        setMensagem('erro')
        console.log(err)
      })
  }

  function handleCadastro () {
    history.push('/cadastroUser')
  }

  if (!user) {
    return <Redirect to='/home'/>
  }

  return (
    <Container>
        <Row id="tela" className="h-100">
        <Col md={6} className="justify-content center">
         Imagem
        </Col>
        <Col className="justify-content center">
            <Card border="dark" className="justify-content center">
                <Card.Body>
                    <Card.Title>Faça seu Login</Card.Title>
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

                            <Card.Text>Ainda não se cadastrou? <Card.Link onClick={handleCadastro}>Clique aqui e se cadastre</Card.Link></Card.Text>

                            <Button variant="primary" type="submit" onClick={handleLogin}>
                                Entrar
                            </Button>
                        </Form>
                </Card.Body>
            </Card>
        </Col>
        </Row>
    </Container>
  )
}
