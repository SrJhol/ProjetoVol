document.getElementById("cpf").addEventListener("input", function () {
    let value = this.value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    this.value = value;

    const cpfLimpo = this.value.replace(/[^\d]+/g, "");
    const messageDiv = document.getElementById("cpf-message");

    if (cpfLimpo.length === 11) {
        if (validarCPF(cpfLimpo)) {
            messageDiv.textContent = "CPF Válido";
            messageDiv.className = "message success";
        } else {
            messageDiv.textContent = "CPF Inválido";
            messageDiv.className = "message error";
        }
        messageDiv.style.display = "block";
    } else {
        messageDiv.style.display = "none";
    }
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

    const cpfLimpo = document.getElementById('cpf').value.replace(/[^\d]+/g, "");
    if (!validarCPF(cpfLimpo)) {
        alert("CPF inválido! Corrija antes de enviar.");
        return;
    }

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

    const messageDiv = document.getElementById("cpf-message");
    messageDiv.style.display = "none";
});

function validarCPF(cpf){
    cpf = cpf.replace(/[^\d]+/g,"");

    if(cpf.length !== 11 || /^(\d)\1+$/.test(cpf)){
        return false;
    }

    let soma = 0;
    let resto; 

    for(let i=1; i<= 9; i++){
        soma += parseInt(cpf.substring(i-1, i)) * (11-i);
    }
    resto = (soma*10)% 11;
    if(resto === 10 || resto === 11){
        resto = 0;
    }
    if(resto !== parseInt(cpf.substring(9,10))){
        return false;
    }

    soma=0;

    for(let i=1; i<= 10; i++){
        soma += parseInt(cpf.substring(i-1, i)) * (12-i);
    }
    resto = (soma*10)% 11;
    if(resto === 10 || resto === 11){
        resto = 0;
    }
    if(resto !== parseInt(cpf.substring(10,11))){
        return false;
    }

    return true;
}