const Utils = require("./Utils");

class Pedido {
  constructor(numeroItem, codigoProduto, quantidadeProduto, valorUnit, id) {
    this.numeroItem = numeroItem;
    this.codigoProduto = codigoProduto;
    this.quantidadeProduto = quantidadeProduto;
    this.valorUnit = valorUnit;
    this.id = id;
    try {
      this._validarTipos();
    } catch (error) {
      console.error(error);
    }
  }


  _validarTipos() {
    //_ ou # indica que o método é privado

    Utils.validarValorInteiro(this.numeroItem, "numeroItem");

    Utils.validarValorMinimo(this.numeroItem, 0, "numeroItem");

    Utils.validarValorInteiro(this.quantidadeProduto, "quantidadeProduto");

    Utils.validarValorMinimo(this.quantidadeProduto, 0, "quantidadeProduto");

    Utils.validarValorMinimo(this.valorUnit, 0, "valorUnit");
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
      "}"
    );
  }

}

module.exports = Pedido;
