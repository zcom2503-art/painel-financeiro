// Seleção dos elementos da interface
const formulario = document.getElementById('formulario');
const inputDescricao = document.getElementById('descricao');
const inputValor = document.getElementById('valor');
const displayEntradas = document.getElementById('entradas');
const displaySaidas = document.getElementById('saidas');
const displaySaldo = document.getElementById('saldo');
const listaTransacoes = document.getElementById('lista-transacoes');

// Estado da aplicação
let totalEntradas = 0;
let totalSaidas = 0;
let saldoAtual = 0;

// Função para formatar números para moeda brasileira
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Evento de envio do formulário
formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const descricao = inputDescricao.value;
    const valor = parseFloat(inputValor.value);

    if (isNaN(valor)) return;

    // Criar elemento da lista de histórico
    const li = document.createElement('li');
    
    if (valor > 0) {
        // Lógica de Entrada
        totalEntradas += valor;
        li.classList.add('item-entrada');
        li.innerHTML = `
            <span>${descricao}</span>
            <span style="color: #00ff88;">+ ${formatarMoeda(valor)}</span>
        `;
    } else {
        // Lógica de Saída (transforma negativo em positivo para o cálculo de soma das saídas)
        const valorPositivo = Math.abs(valor);
        totalSaidas += valorPositivo;
        li.classList.add('item-saida');
        li.innerHTML = `
            <span>${descricao}</span>
            <span style="color: #ff4444;">- ${formatarMoeda(valorPositivo)}</span>
        `;
    }

    // Adiciona ao topo da lista
    listaTransacoes.prepend(li);

    // Atualiza os cálculos globais
    saldoAtual = totalEntradas - totalSaidas;

    // Atualiza a tela
    displayEntradas.innerText = formatarMoeda(totalEntradas);
    displaySaidas.innerText = formatarMoeda(totalSaidas);
    displaySaldo.innerText = formatarMoeda(saldoAtual);

    // Limpa os campos
    formulario.reset();
    inputDescricao.focus();
});