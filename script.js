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

  const AudioContext =
    window.AudioContext || window.webkitAudioContext;

  const audioCtx = new AudioContext();

  // Generador de la onda
  const oscillator = audioCtx.createOscillator();

  // Control de amplitud
  const gain = audioCtx.createGain();

  oscillator.type = "sine";

  // Do4 = 261.63 Hz
  oscillator.frequency.value = 261.63;

  // Empieza prácticamente en silencio
  gain.gain.setValueAtTime(
    0.0001,
    audioCtx.currentTime
  );

  // FADE IN exponencial
  gain.gain.exponentialRampToValueAtTime(
    0.15,
    audioCtx.currentTime + 0.8
  );

  // FADE OUT exponencial
  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    audioCtx.currentTime + 3
  );

  oscillator.connect(gain);
  gain.connect(audioCtx.destination);

  oscillator.start();

  oscillator.stop(
    audioCtx.currentTime + 3
  );

});
