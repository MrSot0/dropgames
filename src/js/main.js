// ==========================================================================
// DropGames — interactividad del sitio
// Incluye: menú móvil, buscador, submenús, volver arriba, dark mode, carrusel
// ==========================================================================

const inicializarDropGames = () => {
    // -----------------------------------------------------------------------
    // MENÚ MÓVIL
    // -----------------------------------------------------------------------
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const abierto = navLinks.classList.toggle('abierto');
            menuToggle.setAttribute('aria-expanded', abierto);
        });
    }

    // -----------------------------------------------------------------------
    // BOTÓN VOLVER ARRIBA
    // -----------------------------------------------------------------------
    const btnTop = document.getElementById('btn-top');
    if (btnTop) {
        window.addEventListener('scroll', () => {
            btnTop.classList.toggle('visible', window.scrollY > 400);
        });
        btnTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // -----------------------------------------------------------------------
    // BARRA DE BÚSQUEDA DESPLEGABLE
    // -----------------------------------------------------------------------
    const btnBuscar = document.getElementById('btn-buscar');
    const barraBusqueda = document.getElementById('barra-busqueda');
    if (btnBuscar && barraBusqueda) {
        btnBuscar.addEventListener('click', (e) => {
            e.stopPropagation();
            const abierta = barraBusqueda.classList.toggle('abierta');
            btnBuscar.setAttribute('aria-expanded', abierta);
            if (abierta) barraBusqueda.querySelector('.barra-busqueda-input').focus();
        });
    }

    // -----------------------------------------------------------------------
    // SUBMENÚS DESPLEGABLES
    // -----------------------------------------------------------------------
    const dropdowns = document.querySelectorAll('.nav-item-dropdown');
    dropdowns.forEach((item) => {
        const toggle = item.querySelector('.submenu-toggle');
        if (!toggle) return;
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const abierto = item.classList.toggle('abierto');
            toggle.setAttribute('aria-expanded', abierto);
            dropdowns.forEach((otro) => {
                if (otro !== item) {
                    otro.classList.remove('abierto');
                    const t = otro.querySelector('.submenu-toggle');
                    if (t) t.setAttribute('aria-expanded', 'false');
                }
            });
        });
    });

    // Cierra buscador y submenús al hacer clic fuera
    document.addEventListener('click', () => {
        if (barraBusqueda) {
            barraBusqueda.classList.remove('abierta');
            if (btnBuscar) btnBuscar.setAttribute('aria-expanded', 'false');
        }
        dropdowns.forEach((item) => {
            item.classList.remove('abierto');
            const t = item.querySelector('.submenu-toggle');
            if (t) t.setAttribute('aria-expanded', 'false');
        });
    });

    // -----------------------------------------------------------------------
    // DARK / LIGHT MODE TOGGLE
    // -----------------------------------------------------------------------
    const btnTema = document.getElementById('btn-tema');
    if (btnTema) {
        btnTema.addEventListener('click', () => {
            const actual = document.documentElement.getAttribute('data-tema') || 'claro';
            const nuevo = actual === 'claro' ? 'oscuro' : 'claro';
            document.documentElement.setAttribute('data-tema', nuevo);
            try { localStorage.setItem('dropgames-tema', nuevo); } catch (e) {}
        });
    }

    // -----------------------------------------------------------------------
    // CARRUSEL DE IMÁGENES
    // -----------------------------------------------------------------------
    const carrusel = document.getElementById('carrusel-principal');
    if (carrusel) {
        const pista = carrusel.querySelector('.carrusel-pista');
        const slides = carrusel.querySelectorAll('.carrusel-slide');
        const btnPrev = carrusel.querySelector('.carrusel-btn--prev');
        const btnNext = carrusel.querySelector('.carrusel-btn--next');
        const contenedorDots = carrusel.querySelector('.carrusel-dots');
        const total = slides.length;
        let actual = 0;
        let intervalo = null;

        if (total <= 1) {
            if (btnPrev) btnPrev.style.display = 'none';
            if (btnNext) btnNext.style.display = 'none';
            if (contenedorDots) contenedorDots.style.display = 'none';
        } else {
            const dots = [];
            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.classList.add('carrusel-dot');
                dot.setAttribute('aria-label', `Imagen ${i + 1}`);
                if (i === 0) dot.classList.add('activo');
                dot.addEventListener('click', () => irA(i));
                if (contenedorDots) contenedorDots.appendChild(dot);
                dots.push(dot);
            });

            function actualizarDots() {
                dots.forEach((d, i) => d.classList.toggle('activo', i === actual));
            }

            function irA(indice) {
                actual = (indice + total) % total;
                if (pista) pista.style.transform = `translateX(-${actual * 100}%)`;
                actualizarDots();
                reiniciarIntervalo();
            }

            function siguiente() { irA(actual + 1); }
            function anterior() { irA(actual - 1); }

            function reiniciarIntervalo() {
                clearInterval(intervalo);
                intervalo = setInterval(siguiente, 5000);
            }

            if (btnPrev) btnPrev.addEventListener('click', anterior);
            if (btnNext) btnNext.addEventListener('click', siguiente);

            reiniciarIntervalo();
            carrusel.addEventListener('mouseenter', () => clearInterval(intervalo));
            carrusel.addEventListener('mouseleave', reiniciarIntervalo);

            let touchStartX = 0;
            pista.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            pista.addEventListener('touchend', (e) => {
                const diff = touchStartX - e.changedTouches[0].screenX;
                if (Math.abs(diff) > 50) {
                    diff > 0 ? siguiente() : anterior();
                }
            }, { passive: true });
        }
    }

    // -----------------------------------------------------------------------
    // BOTÓN "DESCARGAR" PRINCIPAL
    // -----------------------------------------------------------------------
    const btnDescargarPrincipal = document.getElementById('btn-descargar-principal');
    if (btnDescargarPrincipal) {
        btnDescargarPrincipal.addEventListener('click', (e) => {
            e.preventDefault();
            const destino = document.getElementById('bloque-descargas');
            if (destino) {
                destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
};

// Ejecutar al cargar la página o al navegar entre rutas en Astro
document.addEventListener('DOMContentLoaded', inicializarDropGames);
document.addEventListener('astro:page-load', inicializarDropGames);

document.addEventListener('astro:page-load', () => {
    const grid = document.getElementById('grid-videojuegos');
    const dataElement = document.getElementById('juegos-data');
    if (!grid || !dataElement) return;

    const juegos = JSON.parse(dataElement.textContent);
    const totalPaginas = Math.ceil(juegos.length / 9);
    let paginaActual = 1;

    function renderizarPagina(n) {
        paginaActual = n;
        const inicio = (n - 1) * 9;
        const fin = inicio + 9;
        const juegosPagina = juegos.slice(inicio, fin);

        // Limpiar y renderizar tarjetas
        grid.innerHTML = '';
        juegosPagina.forEach(j => {
            const card = document.createElement('div');
            card.innerHTML = `<!-- Estructura de tu GameCard -->`;
            grid.appendChild(card.firstElementChild);
        });

        // Actualizar estados de botones y números
        actualizarUI();
    }

    function actualizarUI() {
        const listaNumeros = document.getElementById('lista-numeros');
        listaNumeros.innerHTML = '';
        
        for (let i = 1; i <= totalPaginas; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.className = `page-number ${i === paginaActual ? 'active' : ''}`;
            btn.onclick = () => renderizarPagina(i);
            listaNumeros.appendChild(btn);
        }
    }

    document.getElementById('btn-prev').onclick = () => { if (paginaActual > 1) renderizarPagina(paginaActual - 1); };
    document.getElementById('btn-next').onclick = () => { if (paginaActual < totalPaginas) renderizarPagina(paginaActual + 1); };

    renderizarPagina(1);
});