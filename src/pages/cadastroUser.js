import { firebase } from '../config/firebase'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

// Bootstrap
import Container from 'react-bootstrap/container'
import Form from 'react-bootstrap/form'
import Button from 'react-bootstrap/button'

export function CadastroUser () {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const history = useHistory()

  function handleCadastro () {
    if (!email || !senha) {
      window.alert('Todos os campos devem ser preenchidos')
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(() => {
          history.push('/')
        })
        .catch(err => {
          window.alert(err)
        })
    }
  }
  return (
    <Container>
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
    </Container>
  )
}
