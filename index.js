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

const validarPedidoNaNota = (nota) => {
    nota.pedidos.forEach((pedido) => {
        if(pedido.numeroItem == nota.numeroItem) {
            if(pedido.quantidadeProduto <= nota.quantidadeProduto) {
                relatorioPedidos.push(["Pedidos válidos: ", pedido.codigoProduto, pedido.numeroItem, nota.idNota, pedido.idPedido])
            } else {
                //return relatorioPedidos.push([new RangeError("A soma das quantidades informadas para esse item nas notas lidas ultrapassou a quantidade do item do pedido")])
                relatorioPedidos.push(["Pedidos excedidos: ", pedido.codigoProduto, pedido.numeroItem, nota.idNota, pedido.idPedido])
            }
        } else {
            relatorioPedidos.push(["Pedidos pendentes: ", pedido.codigoProduto, pedido.numeroItem, nota.idNota, pedido.idPedido])
        }
        //return relatorioPedidos.push(["Outras notas:", nota.idNota, nota.numeroItem ])
    })
}

const calcularValoresPedidosENotas = (nota) => {
    const somatorioValores = nota.pedidos.reduce((total, pedido) => total + pedido.calcularValor(), 0)

    const calculoTotal = nota.pedidos.find((pedido) => {
        somaProdutosPedidos.set(pedido.idPedido, nota.calcularQtdProdutosNosPedidos())
        somaValoresDoPedidos.set(pedido.idPedido, somatorioValores)
    })

    return calculoTotal;
}

const calcularQtdProdutosNotas = ({idNota, quantidadeProduto}) => {
    if(somaProdutosNotas.has(idNota)) { //.has() -> verifica se existe em somaProdutosNotas a chave contendo o idNota
        return somaProdutosNotas.set(idNota, somaProdutosNotas.get(idNota) + quantidadeProduto)
    } else {
        return somaProdutosNotas.set(idNota, quantidadeProduto)
    }
}

// const calcularDiferenca = (quantidadeProduto, nota) => {
//     somaProdutosNotas.get(quantidadeProduto) - somaProdutosPedidos.get()
// }

const verificarCruzamento = () => {
    notasParsed.forEach((nota) => {

        console.log(nota.idNota, nota.toTxt())
        nota.pedidos.forEach((pedido) => {

            console.log(pedido.idPedido, pedido.toTxt())

        })

        validarPedidoNaNota(nota);
        calcularValoresPedidosENotas(nota);
        calcularQtdProdutosNotas(nota)

    })}

verificarCruzamento()

console.log(relatorioPedidos)
console.log(somaProdutosNotas)
console.log(somaProdutosPedidos)
console.log(somaValoresDoPedidos)


fs.writeFileSync(path.resolve('Cruzamento.txt'), JSON.stringify(relatorioPedidos))

