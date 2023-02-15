const pedidosParsed = require("../../leitura/leituraPedidos");
const NotasInconsistente = require("../exceptions/NotasInconsistentes");
const PedidosDuplicadoExcecao = require("../exceptions/PedidoDuplicadoExcecao");
const PedidoInconsistente = require("../exceptions/PedidoInconsistente");
const PedidoPendenteExcecao = require("../exceptions/PedidoPendenteExcecao");
const Utils = require('./Utils');

class Nota{
  constructor(id, itens) {
    this.id = id;
    this.itens = itens
    this.pedidos = []
    this.itens.forEach((item) => {
      const pedido = pedidosParsed.find(
        (pedido) => pedido.id == item.idPedido && item.numeroItem == pedido.numeroItem
        );
        this.pedidos.push(pedido)
    })
    this._validarTipos();
  }

  _validarTipos() {
    //_ ou # indica que o método é privado
    this.itens.forEach((item) => {
      Utils.validarValorInteiro(item.idPedido,"idPedido");

      Utils.validarValorMinimo(item.idPedido, 0, "idPedido");
      
      Utils.validarValorInteiro(item.numeroItem, "numeroItem");
  
      Utils.validarValorMinimo(item.numeroItem, 0, "numeroItem");
  
      Utils.validarValorInteiro(item.quantidadeProduto, "quantidadeProduto");
  
      Utils.validarValorMinimo(item.quantidadeProduto, 0, "quantidadeProduto");
    })

  }

  validarPedidosDuplicados() {
    try {
      const pedidosMapeados = new Map()
      this.pedidos.forEach((pedido) => {
        if(pedidosMapeados.has(pedido.numeroItem)) { //verifica se existe algum pedido com o numero_item duplicado
          throw new PedidosDuplicadoExcecao(pedido)
        }
        return pedidosMapeados.set(pedido.numeroItem, pedido)
      })
    } catch (error) {
      console.error(error)
    }

  }

  ordenarPedidos() {
    const pedidosOrdenados = this.pedidos.sort((a, b) => a.numeroItem - b.numeroItem) //ordena o numero_item dos pedidos em ordem crescente

    //verificar por que não está validando 
    // try {
    //   for(let i = 0; i < this.pedidos.length; i++) {
    //     if(pedidosOrdenados[i].numeroItem !== i+1) {
    //       //console.log("pedidos ordenados: ", pedidosOrdenados[i])
    //       throw new PedidoInconsistente(pedidosOrdenados[i])
    //     }
    //   }
    // } catch (error) {
    //   console.error(error)
    // }
    return pedidosOrdenados
  }

  validarPedidosComNotas(relatorioPedidoPendentes, relatorioPedidoValidos) {
    this.itens.forEach((item) => {
      this.pedidos.forEach((pedido) => {
        if(pedido.numeroItem == item.numeroItem) {
            if(pedido.quantidadeProduto <= item.quantidadeProduto) {
              return relatorioPedidoValidos.push({data: `código_produto: ${pedido.codigoProduto}, número_item: ${pedido.numeroItem}, idPedido: ${pedido.id}, valor_total: ${pedido.calcularValor()}, saldo_valor: ${this.calcularQtdProdutosNosPedidos()}`})
              } else {
                //verificar por que a função this.calcularDiferencaDeProdutos() está retornando undefined em pedidos pendentes
              return relatorioPedidoPendentes.push({data: `código_produto: ${pedido.codigoProduto}, número_item: ${pedido.numeroItem}, idPedido: ${pedido.id}, valor_total: ${pedido.calcularValor()}, saldo_valor: ${this.calcularQtdProdutosNosPedidos()}, "quantidade_faltante:" ${this.calcularDiferencaDeProdutos()}`})
            }
         }
    })
    })
}

  validarValoresDosPedidosENotas(produtosPedidos, somaValoresDoPedidos) {
    const somatorioValores = this.pedidos.reduce((total, pedido) => total + pedido.calcularValor(), 0)

    const calculoTotal = this.pedidos.find((pedido) => {
        produtosPedidos.set(pedido.id, this.calcularQtdProdutosNosPedidos())
        somaValoresDoPedidos.set(pedido.id, somatorioValores)
    })

    return calculoTotal;
  }

  
  calcularQtdProdutosNosPedidos() {
    return this.pedidos.reduce(
      (total, pedido) => total + pedido.quantidadeProduto,
      0
    );
}

  calcularQtdProdutosNotas(produtosNotas) {
    this.itens.forEach((item) => {
      if(!produtosNotas.has(this.id) && !produtosNotas.has(item.numeroItem)) { //.has() -> verifica se existe em produtosNotas a chave contendo o id e o numeroitem
        //throw new NotasInconsistente(item)
      }
      if(produtosNotas.has(this.id)) { //.has() -> verifica se existe em produtosNotas a chave contendo o id
        const somatorioProdutosNotas = produtosNotas.get(this.id) + item.quantidadeProduto
        return produtosNotas.set(this.id, somatorioProdutosNotas)
    } else {
        return produtosNotas.set(this.id, item.quantidadeProduto)
    }
    })
  }

  calcularDiferencaDeProdutos() {
    this.itens.forEach((item) => {
    this.pedidos.forEach((pedido) => {
        if(pedido.numeroItem == item.numeroItem) {
          if(pedido.quantidadeProduto > item.quantidadeProduto) {
            const somatorioProdutosNotas = item.quantidadeProduto
            const somatorioProdutosPedidos = pedido.quantidadeProduto 
        
            let diferencaDeProdutos = somatorioProdutosPedidos - somatorioProdutosNotas
            return diferencaDeProdutos;
          }
          return item.quantidadeProduto;
        }
      })
    })
   }

  
//verificar por que a função .toTxt() está retornando undefined em notas
  toTxt() {
    return (
      this.itens.forEach((item) => {
        "{" +
        '"id_pedido":' +
        item.idPedido +
        ", " +
        '"número_item":' +
        item.numeroItem +
        ", " +
        '"quantidade_produto":' +
        item.quantidadeProduto +
        "}"
      })
    );
  }
}

module.exports = Nota;
