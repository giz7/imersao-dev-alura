// Aguarda o DOM ser completamente carregado antes de executar o script

let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let dados = [];

async function iniciarBusca() {
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json");
            dados = await resposta.json();
        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
            return;
        }
    }

    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );
    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    // Limpa o container antes de renderizar novos cards
    cardContainer.innerHTML = "";

    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
                <h2>${dado.nome}</h2>
                <p>Ano de criação: ${dado.data_criacao}</p>
                <p>${dado.descricao}</p>
                <a href="${dado.link}" target="_blank">Saiba mais</a>
            `;
        cardContainer.appendChild(article);
    }
}

function buscar() {
    // Verifica se o campo de busca existe
    if (!campoBusca) return;
}

// Inicia a aplicação
// iniciarBusca();

