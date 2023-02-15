const pedidosParsed = require("../../leitura/leituraPedidos");
const NotasInconsistente = require("../exceptions/NotasInconsistentes");
const PedidosDuplicadoExcecao = require("../exceptions/PedidoDuplicadoExcecao");
const PedidoInconsistente = require("../exceptions/PedidoInconsistente");
const PedidoPendenteExcecao = require("../exceptions/PedidoPendenteExcecao");
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
    console.log(this.pedidos)
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

  validarPedidosDuplicados() {
    const pedidosMapeados = new Map()
    this.pedidos.forEach((pedido) => {
      if(pedidosMapeados.has(pedido.numeroItem)) { //verificar se existe algum pedido com o numero_item duplicado
        throw new PedidosDuplicadoExcecao(pedido)
      }
      return pedidosMapeados.set(pedido.numeroItem, pedido)
    })
  }

  ordenarPedidos() {
    const pedidosOrdenados = this.pedidos.sort((a, b) => a.numeroItem - b.numeroItem) //ordena o numero_item dos pedidos em ordem crescente
    //console.log(pedidosOrdenados)
  
    // for(let i = 0; i < this.pedidos.length; i++) {
    //   if(pedidosOrdenados[i]?.numeroItem !== i+1) {
    //     //console.log("pedidos ordenados: ", pedidosOrdenados[i])
    //    // throw new PedidoInconsistente(pedidosOrdenados[i])
    //   }
    // }
  }

  validarPedidosComNotas(relatorioPedidos) {
    this.pedidos.forEach((pedido) => {
      if(pedido.numeroItem == this.numeroItem) {
          if(pedido.quantidadeProduto <= this.quantidadeProduto) {
              relatorioPedidos.push(["Pedidos válidos: ", pedido.codigoProduto, "numero_item: " + pedido.numeroItem, "idNota: " + this.id, "idPedido: " + pedido.id, "Valor total: " + pedido.calcularValor()])
          } else {
              relatorioPedidos.push(["Pedidos pendentes: ", pedido.codigoProduto, "numero_item: " + pedido.numeroItem, "idNota: " + this.id, "idPedido: " + pedido.id, "Valor total: " + pedido.calcularValor(), "Saldo do valor: " + this.calcularQtdProdutosNosPedidos()])
              //return relatorioPedidos.push([new PedidoPendenteExcecao(pedido)])
          }
       } else {
         relatorioPedidos.push(["Pedidos excedidos: ", pedido.codigoProduto, pedido.numeroItem, this.id, pedido.id])
      }
  })

  // const pedidosOrdenados = this.pedidos.sort((a, b) => a.numeroItem - b.numeroItem) //ordena o numero_item dos pedidos em ordem crescente
  // console.log(pedidosOrdenados)

  // for(let i = 0; i < this.pedidos.length; i++) {
  //   if(pedidosOrdenados[i]?.numeroItem !== i+1) {
  //     //console.log("pedidos ordenados: ", pedidosOrdenados[i])
  //    // throw new PedidoInconsistente(pedidosOrdenados[i])
  //   }
  // }

  //Para continuar: 

  // pedidosParsed ou this.pedidos.forEach((pedido) => {
  //   if(this.numeroItem !== pedido.numeroItem && this.idPedido !== pedido.id) {
  //     console.error("Id pedido e numero item que não existem: \n", pedido ,"\n", this)
  //   }
  // })
}

  validarValoresDosPedidosENotas(produtosPedidos, somaValoresDoPedidos) {
    const somatorioValores = this.pedidos.reduce((total, pedido) => total + pedido.calcularValor(), 0)

    const calculoTotal = this.pedidos.find((pedido) => {
        produtosPedidos.set(pedido.id, this.calcularQtdProdutosNosPedidos())
        somaValoresDoPedidos.set(pedido.id, somatorioValores)
    })

    return calculoTotal;
  }

  calcularQtdProdutosNotas(produtosNotas) {
    if(!produtosNotas.has(this.id) && !produtosNotas.has(this.numeroItem)) { //.has() -> verifica se existe em produtosNotas a chave contendo o id
      //throw new NotaInconsistente(this)
    }

    if(produtosNotas.has(this.id)) { //.has() -> verifica se existe em produtosNotas a chave contendo o id
      return produtosNotas.set(this.id, produtosNotas.get(this.id) + this.quantidadeProduto)
  } else {
      return produtosNotas.set(this.id, this.quantidadeProduto)
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
