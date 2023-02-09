const pedidosParsed = require("./leituraPedidos");

class Nota {
  constructor(idPedido, numeroItem, quantidadeProduto, idNota) {
    this.idPedido = idPedido;
    this.numeroItem = numeroItem;
    this.quantidadeProduto = quantidadeProduto;
    this.pedidos = pedidosParsed.filter(
      (pedido) => pedido.idPedido[1] == idNota[1]
    ); // o método .filter() pega todos os pedidos da nota
    this.idNota = idNota;
    //Para validar os tipos, basta descomentar esta função abaixo 
    //this._validarTipos();
  }

  _validarValorMinino(valor, chave) {
    if (this[chave] < valor) {
      console.log(
        `A ${chave} com o valor: ${this[chave]} precisa ser > ${valor} `
      );
    }
  }

  _validarValorInteiro(chave) {
    if (!Number.isInteger(this[chave])) {
      //this significa o valor atual e a chave é o que está sendo acessado
      console.error(`A propriedade ${chave} deve ser um número inteiro`);
    }
  }

  _validarTipos() {
    //_ ou # indica que o método é privado

    this._validarValorInteiro("idPedido");

    this._validarValorMinino(0, "idPedido");

    this._validarValorInteiro("numeroItem");

    this._validarValorMinino(0, "numeroItem");

    this._validarValorInteiro("quantidadeProduto");

    this._validarValorMinino(0, "quantidadeProduto");

  }

  calcularQtdProdutosNosPedidos() {
    return this.pedidos.reduce(
      (total, pedido) => total + pedido.quantidadeProduto,
      0
    );
  }


  toTxt() {
    return (
      "{" +
      '"id_pedido":' +
      this.idPedido +
      ", " +
      '"número_item":' +
      this.numeroItem +
      ", " +
      '"quantidade_produto":' +
      this.quantidadeProduto +
      "}"
    );
  }

}

module.exports = Nota;
