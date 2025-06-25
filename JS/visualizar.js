
// Recupera a lista de necessidades do localStorage (ou cria lista vazia)
const lista = JSON.parse(localStorage.getItem('necessidades') || "[]");

// Formata parcialmente o CPF para esconder parte dos números, mantendo a segurança
function formatarCPFparcial(cpf) {
    // Espera formato: 000.000.000-00
    if (!cpf || cpf.length !== 14) return cpf;
    return `${cpf.slice(0, 3)}.***.***-${cpf.slice(12)}`;// Substitui os dígitos do meio por asteriscos, ex: 123.***.***-45
     
}
// Renderiza a lista de necessidades filtrada e pesquisada
function renderLista(filtro = "", busca = "") {
    const container = document.getElementById('lista');
    container.innerHTML = '';

     // Filtra os itens conforme o filtro e o texto da busca (no título ou descrição)
    lista.filter(item => {
        return (filtro === "" || item.tipo === filtro) &&
               (busca === "" || item.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                item.descricao.toLowerCase().includes(busca.toLowerCase()));
    }).forEach(item => {
   // Cria um card para cada item filtrado com seus dados formatados
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `<h3>${item.titulo}</h3>
                         <p><strong>Instituição:</strong> ${item.instituicao}</p>
                         <p><strong>Tipo:</strong> ${item.tipo}</p>
                         <p><strong>Descrição:</strong> ${item.descricao}</p>
                         <p><strong>Voluntário:</strong> ${item.nome}</p>
                         <p><strong>CPF:</strong> ${formatarCPFparcial(item.cpf)}</p>
                         <p><strong>Telefone:</strong> ${item.telefone}</p>`;
        container.appendChild(div);
    });
}

// Atualiza a lista ao digitar na pesquisa
document.getElementById('pesquisa').addEventListener('input', e => {
    renderLista(document.getElementById('filtro').value, e.target.value);
});

// Atualiza a lista ao mudar o filtro
document.getElementById('filtro').addEventListener('change', e => {
    renderLista(e.target.value, document.getElementById('pesquisa').value);
});

// Renderiza a lista inicialmente sem filtro nem busca
renderLista();