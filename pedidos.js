class Pedido {
  constructor(numeroItem, codigoProduto, quantidadeProduto, valorUnit, idPedido, somaDeValores) {
    this.numeroItem = numeroItem;
    this.codigoProduto = codigoProduto;
    this.quantidadeProduto = quantidadeProduto;
    this.valorUnit = valorUnit;
    this.idPedido = idPedido;
    somaDeValores = this.calcularValor()
  }

  _validarValorMinino(valor, chave) {
    if (this[chave] < valor) {
      //console.log("O número do item deve ser maior que 0.")
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

    this._validarValorInteiro("numeroItem");

    this._validarValorMinino(0, "numeroItem");

    this._validarValorInteiro("quantidadeProduto");

    this._validarValorMinino(0, "quantidadeProduto");

    this._validarValorMinino(0, "valorUnit");
  }


  calcularValor() {
    return this.quantidadeProduto * this.valorUnit;
  }

  toTxt() {
    return (
      "{" +
      '"número_item":' +
      this.numeroItem +
      ", " +
      '"código_produto":' +
      this.codigoProduto +
      ", " +
      '"quantidade_produto":' +
      this.quantidadeProduto +
      ", " +
      '"valor_unitário_produto":' +
      this.valorUnit +
      ", " +
      '"saldo_valor:"' + this.calcularValor() +
      "}"
    );
  }

}

module.exports = Pedido;
