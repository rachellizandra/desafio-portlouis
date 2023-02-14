const pedidosParsed = require("./leituraPedidos");
const PedidosDuplicadoExcecao = require("./PedidosDuplicadosExcecao");
const PedidosInconsistente = require("./PedidosInconsistente");

const Utils = require('./Utils');

class Nota{
  constructor(idPedido, numeroItem, quantidadeProduto, id) {
    this.idPedido = idPedido;
    this.numeroItem = numeroItem;
    this.quantidadeProduto = quantidadeProduto;
    this.pedidos = pedidosParsed.filter(
      (pedido) => pedido.id == idPedido && numeroItem == pedido.numeroItem
    ); // o método .filter() pega todos os pedidos da nota
    this.id = id;
    this._validarTipos();
  }


  _validarTipos() {
    //_ ou # indica que o método é privado

    Utils.validarValorInteiro(this.idPedido,"idPedido");

    Utils.validarValorMinimo(this.idPedido, 0, "idPedido");
    
    Utils.validarValorInteiro(this.numeroItem, "numeroItem");

    Utils.validarValorMinimo(this.numeroItem, 0, "numeroItem");

    Utils.validarValorInteiro(this.quantidadeProduto, "quantidadeProduto");

    Utils.validarValorMinimo(this.quantidadeProduto, 0, "quantidadeProduto");

  }

  calcularQtdProdutosNosPedidos() {
    return this.pedidos.reduce(
      (total, pedido) => total + pedido.quantidadeProduto,
      0
    );
  }

  validarPedidos(relatorioPedidos) {
    this.pedidos.forEach((pedido) => {
      if(pedido.numeroItem == this.numeroItem) {
          if(pedido.quantidadeProduto <= this.quantidadeProduto) {
              relatorioPedidos.push(["Pedidos válidos: ", pedido.codigoProduto, pedido.numeroItem, this.id, pedido.id, "Valor total: " + pedido.calcularValor()])
          } else {
              //return relatorioPedidos.push([new RangeError("A soma das quantidades informadas para esse item nas thiss lidas ultrapassou a quantidade do item do pedido")])
              relatorioPedidos.push(["Pedidos pendentes: ", pedido.codigoProduto, pedido.numeroItem, this.id, pedido.id])
          }
       } //else {
      //     relatorioPedidos.push(["Pedidos pendentes: ", pedido.codigoProduto, pedido.numeroItem, this.id, pedido.id])
      // }
  })//criar uma classe só para lançamento de exceções
  //criar um método para cada validação abaixo
  const pedidosMapeados = new Map()
  this.pedidos.forEach((pedido)=> {
    if(pedidosMapeados.has(pedido.numeroItem)) {
      throw new PedidosDuplicadoExcecao(pedido)
    }
    pedidosMapeados.set(pedido.numeroItem, pedido)
  }) 

  const pedidosOrdenados = this.pedidos.sort((a, b) => a.numeroItem - b.numeroItem)

  for(let i = 0; i < this.pedidos.length; i++) {
    if(pedidosOrdenados[i]?.numeroItem !== i+1) {
      //throw new PedidosInconsistente(pedidosOrdenados[i])
    }
  }

  //Para continuar: 

  // pedidosParsed ou this.pedidos.forEach((pedido) => {
  //   if(this.numeroItem !== pedido.numeroItem && this.idPedido !== pedido.id) {
  //     console.error("Id pedido e numero item que não existem: \n", pedido ,"\n", this)
  //   }
  // })

}

  validarValoresDosPedidosENotas(somaProdutosPedidos, somaValoresDoPedidos) {
    const somatorioValores = this.pedidos.reduce((total, pedido) => total + pedido.calcularValor(), 0)

    const calculoTotal = this.pedidos.find((pedido) => {
        somaProdutosPedidos.set(pedido.id, this.calcularQtdProdutosNosPedidos())
        somaValoresDoPedidos.set(pedido.id, somatorioValores)
    })

    return calculoTotal;
  }

  calcularQtdProdutos(somaProdutosNotas) {
    if(somaProdutosNotas.has(this.id)) { //.has() -> verifica se existe em somaProdutosNotas a chave contendo o id
      return somaProdutosNotas.set(this.id, somaProdutosNotas.get(this.id) + this.quantidadeProduto)
  } else {
      return somaProdutosNotas.set(this.id, this.quantidadeProduto)
  }
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
