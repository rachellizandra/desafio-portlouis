const fs = require('fs');
const path = require('path');
const Pedido = require('../classes/principais/Pedido');

const pedidos = fs.readdirSync(path.resolve('pedidos'))

const pedidosParsed = pedidos.map((file) => {
    const raw = fs.readFileSync(path.resolve('pedidos', file), "utf-8") //importa e lê dos arquivos notas txt
    const stringToArray = `[${raw.replaceAll("}", "},")}]`//substituição de caracteres
    const normalizarData = stringToArray.replace(",]", "]").replaceAll(" ", "") //substituição de caracteres
    const parsedData = eval(normalizarData); //converte texto em objeto javascript
    return parsedData.map((pedido) => {
        const valorUnitarioProduto = +(+pedido["valor_unitário_produto"].replace("," , ".")).toFixed(2)
        //return Object.assign(pedido, {"valor_unitário_produto": valorUnitarioProduto})
        return new Pedido(pedido["número_item"], pedido["código_produto"], pedido["quantidade_produto"], valorUnitarioProduto, file[1]);
    }); //adiciona o arquivo em cada objeto
}).flatMap((pedido) => pedido)//transforma o array bidimensional em unidimensional

module.exports = pedidosParsed

//para criar um arquivo com a saída de todos os pedidos, basta descomentar a linha abaixo:
//fs.writeFileSync(path.resolve('Pedidos.txt'), JSON.stringify(pedidosParsed))
