import { firebase } from '../config/firebase'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/cadastroUser.css'

// Bootstrap
import Container from 'react-bootstrap/container'
import Form from 'react-bootstrap/form'
import Button from 'react-bootstrap/button'
import Card from 'react-bootstrap/card'
import Alert from 'react-bootstrap/alert'
import Row from 'react-bootstrap/row'
import Col from 'react-bootstrap/col'

export function CadastroUser () {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const history = useHistory()
  const [sucesso, setSucesso] = useState(true)
  const [next, setNext] = useState(false)

  function handleCadastro (e) {
    e.preventDefault()
    if (!email || !senha) {
      window.alert('Todos os campos devem ser preenchidos')
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then((result) => {
          if (result) {
            window.alert('Usuário cadastrado com sucesso!')
            setNext(true)
          }
        })
        .catch(err => {
          setSucesso(false)
          console.log(err)
        })
    }
  }

  function handleBack (e) {
    e.preventDefault()
    history.push('/')
  }

  if (next) {
    history.push('/')
  }

  return (
    <Container className="container">
      <Row className="h-100">
        <Col md={1}>
          <Button className="botao" variant="outline-dark" onClick={handleBack}>Voltar</Button>
        </Col>
        <Col className="formulario">
          <Card bg="light" style={{ width: '58rem' }} className="card">
            <Card.Body>
            <Card.Title className="text-center">Cadastro de Usuário</Card.Title>
            <Form>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Ex.: nome@email.com" onChange={(event) => setEmail(event.target.value)} value={email} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="senha">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Senha" onChange={(event) => setSenha(event.target.value)} value={senha} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleCadastro}>
                    Cadastrar
                </Button>
            </Form>
            { sucesso
              ? (console.log(sucesso))
              : (<Alert variant={'danger'} >
                    Erro no cadastro! Por favor tente novamente.
                  </Alert>
                ) }
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
