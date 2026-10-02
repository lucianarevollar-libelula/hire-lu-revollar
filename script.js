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

  function playNote(frequency, startTime, duration) {

    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    const start = audioCtx.currentTime + startTime;
    const end = start + duration;

    // nace en silencio
    gain.gain.setValueAtTime(0.0001, start);

    // aparece suavemente
    gain.gain.exponentialRampToValueAtTime(
      0.08,
      start + 0.15
    );

    // desaparece
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      end
    );

    oscillator.connect(gain);
    gain.connect(audioCtx.destination);

    oscillator.start(start);
    oscillator.stop(end);
  }

  // Mini secuencia
  playNote(261.63, 0.0, 1.2);  // Do
  playNote(329.63, 0.6, 1.2);  // Mi
  playNote(392.00, 1.2, 1.4);  // Sol
  playNote(329.63, 2.0, 1.4);  // Mi
  playNote(293.66, 2.8, 1.6);  // Re
  playNote(261.63, 3.6, 2.0);  // Do

});
