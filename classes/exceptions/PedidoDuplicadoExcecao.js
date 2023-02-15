class PedidoDuplicadoExcecao extends Error{
    constructor(pedido = {}) {
        super(`Pedido numero item ${pedido.numeroItem} está duplicado.`)
    }
}

module.exports = PedidoDuplicadoExcecao