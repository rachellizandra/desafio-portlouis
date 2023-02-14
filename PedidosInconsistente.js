class PedidosInconsistente extends Error{
    constructor(pedido = {}){
        super(`Pedido id ${pedido.id} está inconsistente.`)
    }
}

module.exports = PedidosInconsistente