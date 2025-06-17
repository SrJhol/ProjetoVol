const lista = JSON.parse(localStorage.getItem('necessidades') || "[]");

function formatarCPFparcial(cpf) {
    // Espera formato: 000.000.000-00
    if (!cpf || cpf.length !== 14) return cpf;
    return `${cpf.slice(0, 3)}.***.***-${cpf.slice(12)}`;
}

function renderLista(filtro = "", busca = "") {
    const container = document.getElementById('lista');
    container.innerHTML = '';

    lista.filter(item => {
        return (filtro === "" || item.tipo === filtro) &&
               (busca === "" || item.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                item.descricao.toLowerCase().includes(busca.toLowerCase()));
    }).forEach(item => {
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

document.getElementById('pesquisa').addEventListener('input', e => {
    renderLista(document.getElementById('filtro').value, e.target.value);
});

document.getElementById('filtro').addEventListener('change', e => {
    renderLista(e.target.value, document.getElementById('pesquisa').value);
});

renderLista();