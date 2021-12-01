import React from 'react'

const CartItems = ({ carrinho }) => {
  const listaCarrinho = carrinho.length
    ? (
        carrinho.map(item => {
          return (
            <div className="card-box mb-4" key={item.idItem}>
              <div className="top mb-2 d-flex justify-content-between align-items-center">
                <div className="h6 m-0">{item.nome}</div>
                <div className="h6 m-0 fw-bolder">{`R$ ${(item.preco) * (item.quantidade)}`}</div>
              </div>
              <div className="mb-2 text-muted">{item.descricao}</div>
              <div className="bottom d-flex justify-content-between">
                <div>{`Quantidade: ${item.quantidade}`}</div>
              </div>
            </div>
          )
        })
      )
    : (
        <div className="text-center w-100">Não há nada no carrinho.</div>
      )

  return (listaCarrinho)
}

export default CartItems
