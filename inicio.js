const carrusel = document.getElementById('carrusel');
const indicadores = document.getElementById('indicadores');
const reseñas = carrusel.querySelectorAll('.reseña');
const gap = 30;
const totalItems = reseñas.length;
let visibleItems = 3;
let totalSlides = 0;
let currentSlide = 0;
let autoScroll;

function getVisibleItems() {
  const ancho = window.innerWidth;
  if (ancho <= 500) return 1;
  if (ancho <= 900) return 2;
  return 3;
}

function actualizarLayout() {
  visibleItems = getVisibleItems();
  totalSlides = Math.ceil(totalItems / visibleItems);
  currentSlide = 0;
  crearIndicadores();
  actualizarTransform();
}

function crearIndicadores() {
  indicadores.innerHTML = '';
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('activo');
    dot.addEventListener('click', () => {
      currentSlide = i;
      actualizarTransform();
    });
    indicadores.appendChild(dot);
  }
}

function actualizarTransform() {
  const containerWidth = carrusel.offsetWidth;
  const desplazamiento = currentSlide * (containerWidth + gap);
  carrusel.style.transform = `translateX(-${desplazamiento}px)`;
  actualizarIndicadores(currentSlide);
}

function actualizarIndicadores(index) {
  const dots = indicadores.querySelectorAll('button');
  dots.forEach(dot => dot.classList.remove('activo'));
  if (dots[index]) dots[index].classList.add('activo');
}

function moverCarrusel(direccion) {
  currentSlide += direccion;
  if (currentSlide < 0) currentSlide = totalSlides - 1;
  if (currentSlide >= totalSlides) currentSlide = 0;
  actualizarTransform();
}

function iniciarAutoScroll() {
  autoScroll = setInterval(() => {
    moverCarrusel(1);
  }, 4000);
}

function detenerAutoScroll() {
  clearInterval(autoScroll);
}

carrusel.addEventListener('mouseover', detenerAutoScroll);
carrusel.addEventListener('mouseout', iniciarAutoScroll);

let startX = 0;
let isDown = false;

carrusel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDown = true;
  detenerAutoScroll();
});

carrusel.addEventListener('touchend', (e) => {
  if (!isDown) return;
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) moverCarrusel(1);
    else moverCarrusel(-1);
  }

  isDown = false;
  iniciarAutoScroll();
});

window.addEventListener('resize', actualizarLayout);
window.addEventListener('load', actualizarLayout);
iniciarAutoScroll();