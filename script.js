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

  // Aseguramos que Chrome active el audio
  await audioCtx.resume();

  const oscillator = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(
    523.25,
    audioCtx.currentTime
  );

  // Empieza con volumen
  gain.gain.setValueAtTime(
    0.15,
    audioCtx.currentTime
  );

  // Se desvanece suavemente
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioCtx.currentTime + 2
  );

  oscillator.connect(gain);
  gain.connect(audioCtx.destination);

  oscillator.start();

  oscillator.stop(
    audioCtx.currentTime + 2
  );

  console.log("TIN 🎵");

});
