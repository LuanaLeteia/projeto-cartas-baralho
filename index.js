document.getElementById('botao').addEventListener('click', () => {
    tirarUmaCartaDoBaralho()
})

const descricoesTruco = {
    "AS": "A melhor carta do truco! Ganha de todas as outras cartas.",
    "KS": "Carta muito forte, perdendo somente para o Zap.",
    "QS": "Carta forte, acima de cartas numéricas.",
    "JS": "Carta média, vence cartas de número, mas perde para figuras maiores.",
    "0S": "Carta fraca no truco.",
    "9S": "Carta fraca, usada mais para descarte.",
    "8S": "Carta fraca, perde para quase todas.",
    "7S": "Carta forte! Uma das manilhas quando o naipe é paus.",
    "6S": "Carta fraca.",
    "5S": "Carta fraca.",
    "4S": "Carta fraca."
}

function obterDescricao(codigoCarta) {
    const valor = codigoCarta.slice(0, -1)
    const naipe = codigoCarta.slice(-1)

    if (valor === "4" && naipe === "C") return "Zap (4 de paus). A carta mais forte do truco!";
    if (valor === "7" && naipe === "H") return "Sete de copas. Segunda carta mais forte do truco!";
    if (valor === "A" && naipe === "S") return "Espadilha (Ás de espadas). Terceira carta mais forte!";
    if (valor === "7" && naipe === "D") return "Sete de ouros. Quarta carta mais forte!";

    return descricoesTruco[valor + naipe] || "Carta comum, usada em jogadas de apoio.";
}

async function criarBaralhoEmbaralhado() {
    const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    const resposta = await fetch(url)
    return await resposta.json()
}

async function tirarUmaCarta(deck_id){
    const url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
    const resposta = await fetch(url)
    return await resposta.json()
}

async function tirarUmaCartaDoBaralho(){
    const baralho = await criarBaralhoEmbaralhado()
    const carta = await tirarUmaCarta(baralho.deck_id)
    
    const imagemCarta = carta.cards[0].image
    const codigoCarta = carta.cards[0].code  

    document.getElementById('carta').src = imagemCarta

    document.getElementById('descricao-carta').textContent = obterDescricao(codigoCarta)
}

tirarUmaCartaDoBaralho()