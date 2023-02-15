class PedidoInconsistente extends Error{
    constructor(pedido = {}){
        super(`Pedido id ${pedido.id} está inconsistente.`)
    }
}

module.exports = PedidoInconsistente