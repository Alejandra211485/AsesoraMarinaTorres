// Mostrar/ocultar el menú principal en móviles
function toggleMenu() {
  const menuLista = document.getElementById('menu_lista');
  menuLista.classList.toggle('show');
}

// Scroll suave al hacer clic en enlaces internos
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Ajuste por header fijo
        behavior: 'smooth'
      });
    }

    // Cierra el menú en móvil después de hacer clic
    const menuLista = document.getElementById('menu_lista');
    if (menuLista.classList.contains('show')) {
      menuLista.classList.remove('show');
    }
  });
});

// Submenús desplegables en móviles por clic
//document.querySelectorAll('.menu_item > a').forEach(link => {
 // link.addEventListener('click', function (e) {
 //   const submenu = this.nextElementSibling;
 //   if (submenu && submenu.classList.contains('submenu') && window.innerWidth <= 768) {
 //     e.preventDefault(); // Evita que haga scroll al href
 //     submenu.classList.toggle('visible');
 //   }
 // });
//});

let lastScrollY = window.scrollY;
  const arriba = document.getElementById('arriba');
  const encabezado = document.getElementById('encabezado');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30 && window.scrollY > lastScrollY) {
      // Scroll hacia abajo: ocultar #arriba, subir encabezado
      arriba.classList.add('oculto');
      encabezado.style.top = '0';
    } else {
      // Scroll hacia arriba: mostrar #arriba, bajar encabezado
      arriba.classList.remove('oculto');
      encabezado.style.top = '50px'; // mismo alto que #arriba
    }
    lastScrollY = window.scrollY;
  });

// Submenús desplegables en móviles por clic sin cerrar todo el menú
document.querySelectorAll('.menu_item > a').forEach(link => {
  link.addEventListener('click', function (e) {
    const submenu = this.nextElementSibling;

    if (submenu && submenu.classList.contains('submenu') && window.innerWidth <= 768) {
      e.preventDefault(); // Previene navegación
      submenu.classList.toggle('visible');

      // Opcional: cerrar otros submenús abiertos
      document.querySelectorAll('.submenu.visible').forEach(other => {
        if (other !== submenu) {
          other.classList.remove('visible');
        }
      });
    }
  });
});

document.querySelectorAll('.ver-mas-btn').forEach(button => {
  button.addEventListener('click', function () {
    const parent = this.closest('.texto-contenido');
    const textoOculto = parent.querySelector('.texto-oculto');

    if (textoOculto.style.display === 'inline') {
      textoOculto.style.display = 'none';
      this.textContent = 'Ver más';
    } else {
      textoOculto.style.display = 'inline';
      this.textContent = 'Ver menos';
    }
  });
});

