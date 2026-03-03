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
   LÓGICA DEL FONDO DE PARTÍCULAS (HERO)
========================================= */
document.addEventListener("DOMContentLoaded", () => {
    const particlesContainer = document.getElementById("tsparticles");

    if (particlesContainer) {
        if (typeof tsParticles === 'undefined') {
            console.error("Mentor: Falta incluir el script de tsParticles en tu HTML.");
            return;
        }

        tsParticles.load("tsparticles", {
            fullScreen: { enable: false }, 
            particles: {
                number: { 
                    value: 60, 
                    limit: 120, // CRÍTICO: Límite máximo para evitar que el usuario crashee la web a base de clics
                    density: { enable: true, value_area: 100 } 
                },
                color: { value: "#ffffff" },
               // === AQUÍ ESTÁ EL CAMBIO A ESTRELLAS ===
                shape: { 
                    type: "star",
                    options: {
                        star: {
                            sides: 5 // Puedes cambiar este número si quieres estrellas de más puntas
                        }
                    }
                },
                // =======================================
                opacity: { value: 0.5 },
                size: { value: { min: 3, max: 4 } },
                links: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.9,
                    direction: "none",
                    random: false,
                    straight: false,
                    outModes: "out"
                }
            },
            interactivity: {
                events: {
                    onHover: { 
                        enable: true, 
                        mode: "repulse" // Efecto de repeler el mouse
                    },
                    onClick: { 
                        enable: true, 
                        mode: "push" // Efecto de crear más partículas al hacer clic
                    },
                    resize: true
                },
                modes: {
                    repulse: { 
                        distance: 100, // Área de efecto (qué tan lejos huyen del mouse)
                        duration: 0.4  // Qué tan rápido vuelven a su posición normal
                    },
                    push: { 
                        quantity: 4 // Cuántas partículas nuevas se crean por cada clic
                    }
                }
            },
            detectRetina: true
        });
    }
});