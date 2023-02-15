const notasParsed = require("./leitura/leituraNotas");
const fs = require("fs");
const path = require("path");

class SomarValoresTotais extends Map {}
class SomarProdutosPedidos extends Map {}
class SomarProdutosNota extends Map {}

const somaValoresDoPedidos = new SomarValoresTotais();
const produtosPedidos = new SomarProdutosPedidos();
const produtosNotas = new SomarProdutosNota();

const relatorioPedidoPendentes = [];
const relatorioPedidoValidos = [];

const verificarCruzamento = () => {
  notasParsed.forEach((nota) => {
    nota.ordenarPedidos();

    console.log(nota.id, nota.toTxt());
    nota.pedidos.forEach((pedido) => {
      console.log(pedido.id, pedido.toTxt());
    });
    nota.validarPedidosDuplicados();
    nota.validarPedidosComNotas(
      relatorioPedidoPendentes,
      relatorioPedidoValidos
    );
    nota.validarValoresDosPedidosENotas(produtosPedidos, somaValoresDoPedidos);
    nota.calcularQtdProdutosNotas(produtosNotas);
  });
};

verificarCruzamento();

fs.writeFileSync(path.resolve("Cruzamento", "pedidos_pendentes.txt"), "");
fs.writeFileSync(path.resolve("Cruzamento", "pedidos_validos.txt"), "");

relatorioPedidoPendentes.forEach((relatorio) => {
  fs.appendFileSync(
    path.resolve("Cruzamento", "pedidos_pendentes.txt"),
    "\n" + relatorio.data
  );
});

relatorioPedidoValidos.forEach((relatorio) => {
  fs.appendFileSync(
    path.resolve("Cruzamento", "pedidos_validos.txt"),
    "\n" + relatorio.data
  );
});
