class PedidoInconsistente extends Error{
    constructor(pedido = {}){
        super(`Pedido numeroItem ${pedido.numeroItem} e id ${pedido.id} está inconsistente.`)
    }
}

module.exports = PedidoInconsistente