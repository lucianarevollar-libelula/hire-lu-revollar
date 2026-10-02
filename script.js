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

soundBtn.addEventListener("click", async () => {

  const AudioContext =
    window.AudioContext || window.webkitAudioContext;

  const audioCtx = new AudioContext();

  await audioCtx.resume();

  function playNote(frequency, startTime) {

    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    oscillator.type = "triangle";

    const start = audioCtx.currentTime + startTime;

    oscillator.frequency.setValueAtTime(
      frequency,
      start
    );

    gain.gain.setValueAtTime(
      0.12,
      start
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      start + 1.5
    );

    oscillator.connect(gain);
    gain.connect(audioCtx.destination);

    oscillator.start(start);
    oscillator.stop(start + 1.5);
  }

  // Nuestra primera mini melodía 🎹

  playNote(261.63, 0);     // Do
  playNote(329.63, 0.6);   // Mi
  playNote(392.00, 1.2);   // Sol
  playNote(493.88, 1.8);   // Si

  playNote(392.00, 2.6);   // Sol
  playNote(329.63, 3.2);   // Mi
  playNote(293.66, 3.8);   // Re
  playNote(261.63, 4.4);   // Do

});
