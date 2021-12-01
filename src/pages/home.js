import React, { useState, useEffect, useRef } from 'react'
import '../styles/home.css'
import { Link, useHistory } from 'react-router-dom'

import { useAuth } from '../auth/useAuth'
import { firebase } from '../config/firebase'

import Navbar from '../components/navbar'
import CartItems from '../components/CartItems'
import { Container, Table } from 'react-bootstrap'

export function Home () {
  //  Banco de dados
  const db = firebase.firestore()
  const history = useHistory()
  const { user } = useAuth()
  console.log(user)

  // Lista de Produtos recurados do bd
  const [produtos, setProdutos] = useState([])

  // Campos de cada produto
  const [id, setId] = useState()
  const [nome, setNome] = useState()
  const [descricao, setDescricao] = useState()
  const [preco, setPreco] = useState()
  const [quantidade, setQuantidade] = useState()

  // Carrinho (lista de itens)
  const [carrinho, setCarrinho] = useState([])

  //  Venda (dados da venda)
  const [venda, setVenda] = useState({
    data: undefined,
    itens: [],
    total: 0.00
  })

  // Refs: Formulário de Produto
  const refSelectProduct = useRef()
  const refInputQuantidade = useRef()

  if (!user) {
    history.push('/')
  }

  //  Funções --------------------------------------------------------------------------------------------------------------------------

  //  Add Item no Carrinho
  const addItemAoCarrinho = () => {
    // Recuperar os campos do form de add um item no carrinho
    const itemCarrinho = {
      idItem: Math.random(),
      idProduto: id,
      nome: nome,
      descricao: descricao,
      preco: parseFloat(preco),
      quantidade: parseInt(quantidade)
    }

    // Atualizar o total da venda
    const totalVendaNovo = (itemCarrinho.preco * itemCarrinho.quantidade) + venda.total
    setVenda({ total: totalVendaNovo })

    // Adicionar no state de 'carrinho'
    const listaCarrinho = [...carrinho, itemCarrinho]
    setCarrinho(listaCarrinho)
  }

  //  Deleta Item Carrinho
  const deleteItemCarrinho = (id) => {
    let valorItemRemovido = 0.00

    const carrinhoAtualizado = carrinho.filter(item => {
      // Atualiza o valor total apos remover
      if (item.idItem === id) {
        valorItemRemovido = item.preco * item.quantidade
      }
      return item.idItem !== id
    })

    // Atualizar o total da venda
    const totalVendaNovo = venda.total - valorItemRemovido
    setVenda({ total: totalVendaNovo })
    setCarrinho(carrinhoAtualizado)
  }

  // Adicionar item ao carrinho pelo form
  const handleSubmit = e => {
    e.preventDefault()
    addItemAoCarrinho()

    // Limpar campos do form
    refSelectProduct.current.options[0].selected = true
    setId('')
    setNome('')
    setDescricao('')
    setPreco('')
    refInputQuantidade.current.value = ''
    refSelectProduct.current.focus()
  }

  const handleDeleteProduto = id => {
    db.collection('produto').doc(id).delete()
      .then(() => {
        console.log('Venda removida do BD')

        const produtosAtualizado = produtos.filter(produto => {
          return produto.id !== id
        })

        setProdutos(produtosAtualizado)
      })
  }

  // Busca produtos cadastrados no bd
  useEffect(() => {
    const listaProdutos = []
    db.collection('produto').where('user', '==', user.email).get()
      .then(res => {
        res.docs.forEach(doc => {
          listaProdutos.push({
            id: doc.id,
            ...doc.data()
          })
        })
        setProdutos(listaProdutos)
      })
      .catch(err => console.log('Erro ao carregar lista de produtos', err))
  }, [db, user.email])

  return (
    <>
      <Navbar />
      <Container>
        <div className="row g-4">
          <h1 className="h2 mb-3">Painel</h1>

          {/* Adicionar item no carrinho */}
          <div className="col-md-8 pt-4">
            <section className="mb-4 p-3 bg-light card">
              <form className="row g-2 align-items-end" onSubmit={handleSubmit}>

                {/* Escolhe Produto */}
                <div className="col-12 col-sm-6">
                  <label htmlFor="selectProduct" className="form-label">Produto</label>
                  <select id="selectProduct" ref={refSelectProduct} className="form-select" onChange={(e) => {
                    if (e.target.value) {
                      setId(produtos[e.target.value].id)
                      setNome(produtos[e.target.value].nome)
                      setDescricao(produtos[e.target.value].descricao)
                      setPreco(produtos[e.target.value].preco)
                    }
                  }} required >
                    <option value="">Pesquisar</option>
                    {
                      produtos.map((value, index) => (<option key={index} value={index}>{value.nome}</option>))
                    }
                  </select>
                </div>

                {/* Exibe Preço do produto escolhido */}
                <div className="col-4 col-sm-2">
                  <label htmlFor="inputPrice" className="form-label">Preço</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light" id="estoque-addon">R$</span>
                    <input type="number" className="form-control" id="inputPrice" aria-describedby="estoque-addon" defaultValue={preco} readOnly />
                  </div>
                </div>

                {/* Escolhe Quantidade */}
                <div className="col-4 col-sm-2">
                  <label htmlFor="inputQuantity" className="form-label">Quantidade</label>
                  <input type="number" className="form-control" id="inputQuantity" ref={refInputQuantidade} onChange={e => { setQuantidade(e.target.valueAsNumber) }} min="1" required />
                </div>

                {/* Submit button */}
                <div className="col-12 col-sm-2">
                  <button type="submit" className="btn btn-primary w-100">Adicionar</button>
                </div>
              </form>
            </section>

            {/* Lista de Produtos ---------------------------------------------------------------------------------- */}
            <section className="secaoLista card">
              {/* Header */}
              <header className="headerLista">
                <h3 className="tituloLista">Lista de Produtos</h3>
                {/* Botão cadastrar Produto */}
                <Link to="/produto" className="btn btn-outline-primary">
                  Cadastrar
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" /></svg>
                </Link>
              </header>

              {/* Lista */}
              <Table striped hover>
                {/* Head */}
                <thead>
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Preço</th>
                    <th scope="col">...</th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody>
                  {
                    produtos.length
                      ? (produtos.map(produto => {
                          return (
                            <tr key={produto.id}>
                              <th scope="row">{produto.nome}</th>
                              <td>{produto.descricao}</td>
                              <td>{`R$ ${produto.preco}`}</td>
                              <td>
                                <Link to={`/produto/${produto.id}`} className="me-2 text-secondary">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>
                                </Link>
                                <span className="text-secondary" onClick={() => { handleDeleteProduto(produto.id) }}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>
                                </span>
                              </td>
                            </tr>
                          )
                        }))
                      : (<tr><td colSpan="5">Ainda nada por aqui.</td></tr>)
                  }
                </tbody>
              </Table>
            </section>
          </div>

          {/* Carrinho */}
          <div className="col-md-4">
            <section className="p-3 bg-light">
              <header className="mt-3 pb-4">
                <h2 className="h4 m-0 text-center" style={{ lineHeight: 1 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-basket" viewBox="0 0 16 16"><path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"/></svg>
                  &nbsp;Carrinho
                </h2>
              </header>

              {/* Lista de Compra no carrinho */}
              <div className="d-flex flex-column my-4">
                <CartItems carrinho={carrinho} deleteItemCarrinho={deleteItemCarrinho} />
              </div>

              { carrinho.length
                ? (
                  <div className="text-center mb-3">
                    <p>Valor total: {`R$ ${venda.total}`}</p>
                  </div>
                  )
                : (null)
              }
            </section>
          </div>

        </div>
      </Container>
    </>
  )
}
