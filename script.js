// MENU RESPONSIVO PARA MOBILE
// Selecionar elementos do DOM
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Event listener para abrir/fechar menu mobile
menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
});

// Fechar menu automaticamente ao clicar em um link 
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
    });
});

// ALTERNÂNCIA DE TEMA CLARO/ESCURO
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Verificar se existe um tema salvo no localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
}

// Alternar entre temas
themeToggle.addEventListener('click', function() {
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        // Mudar para tema claro
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        // Mudar para tema escuro
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// VALIDAÇÃO DO FORMULÁRIO DE CONTATO

const contactForm = document.getElementById('contactForm');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModal');

/**
 * Função para validar formato de e-mail
 * @param {string} email - E-mail a ser validado
 * @returns {boolean} - Retorna true se o e-mail for válido
 */
function validarEmail(email) {
    // Expressão regular para validar e-mail
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Função para exibir mensagem de erro
 * @param {string} inputId - ID do campo de input
 * @param {string} errorId - ID do elemento de erro
 * @param {string} mensagem - Mensagem de erro a ser exibida
 */
function mostrarErro(inputId, errorId, mensagem) {
    const errorElement = document.getElementById(errorId);
    const inputElement = document.getElementById(inputId);
    errorElement.textContent = mensagem;
    errorElement.style.display = 'block';
    inputElement.style.borderColor = '#d32f2f';
}

/**
 * Função para limpar mensagem de erro
 * @param {string} inputId - ID do campo de input
 * @param {string} errorId - ID do elemento de erro
 */
function limparErro(inputId, errorId) {
    const errorElement = document.getElementById(errorId);
    const inputElement = document.getElementById(inputId);
    errorElement.style.display = 'none';
    inputElement.style.borderColor = '';
}

// Event listener para o submit do formulário
contactForm.addEventListener('submit', function(e) {
    // Prevenir o envio real do formulário
    e.preventDefault();
    
    // Limpar todos os erros anteriores
    limparErro('nome', 'nomeError');
    limparErro('email', 'emailError');
    limparErro('mensagem', 'mensagemError');

    // Obter valores dos campos e remover espaços em branco nas extremidades
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    let temErro = false;

    // Validar campo nome
    if (nome === '') {
        mostrarErro('nome', 'nomeError', 'Por favor, preencha seu nome');
        temErro = true;
    }

    // Validar campo e-mail
    if (email === '') {
        mostrarErro('email', 'emailError', 'Por favor, preencha seu e-mail');
        temErro = true;
    } else if (!validarEmail(email)) {
        mostrarErro('email', 'emailError', 'Por favor, insira um e-mail válido (exemplo: usuario@dominio.com)');
        temErro = true;
    }

    // Validar campo mensagem
    if (mensagem === '') {
        mostrarErro('mensagem', 'mensagemError', 'Por favor, escreva uma mensagem');
        temErro = true;
    }

    // Se não houver erros, simular o envio
    if (!temErro) {
        // Limpar todos os campos do formulário
        contactForm.reset();
        
        // Exibir modal de confirmação
        modal.style.display = 'flex';
        
        console.log('Formulário enviado com sucesso!');
        console.log('Nome:', nome);
        console.log('E-mail:', email);
        console.log('Mensagem:', mensagem);
    }
});

// Fecha o modal ao clicar no botão
closeModalBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Fecha o modal ao clicar fora dele
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// NAVEGAÇÃO SUAVE 
// Adicionar navegação suave para todos os links de âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Obter o elemento de destino
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Rolar suavemente até o elemento
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// MODAL DE IMAGEM 
/**
 * Função para abrir imagem em modal 
 * @param {string} imagemSrc - Caminho da imagem
 * @param {string} titulo - Título/descrição da imagem
 */
function abrirImagem(imagemSrc, titulo) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('imageCaption');
    
    // Exibir o modal
    modal.classList.add('active');
    
    // Definir a imagem e o título
    modalImg.src = imagemSrc;
    caption.textContent = titulo;
    
    // Prevenir scroll do body quando modal está aberto
    document.body.style.overflow = 'hidden';
}

/**
 * Função para fechar o modal de imagem
 */
function fecharImagem() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    
    // Restaurar scroll do body
    document.body.style.overflow = 'auto';
}

// Fechar modal ao clicar fora da imagem
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            // Fechar apenas se clicar no fundo do modal 
            if (e.target === modal) {
                fecharImagem();
            }
        });
    }
});

// Fechar modal ao pressionar tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        fecharImagem();
    }
});