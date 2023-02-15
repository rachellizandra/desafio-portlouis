class NotasInconsistente extends Error{
    constructor(nota = {}) {
        super(`Nota id ${nota.idPedido} e Nota ${nota.numeroItem} não existem.`)
    }
}

module.exports = NotasInconsistente