// ===== Tema claro/escuro =====
// Função que alterna o tema e atualiza o texto do botão no DOM
function alternarTema() {
  const html = document.documentElement;
  const botao = document.getElementById("botao-tema");
  const escuro = html.getAttribute("data-tema") === "escuro";

  if (escuro) {
    html.removeAttribute("data-tema");
    botao.textContent = "Modo escuro";
    botao.setAttribute("aria-pressed", "false");
  } else {
    html.setAttribute("data-tema", "escuro");
    botao.textContent = "Modo claro";
    botao.setAttribute("aria-pressed", "true");
  }
}

// ===== Filtro de projetos (página Projetos) =====
function filtrarProjetos(categoria) {
  const itens = document.querySelectorAll("#lista-projetos li");
  itens.forEach((item) => {
    const mostrar = categoria === "todos" || item.dataset.categoria === categoria;
    item.hidden = !mostrar;
  });

  document.querySelectorAll(".filtros button").forEach((botao) => {
    botao.setAttribute("aria-pressed", String(botao.dataset.filtro === categoria));
  });
}

// ===== Validação do formulário (página Contato) =====
function validarFormulario(evento) {
  evento.preventDefault();

  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const mensagem = document.getElementById("mensagem");
  const erro = document.getElementById("erro");
  const sucesso = document.getElementById("sucesso");

  erro.textContent = "";
  sucesso.textContent = "";

  if (nome.value.trim().length < 3) {
    erro.textContent = "Digite um nome com pelo menos 3 letras.";
    nome.focus();
    return;
  }

  if (!email.checkValidity()) {
    erro.textContent = "Digite um e-mail válido, como nome@exemplo.com.";
    email.focus();
    return;
  }

  if (mensagem.value.trim().length < 10) {
    erro.textContent = "A mensagem precisa ter pelo menos 10 caracteres.";
    mensagem.focus();
    return;
  }

  sucesso.textContent = "Mensagem pronta. Obrigado, " + nome.value.trim() + "!";
  evento.target.reset();
}

// ===== Inicialização: liga os eventos quando a página carrega =====
document.addEventListener("DOMContentLoaded", () => {
  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

  const botaoTema = document.getElementById("botao-tema");
  if (botaoTema) botaoTema.addEventListener("click", alternarTema);

  document.querySelectorAll(".filtros button").forEach((botao) => {
    botao.addEventListener("click", () => filtrarProjetos(botao.dataset.filtro));
  });

  const formulario = document.getElementById("formulario-contato");
  if (formulario) formulario.addEventListener("submit", validarFormulario);
});
