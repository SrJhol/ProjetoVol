// Formata o campo CPF conforme o usuário digita e valida o CPF
document.getElementById("cpf").addEventListener("input", function () {
    // Remove tudo que não é dígito e formata no padrão XXX.XXX.XXX-XX
    let value = this.value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    this.value = value;

    
    const cpfLimpo = this.value.replace(/[^\d]+/g, "");
    const messageDiv = document.getElementById("cpf-message");

 // Exibe mensagem de validação apenas se o CPF tiver 11 dígitos
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

// Formata o campo telefone conforme o padrão brasileiro durante a digitação
document.getElementById("telefone").addEventListener("input", function () {
    let value = this.value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d{5})(\d{1,4})$/, "$1-$2");
    this.value = value;
});

// Busca dados do endereço automaticamente pelo CEP ao perder o foco do campo
document.getElementById('cep').addEventListener('blur', function() {
    fetch(`https://viacep.com.br/ws/${this.value}/json/`)
        .then(response => response.json())
        .then(data => {
            // Preenche os campos do formulário com os dados retornados, ou vazio se não encontrado
            document.getElementById('rua').value = data.logradouro || "";
            document.getElementById('bairro').value = data.bairro || "";
            document.getElementById('cidade').value = data.localidade || "";
            document.getElementById('estado').value = data.uf || "";
        });
});

// Valida o formulário no envio, com foco na validação do CPF
document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const cpfInput = document.getElementById('cpf');
    const cpfLimpo = cpfInput.value.replace(/[^\d]+/g, "");

    // Bloqueia o envio se o CPF for inválido e foca o campo
    if (!validarCPF(cpfLimpo)) {
        alert("CPF inválido!");
        cpfInput.focus();  // volta o foco para o campo CPF
        return; // impede o cadastro
    }

    
     // Cria objeto com os dados do formulário para salvar localmente
    const necessidade = {
        instituicao: document.getElementById('instituicao').value,
        tipo: document.getElementById('tipo').value,
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value,
        cpf: cpfInput.value,
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        cep: document.getElementById('cep').value,
        rua: document.getElementById('rua').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
    };

     // Recupera lista atual do localStorage, adiciona novo item e salva novamente
    const lista = JSON.parse(localStorage.getItem('necessidades') || "[]");
    lista.push(necessidade);
    localStorage.setItem('necessidades', JSON.stringify(lista));
    alert("Cadastrado com sucesso!!!");
    this.reset();

    // Esconde mensagem de validação do CPF após cadastro
    const messageDiv = document.getElementById("cpf-message");
    if(messageDiv) messageDiv.style.display = "none";
});

// Função que valida o CPF com cálculo dos dígitos verificadores
function validarCPF(cpf){
    cpf = cpf.replace(/[^\d]+/g,"");

    // Verifica se tem 11 dígitos ou se todos são iguais (caso inválido)
    if(cpf.length !== 11 || /^(\d)\1+$/.test(cpf)){
        return false;
    }

    let soma = 0;
    let resto; 

     // Cálculo do primeiro dígito verificador
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

      // Cálculo do segundo dígito verificador
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

    return true;// CPF válido
   

}