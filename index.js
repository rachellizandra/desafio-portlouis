const notasParsed = require('./leituraNotas');
const fs = require('fs');
const path = require('path');

class SomarValoresTotais extends Map {}
class SomarProdutosPedidos extends Map {}
class SomarProdutosNota extends Map {}

const somaValoresDoPedidos = new SomarValoresTotais();
const somaProdutosPedidos = new SomarProdutosPedidos();
const somaProdutosNotas = new SomarProdutosNota();

const relatorioPedidos = [];

const verificarCruzamento = () => {
    notasParsed.forEach((nota) => {

        console.log(nota.id, nota.toTxt())
        nota.pedidos.forEach((pedido) => {

            console.log(pedido.id, pedido.toTxt())

        })

        nota.validarPedidos(relatorioPedidos);
        nota.validarValoresDosPedidosENotas(somaProdutosPedidos, somaValoresDoPedidos);
        nota.calcularQtdProdutos(somaProdutosNotas); 

    })}

verificarCruzamento()

// console.log(relatorioPedidos)
// console.log(somaProdutosNotas)
// console.log(somaProdutosPedidos)
// console.log(somaValoresDoPedidos)

fs.writeFileSync(path.resolve('Cruzamento.txt'), JSON.stringify(relatorioPedidos))


