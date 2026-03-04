/* =========================================
   LÓGICA DEL MENÚ MÓVIL
========================================= */
document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');

    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    } else {
        console.warn("Falta el id='menuIcon' o id='navLinks' en el HTML.");
    }
});

/* =========================================
   DICCIONARIO DE IMÁGENES
========================================= */
const imagenesPorProyecto = {
    'proyecto1': [
        'img/proyecto1/veterinaria1.png', 'img/proyecto1/veterinaria2.png', 'img/proyecto1/veterinaria3.png', 'img/proyecto1/veterinaria4.png', 'img/proyecto1/veterinaria5.png'
    ],
    'proyecto2': [
        'img/proyecto2/blog1.jpeg', 'img/proyecto2/blog2.jpeg', 'img/proyecto2/blog3.jpeg', 'img/proyecto2/blog4.jpeg', 'img/proyecto2/blog5.jpeg'
    ],
    'proyecto3': [
        'img/proyecto3/biblioteca1.png', 'img/proyecto3/biblioteca2.png', 'img/proyecto3/biblioteca3.png'
    ],
    'proyecto4': [
        'img/proyecto4/roles1.jpeg', 'img/proyecto4/roles2.jpeg', 'img/proyecto4/roles3.jpeg', 'img/proyecto4/roles4.jpeg'
    ],
    'proyecto5': [
        'img/proyecto5/peluqueria1.jpeg', 'img/proyecto5/peluqueria2.jpeg', 'img/proyecto5/peluqueria3.jpeg', 'img/proyecto5/peluqueria4.jpeg', 'img/proyecto5/peluqueria5.jpeg'
    ],
    'proyecto6': [
        'img/proyecto6/conse1.jpeg', 'img/proyecto6/conse2.jpeg', 'img/proyecto6/conse3.jpeg', 'img/proyecto6/conse4.jpeg', 'img/proyecto6/conse5.jpeg'
    ],
    'proyecto7': [
        'img/proyecto7/cac1.PNG', 'img/proyecto7/cac2.PNG', 'img/proyecto7/cac3.PNG'
    ],
    'proyecto8': [
        'img/proyecto8/captura1.png', 'img/proyecto8/captura2.png', 'img/proyecto8/captura3.png', 'img/proyecto8/captura4.png', 'img/proyecto8/captura5.png', 'img/proyecto8/captura6.png', 'img/proyecto8/captura7.png', 'img/proyecto8/captura8.png', 'img/proyecto8/captura9.png'
    ],
};

/* =========================================
   LÓGICA DEL MODAL (VISOR A PANTALLA COMPLETA)
========================================= */
let imagenesActuales = [];
let indiceActual = 0;

function abrirGaleria(proyecto) {
    imagenesActuales = imagenesPorProyecto[proyecto];
    indiceActual = 0;
    
    if(!imagenesActuales || imagenesActuales.length === 0) return;
    
    document.getElementById('imagenModal').src = imagenesActuales[indiceActual];
    document.getElementById('galeriaModal').style.display = "block";
    document.body.style.overflow = "hidden";
}

function cerrarGaleria() {
    document.getElementById('galeriaModal').style.display = "none";
    document.body.style.overflow = "auto";
}

function cambiarImagen(direccion) {
    indiceActual += direccion;
    
    if (indiceActual >= imagenesActuales.length) {
        indiceActual = 0;
    }
    if (indiceActual < 0) {
        indiceActual = imagenesActuales.length - 1;
    }
    
    document.getElementById('imagenModal').src = imagenesActuales[indiceActual];
}

window.onclick = function(event) {
    let modal = document.getElementById('galeriaModal');
    if (event.target == modal) {
        cerrarGaleria();
    }
}

