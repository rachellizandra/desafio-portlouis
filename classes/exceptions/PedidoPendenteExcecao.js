class PedidoPendenteExcecao extends RangeError{
    constructor(pedido ={}) {
        super(`O pedido ${pedido.quantidadeProduto} está pendente pois a quantidade de produtos nas notas ultrapassou a quantidade do item do pedido`)
    }
}

module.exports = PedidoPendenteExcecao