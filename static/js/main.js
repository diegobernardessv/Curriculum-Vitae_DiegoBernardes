/**
 * main.js - Scripts principais do Portfólio Diego Bernardes Silva
 * Versao: 1.2.0
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
// 5. ANIMACOES AO SCROLL
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
// 6. FORMULARIO DE CONTATO
// ============================

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const fields = {
        name: document.getElementById('contact-name'),
        email: document.getElementById('contact-email'),
        subject: document.getElementById('contact-subject'),
        message: document.getElementById('contact-message')
    };

    const result = document.getElementById('contact-result');

    const validateField = (field, validator) => {
        const wrapper = field.closest('.form-field');
        if (!wrapper) return true;
        const isValid = validator(field.value);
        wrapper.classList.toggle('has-error', !isValid);
        return isValid;
    };

    const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nameOk = validateField(fields.name, (value) => value.trim().length > 1);
        const emailOk = validateField(fields.email, isEmail);
        const subjectOk = validateField(fields.subject, (value) => value.trim().length > 2);
        const messageOk = validateField(fields.message, (value) => value.trim().length > 5);

        if (!nameOk || !emailOk || !subjectOk || !messageOk) {
            if (result) {
                result.textContent = 'Por favor, revise os campos destacados.';
                result.classList.add('is-error');
            }
            return;
        }

        const subject = encodeURIComponent(fields.subject.value.trim());
        const body = encodeURIComponent(
            `Nome: ${fields.name.value.trim()}\n` +
            `Email: ${fields.email.value.trim()}\n\n` +
            `${fields.message.value.trim()}`
        );

        if (result) {
            result.textContent = 'Abrindo seu cliente de email...';
            result.classList.remove('is-error');
        }

        window.location.href = `mailto:diegobernardessv@gmail.com?subject=${subject}&body=${body}`;
        form.reset();
    });
}

// ============================
// 7. INICIALIZACAO
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

    // Inicializa formulario de contato
    initContactForm();

    console.log('🚀 Portfólio Diego Bernardes - Scripts carregados!');
});
