# Contexto
Programa cuja execução cruza pedidos e notas gerando uma listagem de pedidos
pendentes.

# Pedidos
Estão em arquivos de tipo texto UTF-8 num único diretório. Cada arquivo é um pedido cujo id é o nome do arquivo. Cada linha do arquivo deve ser um JObject com as seguintes chaves: número_item (valor numérico, inteiro e positivo), código_produto (valor alfanumérico), quantidade_produto (valor numérico, inteiro e positivo) e valor_unitário_produto (valor numérico e positivo, aceitar até 2 casas decimais).

# Notas
Estão em arquivos de tipo texto UTF-8 num único diretório. Cada arquivo é uma nota cujo id é o nome do arquivo. Cada linha do arquivo deve ser um JObject com as seguintes chaves: id_pedido (alfanumérico), número_item (valor numérico, inteiro e positivo) e quantidade_produto (valor numérico, inteiro e positivo).

# Cruzamento de pedidos e notas:
- ler todos os pedidos lançando exceção caso algum valor não corresponda ao tipo descrito, caso haja repetição de algum número_item de um mesmo pedido ou caso falte algum número_item (deve haver todos os números consecutivos de 1 ao maior número de item);
- ler todas as notas lançando exceção caso algum valor não corresponda ao tipo descrito ou caso seja informado algum par de id_pedido e número_item que não exista;
- identificar os pedidos pendentes, ou seja, aqueles para os quais haja pelo menos um item pendente. Um item está pendente se não teve toda a sua quantidade atendida pela soma das quantidades informadas para esse item nas notas lidas (por outro lado, se essa soma ultrapassar a quantidade do item do pedido, deve ser lançada uma exceção informando esse problema).

# Geração de listagem de pedidos pendentes
Gravar um arquivo de tipo texto com a listagem dos pedidos pendentes. Para cada pedido pendente, informar: o valor total do pedido (soma dos valores totais dos seus itens), o saldo do valor (soma dos valores correspondentes ao saldo de quantidade de cada item pendentes) e uma lista dos itens pendentes, na qual cada item pendente exibe o número do item e o saldo da quantidade (quanto faltou de quantidade do produto para que o item não ficasse pendente).

# Passo a passo de utilização deste repositório
- Dar um fork ou clonar este repositório
- Executar o seguinte comando para instalar todas as dependências: npm install
- Para verificar se o código está funcionando, instalar o [Node.js](https://nodejs.org/en/download/) (qualquer versão a partir do 10), acessar a pasta principal desafio-portlouis, acessar o terminal e digitar o comando: node index.js

# Implementações futuras
- Verificar os erros da classe Nota
- Criar mais classes derivadas de Nota para criar responsabilidade única
- Refatoração do código
- Testes unitários utilizando Jest