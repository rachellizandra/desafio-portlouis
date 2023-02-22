class NotasInconsistente extends Error{
    constructor(nota = {}) {
        super(`Nota id ${nota.id}, id_pedido ${nota.idPedido} e número_item ${nota.numeroItem} não existem.`)
    }
}

module.exports = NotasInconsistente