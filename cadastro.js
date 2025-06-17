document.getElementById("cpf").addEventListener("input", function () {
    let value = this.value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    this.value = value;
  });

  document.getElementById("telefone").addEventListener("input", function () {
    let value = this.value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d{5})(\d{1,4})$/, "$1-$2");
    this.value = value;
  });

document.getElementById('cep').addEventListener('blur', function() {
    fetch(`https://viacep.com.br/ws/${this.value}/json/`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('rua').value = data.logradouro || "";
            document.getElementById('bairro').value = data.bairro || "";
            document.getElementById('cidade').value = data.localidade || "";
            document.getElementById('estado').value = data.uf || "";
        });
});

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const necessidade = {
        instituicao: document.getElementById('instituicao').value,
        tipo: document.getElementById('tipo').value,
        nome: document.getElementById('nome').value,            
        telefone: document.getElementById('telefone').value,    
        cpf: document.getElementById('cpf').value,             
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        cep: document.getElementById('cep').value,
        rua: document.getElementById('rua').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
       
    };

    const lista = JSON.parse(localStorage.getItem('necessidades') || "[]");
    lista.push(necessidade);
    localStorage.setItem('necessidades', JSON.stringify(lista));
    alert("Cadastrado com sucesso!!!");
    this.reset();
});

