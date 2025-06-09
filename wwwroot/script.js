const apiUrl = '/filmes';
// Variável para controlar se estamos editando (terá um ID) ou cadastrando (será null)
let idFilmeEmEdicao = null;

// --- FUNÇÕES DE FORMULÁRIO ---

/**
 * Limpa todos os campos do formulário de cadastro e reseta o modo de edição.
 */
function limparFormulario() {
    document.getElementById('titulo-filme').value = "";
    document.getElementById('duracao-filme').value = "";
    document.getElementById('genero-filme').value = "";
    document.getElementById('descricao-filme').value = "";
    document.getElementById('diretor-filme').value = "";

    // Reseta o estado de edição
    idFilmeEmEdicao = null;
    const btnCadastrar = document.getElementById('btn-cadastrar');
    btnCadastrar.textContent = 'Salvar Filme';
    document.getElementById('titulo-filme').focus();
}

/**
 * Pega os dados do formulário, valida e envia para a API (Criação ou Atualização).
 */
async function submeterFormularioFilme() {
    // 1. Obter os dados do formulário
    const titulo = document.getElementById('titulo-filme').value.trim();
    const duracao = parseFloat(document.getElementById('duracao-filme').value);
    const genero = document.getElementById('genero-filme').value.trim();
    const descricao = document.getElementById('descricao-filme').value.trim();
    const diretor = document.getElementById('diretor-filme').value.trim();

    // 2. Validar os dados
    if (!titulo || isNaN(duracao) || !genero || !descricao || !diretor) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }
    
    const dadosFilme = { titulo, duracao, genero, descricao, diretor };

    let metodoFetch = 'POST';
    let urlFetch = apiUrl;
    let mensagemSucesso = "Filme cadastrado com sucesso!";

    // 3. Verificar se é uma atualização (PUT) ou criação (POST)
    if (idFilmeEmEdicao !== null) {
        metodoFetch = 'PUT';
        urlFetch = `${apiUrl}/${idFilmeEmEdicao}`;
        dadosFilme.id = idFilmeEmEdicao;
        mensagemSucesso = `Filme ID ${idFilmeEmEdicao} atualizado com sucesso!`;
    }

    // 4. Enviar para a API
    try {
        const resposta = await fetch(urlFetch, {
            method: metodoFetch,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosFilme)
        });

        if (!resposta.ok) {
            throw new Error(`Erro ao salvar filme. Status: ${resposta.status}`);
        }

        alert(mensagemSucesso);
        limparFormulario();
        await carregarTodosFilmes(); // Atualiza a lista

    } catch (erro) {
        alert('Erro: ' + erro.message);
    }
}

// --- FUNÇÕES DE INTERAÇÃO COM A API (CRUD) ---

/**
 * Busca dados de um filme na API e preenche o formulário para edição.
 * @param {number} id - O ID do filme a ser editado.
 */
async function editarFilme(id) {
    try {
        const resposta = await fetch(`${apiUrl}/${id}`);
        if (!resposta.ok) {
            throw new Error(`Erro ao buscar dados do filme para edição. Status: ${resposta.status}`);
        }
        const filme = await resposta.json();

        // Preenche o formulário com os dados do filme
        document.getElementById('titulo-filme').value = filme.titulo;
        document.getElementById('duracao-filme').value = filme.duracao;
        document.getElementById('genero-filme').value = filme.genero;
        document.getElementById('descricao-filme').value = filme.descricao;
        document.getElementById('diretor-filme').value = filme.diretor;

        // Entra no "modo de edição"
        idFilmeEmEdicao = id;
        const btnCadastrar = document.getElementById('btn-cadastrar');
        btnCadastrar.textContent = 'Atualizar Filme';

        // Foca no formulário para o usuário
        document.getElementById('titulo-filme').focus();

    } catch (erro) {
        alert('Erro ao carregar dados para edição: ' + erro.message);
    }
}

/**
 * Remove um filme da API com base no ID.
 * @param {number} id - O ID do filme a ser removido.
 */
async function removerFilme(id) {
    if (!confirm(`Tem certeza que deseja excluir o filme com ID ${id}?`)) {
        return;
    }
    try {
        const resposta = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        if (!resposta.ok) {
            throw new Error(`Erro ao excluir o filme. Status: ${resposta.status}`);
        }
        alert(`Filme com ID ${id} excluído com sucesso!`);
        await carregarTodosFilmes();
    } catch (erro) {
        alert('Erro ao excluir: ' + erro.message);
    }
}

/**
 * Busca todos os filmes na API e atualiza a tabela.
 */
async function carregarTodosFilmes() {
    if (idFilmeEmEdicao !== null) {
        if (confirm("Você está editando um filme. Atualizar a lista cancelará a edição. Continuar?")) {
            limparFormulario();
        } else {
            return;
        }
    }
    try {
        const resposta = await fetch(apiUrl);
        if (!resposta.ok) {
            throw new Error(`Erro ao carregar lista. Status: ${resposta.status}`);
        }
        const filmes = await resposta.json();
        exibirFilmesNaTabela(filmes);
    } catch (erro) {
        alert('Erro ao carregar filmes: ' + erro.message);
    }
}

/**
 * Busca um único filme pelo ID fornecido no campo de busca.
 */
async function buscarFilmePorId() {
    const id = document.querySelector('.buscar input').value.trim();
    if (!id) {
        alert('Por favor, insira um ID para buscar.');
        return;
    }
    try {
        const resposta = await fetch(`${apiUrl}/${id}`);
        if (!resposta.ok) {
            throw new Error(resposta.status === 404 ? `Filme com ID ${id} não encontrado.` : `Erro ao buscar.`);
        }
        const filme = await resposta.json();
        exibirFilmesNaTabela([filme]);
    } catch (erro) {
        alert('Erro ao buscar: ' + erro.message);
    }
}

/**
 * Renderiza os filmes na tabela HTML.
 * @param {Array} filmes - Um array de objetos de filme.
 */
function exibirFilmesNaTabela(filmes) {
    const tabela = document.getElementById('tabela-filmes');
    let tbody = tabela.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        tabela.appendChild(tbody);
    }
    tbody.innerHTML = '';

    if (!filmes || filmes.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;">Nenhum filme encontrado.</td></tr>`;
    } else {
        filmes.forEach(filme => {
            tbody.innerHTML += `
                <tr>
                    <td class="coluna-acoes">
                        <button onclick="editarFilme(${filme.id})" title="Editar" class="btn-acao-editar">✏️</button>
                        <button onclick="removerFilme(${filme.id})" title="Excluir" class="btn-acao-excluir">🗑️</button>
                    </td>
                    <td>${filme.id}</td>
                    <td>${filme.titulo}</td>
                    <td>${filme.duracao} min</td>
                    <td>${filme.genero}</td>
                    <td>${filme.descricao}</td>
                    <td>${filme.diretor}</td>
                </tr>
            `;
        });
    }
}

// --- EVENT LISTENERS (OUVINTES DE EVENTOS) ---

document.getElementById('btn-buscar').addEventListener('click', buscarFilmePorId);
document.getElementById('btn-atualizar').addEventListener('click', carregarTodosFilmes);
document.getElementById('btn-cadastrar').addEventListener('click', submeterFormularioFilme);
window.addEventListener('DOMContentLoaded', carregarTodosFilmes);