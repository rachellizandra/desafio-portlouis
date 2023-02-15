const fs = require('fs');
const path = require('path');
const Nota = require('../classes/principais/Nota')

const notas = fs.readdirSync(path.resolve('notas'))

const notasParsed = notas.map((file) => {
    const raw = fs.readFileSync(path.resolve('notas', file), "utf-8") //importa e lê os arquivos de notas.txt
    const stringToArray = `[${raw.replaceAll("}", "},")}]`//substituição de caracteres
    const normalizarData = stringToArray.replace(",]", "]").replaceAll(" ", "") //substituição de caracteres
    const parsedData = eval(normalizarData); //converte texto em objeto javascript
    parsedData.map((nota) => Object.assign(nota, {file})); //adiciona o arquivo em cada objeto
    return parsedData.map((nota) => {
        const qtdProdutoNumber = +nota["quantidade_produto"] //indica que a chave quantidade_produto é do tipo number
        //return new Nota(nota["id_pedido"], nota["número_item"], qtdProdutoNumber, file[1])
        return {
            id: file[1],
            idPedido: nota["id_pedido"],
            numeroItem: nota["número_item"],
            quantidadeProduto: qtdProdutoNumber
        }
    })
 }).reduce((notas, nota) => {
    nota = nota.reduce((pedidos, pedido) => { // os itens são os pedidos que estão nas notas
       pedidos.itens.push(pedido)
       pedidos.id = pedido.id
       return pedidos
    }, {
        id: nota.id,
        itens: []
    })
    notas.push(new Nota(nota.id, nota.itens))
    return notas
} , [])
//.flatMap((nota) => nota) //transforma o array bidimensional em unidimensional

module.exports = notasParsed

//para criar um arquivo com a saída de todos os pedidos, basta descomentar a linha abaixo:
//fs.writeFileSync(path.resolve('Notas.txt'), JSON.stringify(notasParsed))
