/**
 * main.js - Scripts principais do Portfólio Diego Bernardes Silva
 * Versão: 1.1.0
 */

// ============================
// 1. EFEITO TYPEWRITER
// ============================

class TypeWriter {
    /**
     * Cria uma instância do TypeWriter
     * @param {HTMLElement} element - Elemento onde o texto será escrito
     * @param {string[]} words - Array de palavras para digitar
     * @param {number} typeSpeed - Velocidade de digitação (ms)
     * @param {number} deleteSpeed - Velocidade de deleção (ms)
     * @param {number} waitTime - Tempo de espera após digitar (ms)
     */
    constructor(element, words, typeSpeed = 100, deleteSpeed = 50, waitTime = 2000) {
        this.element = element;
        this.words = words;
        this.typeSpeed = typeSpeed;
        this.deleteSpeed = deleteSpeed;
        this.waitTime = waitTime;
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        if (this.element) {
            this.type();
        }
    }

    type() {
        const currentWord = this.words[this.wordIndex];

        if (this.isDeleting) {
            // Deletando caracteres
            this.element.textContent = currentWord.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            // Digitando caracteres
            this.element.textContent = currentWord.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        // Velocidade variável para parecer mais natural
        let speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        // Lógica de transição
        if (!this.isDeleting && this.charIndex === currentWord.length) {
            // Palavra completa - aguardar e depois deletar
            speed = this.waitTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            // Palavra deletada - próxima palavra
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            speed = 500; // Pequena pausa antes de começar nova palavra
        }

        setTimeout(() => this.type(), speed);
    }
}

// ============================
// 2. NAVBAR SCROLL EFFECT
// ============================

function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================
// 3. SMOOTH SCROLL
// ============================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================
// 4. ACTIVE NAV LINK
// ============================

function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        // Remove classe active de todos
        link.classList.remove('active');
        
        // Obtém o href do link
        const linkPath = link.getAttribute('href');
        
        // Verifica se o link corresponde à página atual
        if (linkPath === currentPath || 
            (currentPath === '/' && linkPath.includes('home')) ||
            (currentPath.includes('home') && linkPath.includes('home')) ||
            (currentPath.includes('resume') && linkPath.includes('resume')) ||
            (currentPath.includes('projects') && linkPath.includes('projects')) ||
            (currentPath.includes('contact') && linkPath.includes('contact'))) {
            link.classList.add('active');
        }
        
        // Caso especial para a página inicial
        if ((currentPath === '/' || currentPath === '/home.html') && 
            (linkPath === '/' || linkPath.includes('home'))) {
            link.classList.add('active');
        }
    });
}

// ============================
// 5. ANIMAÇÕES AO SCROLL
// ============================

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: parar de observar após animação
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos com classe de animação
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
}

// ============================
// 6. INICIALIZAÇÃO
// ============================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa TypeWriter na página Home
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const titles = [
            'Software Engineer',
            'Desenvolvedor FullStack',
            'Analista de Sistemas',
            'Especialista em Python',
            'Entusiasta de Power BI'
        ];
        new TypeWriter(typewriterElement, titles, 100, 50, 2000);
    }

    // Inicializa efeito de scroll na navbar
    initNavbarScrollEffect();

    // Inicializa smooth scroll
    initSmoothScroll();

    // Define link ativo na navbar
    setActiveNavLink();

    // Inicializa animações ao scroll
    initScrollAnimations();

    console.log('🚀 Portfólio Diego Bernardes - Scripts carregados!');
});
