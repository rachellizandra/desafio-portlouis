const fs = require('fs');
const path = require('path');
const Nota = require('../classes/principais/Nota')

const notas = fs.readdirSync(path.resolve('notas'))

const notasParsed = notas.map((file) => {
    const raw = fs.readFileSync(path.resolve('notas', file), "utf-8") //importar e leitura dos arquivos notas txt
    const stringToArray = `[${raw.replaceAll("}", "},")}]`//substituição de caracteres
    const normalizarData = stringToArray.replace(",]", "]").replaceAll(" ", "") //substituição de caracteres
    const parsedData = eval(normalizarData); //converter texto em objeto javascript
    /* pode dar o return */ parsedData.map((nota) => Object.assign(nota, {file})); //adiciona o arquivo em cada objeto
    return parsedData.map((nota) => {
        const qtdProdutoNumber = +nota["quantidade_produto"] //indica que a chave quantidade_produto é do tipo number
        return new Nota(nota["id_pedido"], nota["número_item"], qtdProdutoNumber, file[1])
    })
}).flatMap((nota) => nota)
//.forEach((nota) => console.log("A quantidade é: " + nota.calcularQtdProdutos())) //transforma o array bidimensional em unidimensional

module.exports = notasParsed

fs.writeFileSync(path.resolve('Notas.txt'), JSON.stringify(notasParsed))
