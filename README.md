# Gerador de Base de Conhecimento com Gemini API

Este projeto consiste em um script Node.js que utiliza a API do Google Gemini para criar e expandir uma base de conhecimento sobre tecnologias de software. A cada execução, o script gera 25 novas entradas únicas em formato JSON, garantindo que não haja duplicatas em relação ao conteúdo já existente.

## Sobre o Projeto

O objetivo é automatizar a curadoria de conteúdo sobre linguagens de programação, frameworks, bancos de dados e outras ferramentas relevantes. O script foi desenvolvido para ser robusto e resiliente, incorporando validação de dados, tratamento de erros e uma estratégia de novas tentativas com *backoff* exponencial para lidar com falhas de comunicação com a API.

### Principais Funcionalidades

- **Geração de Conteúdo Estruturado**: Utiliza o `responseSchema` para instruir a Gemini API a retornar um array de objetos JSON com uma estrutura pré-definida (`nome`, `descricao`, `data_criacao`, `link`, `tags`).
- **Prevenção de Duplicatas**: Antes de solicitar novos dados, o script lê o arquivo `baseDeConhecimento.json`, extrai os nomes das tecnologias existentes e os envia no prompt para a API, instruindo-a a não gerar entradas repetidas.
- **Validação da Resposta**: Verifica se a resposta da API é um array JSON válido e se contém exatamente o número de itens solicitado (`TOTAL_ITEMS`).
- **Resiliência e Tratamento de Erros**: Implementa um sistema de até 5 tentativas com *backoff* exponencial em caso de falhas na chamada à API, aumentando a chance de sucesso em condições de instabilidade de rede.
- **Persistência de Dados**: Carrega a base de conhecimento existente, combina com as novas entradas geradas e salva o resultado de volta no arquivo `baseDeConhecimento.json`, preservando o histórico e expandindo-o a cada execução.

### Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para o script.
- **Google Gemini API**: Modelo de IA generativa para a criação do conteúdo.
- **dotenv**: Para gerenciamento de variáveis de ambiente de forma segura.

## Como Começar

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

- **Node.js**: Versão 16 ou superior.
- **Chave da Gemini API**: Você precisa de uma chave de API válida para usar o serviço. Obtenha-a em Google AI Studio.

### Instalação e Configuração

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo chamado `.env` na raiz do projeto e adicione sua chave da API:
   ```
   GEMINI_API_KEY="SUA_CHAVE_AQUI"
   ```

### Execução

Para iniciar o script e gerar as novas entradas na base de conhecimento, execute o seguinte comando no terminal:

```sh
npm start
```

Ao final da execução, o arquivo `baseDeConhecimento.json` será atualizado com 25 novos itens, e o console exibirá o status do processo.

## Estrutura do Projeto

```
├── gerador.js                # Script principal com a lógica de geração e atualização.
├── baseDeConhecimento.json   # Arquivo de dados que armazena a base de conhecimento.
├── package.json              # Define as dependências e scripts do projeto.
├── .env                      # (Não versionado) Armazena a chave da API.
└── README.md                 # Esta documentação.
```

## Customização

É possível ajustar o comportamento do script editando as constantes no arquivo `gerador.js`:

- **`TOTAL_ITEMS`**: Altere o valor desta constante para definir quantos itens devem ser gerados a cada execução. O padrão é `25`.
  ```javascript
  const TOTAL_ITEMS = 25;
  ```
- **`responseSchema`**: Modifique este objeto para alterar a estrutura do JSON que a API deve retornar.
- **`systemPrompt` e `userQuery`**: Ajuste os prompts para refinar o tipo de conteúdo que a Gemini API irá gerar.

## Avisos

- **Sobrescrita de Arquivo**: O script foi projetado para sobrescrever o arquivo `baseDeConhecimento.json` com a versão combinada (antiga + nova). Faça um backup se desejar preservar uma versão anterior.
- **Custos da API**: Esteja ciente dos limites de uso e dos possíveis custos associados à Gemini API, especialmente se planeja executar o script em larga escala ou com alta frequência.

