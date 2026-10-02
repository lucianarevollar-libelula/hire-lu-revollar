/*
  Funcionalidad del portfolio:
  - Controla la apertura y cierre del menú de navegación en dispositivos móviles.
  - Cierra el menú al seleccionar una sección.
  - Actualiza automáticamente el año mostrado en el footer.
*/
// Elementos necesarios para controlar el menú móvil
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');

// Abre y cierra el menú hamburguesa en pantallas pequeñas
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Cierra el menú después de seleccionar una sección
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Actualiza automáticamente el año del footer
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}
// Botón para cambiar entre modo claro y oscuro
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
const soundBtn = document.getElementById("soundBtn");

soundBtn.addEventListener("click", () => {

  // Creamos el "motor" de audio
  const audioCtx = new AudioContext();

  // Creamos un oscilador: esto GENERA el sonido
  const oscillator = audioCtx.createOscillator();

  // Controlamos el volumen
  const volume = audioCtx.createGain();

  // Tipo de onda
  oscillator.type = "sine";

  // 440 Hz = nota LA
  oscillator.frequency.value = 440;

  // Volumen bajo
  volume.gain.value = 0.08;

  // Oscilador → volumen → parlantes
  oscillator.connect(volume);
  volume.connect(audioCtx.destination);

  // Empezar AHORA
  oscillator.start();

  // Detener después de 1 segundo
  oscillator.stop(audioCtx.currentTime + 1);

});
