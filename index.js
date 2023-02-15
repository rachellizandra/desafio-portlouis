const notasParsed = require('./leitura/leituraNotas');
const fs = require('fs');
const path = require('path');

class SomarValoresTotais extends Map {}
class SomarProdutosPedidos extends Map {}
class SomarProdutosNota extends Map {}

const somaValoresDoPedidos = new SomarValoresTotais();
const produtosPedidos = new SomarProdutosPedidos();
const produtosNotas = new SomarProdutosNota();

const relatorioPedidos = [];

const verificarCruzamento = () => {
    notasParsed.forEach((nota) => {
        nota.ordenarPedidos()

        //console.log(nota.id, nota.toTxt())
        nota.pedidos.forEach((pedido) => {

            //console.log(pedido.id, pedido.toTxt())

        })

        nota.validarPedidosDuplicados()
        nota.validarPedidosComNotas(relatorioPedidos);
        nota.validarValoresDosPedidosENotas(produtosPedidos, somaValoresDoPedidos);
        nota.calcularQtdProdutosNotas(produtosNotas); 

    })}

verificarCruzamento()

// console.log(relatorioPedidos)
// console.log(produtosNotas)
// console.log(produtosPedidos)
// console.log(somaValoresDoPedidos)

fs.writeFileSync(path.resolve('Cruzamento.txt'), JSON.stringify(relatorioPedidos))

//console.log(notasParsed[0])



