class PedidosDuplicadoExcecao extends Error{
    constructor(pedido = {}) {
        super(`Pedido id ${pedido.id} está duplicado.`)
    }
}

module.exports = PedidosDuplicadoExcecao