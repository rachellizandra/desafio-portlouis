class Utils {
    static validarValorInteiro(valor, chave) {
        if (!Number.isInteger(valor)) {
            //this significa o valor atual e a chave é o que está sendo acessado
            throw new TypeError(`A propriedade ${chave} deve ser um número inteiro`);
          }
    }

    static validarValorMinimo(valor, minimo, chave) {
        if (valor < minimo) {
            throw new RangeError(
              `A ${chave} com o valor: ${valor} precisa ser > ${minimo} `
            );
          }
    }
}

module.exports = Utils