/* =========================================
   LÓGICA DEL CARRUSEL AUTOMÁTICO (PREVIEW)
========================================= */
document.addEventListener("DOMContentLoaded", () => {
    let delay = 0; 
    
    for (const proyecto in imagenesPorProyecto) {
        const placeholder = document.querySelector(`[onclick="abrirGaleria('${proyecto}')"]`);
        const imgElement = document.getElementById(`preview-${proyecto}`);
        
        if (placeholder && imgElement) {
            let index = 0;
            const imagenes = imagenesPorProyecto[proyecto];
            
            if (imagenes.length > 1) {
                const dotsContainer = document.createElement('div');
                dotsContainer.className = 'carousel-dots';
                
                imagenes.forEach((_, i) => {
                    const dot = document.createElement('div');
                    dot.className = `dot ${i === 0 ? 'active' : ''}`;
                    dotsContainer.appendChild(dot);
                });
                
                placeholder.appendChild(dotsContainer);
                const dots = dotsContainer.querySelectorAll('.dot');
                
                setTimeout(() => {
                    setInterval(() => {
                        dots[index].classList.remove('active');
                        index = (index + 1) % imagenes.length;
                        imgElement.src = imagenes[index];
                        dots[index].classList.add('active');
                    }, 3500); 
                }, delay);
                
                delay += 400; 
            }
        }
    }
});

/* =========================================
   LÓGICA DEL FORMULARIO DE CONTACTO
========================================= */
function mostrarNotificacion(mensaje, esError = false) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    if (esError) toast.classList.add('error');
    
    const icono = esError ? "<i class='bx bx-error-circle'></i>" : "<i class='bx bx-check-circle'></i>";
    toast.innerHTML = `${icono} ${mensaje}`;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500); 
    }, 4500);
}

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById('contactForm');

    if(contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); 
            
            const btnSubmit = this.querySelector('button[type="submit"]');
            const originalText = btnSubmit.innerHTML;
            
            btnSubmit.innerHTML = 'Enviando... <i class="bx bx-loader bx-spin"></i>';
            btnSubmit.style.opacity = '0.7';
            btnSubmit.disabled = true;

            try {
                const formData = new FormData(this);
                const response = await fetch(this.action, {
                    method: this.method,
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    mostrarNotificacion("¡Mensaje enviado con éxito! Te responderé pronto.");
                    this.reset(); 
                } else {
                    mostrarNotificacion("Hubo un problema al enviar el mensaje.", true);
                }
            } catch (error) {
                mostrarNotificacion("Error de conexión. Revisa tu internet.", true);
            }

            btnSubmit.innerHTML = originalText;
            btnSubmit.style.opacity = '1';
            btnSubmit.disabled = false;
        });
    }
});

/* =========================================
   LÓGICA DEL FONDO DE PARTÍCULAS (CANVAS OPTIMIZADO)
========================================= */
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector('.particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let mouse = {
        x: null,
        y: null,
        radius: 100
    };

    // 1. DEFINIR LA CLASE PRIMERO (Las clases no tienen hoisting)
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            this.baseX += this.directionX;
            this.baseY += this.directionY;

            // Evitar que escapen de la pantalla
            if (this.baseX > canvas.width || this.baseX < 0) this.directionX = -this.directionX;
            if (this.baseY > canvas.height || this.baseY < 0) this.directionY = -this.directionY;

            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = mouse.radius;
                const force = (maxDistance - distance) / maxDistance;
                const directionX = forceDirectionX * force * this.density;
                const directionY = forceDirectionY * force * this.density;

                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 10;
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 10;
                }
            }
            this.draw();
        }
    }

    // 2. DEFINIR FUNCIONES QUE USAN LA CLASE
    function init() {
        particlesArray = [];
        const isMobile = window.innerWidth < 768;
        const numberOfParticles = isMobile ? 60 : 200; 

        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.5) - 0.25;
            let directionY = (Math.random() * 0.5) - 0.25;
            let color = 'rgba(88, 166, 255, 0.5)';

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init(); 
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
    }

    // 3. EJECUTAR TODO (Ahora que el motor ya conoce las definiciones)
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener('mouseout', function() {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    animate();
});