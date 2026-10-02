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

let audioCtx;
let rainSource;
let rainGain;

let rainPlaying = false;

soundBtn.addEventListener("click", async () => {

  // Si la lluvia está apagada → la encendemos
  if (!rainPlaying) {

    const AudioContext =
      window.AudioContext || window.webkitAudioContext;

    audioCtx = new AudioContext();

    await audioCtx.resume();

    // Creamos 3 segundos de ruido
    const duration = 3;

    const buffer = audioCtx.createBuffer(
      1,
      audioCtx.sampleRate * duration,
      audioCtx.sampleRate
    );

    const data = buffer.getChannelData(0);

    // Ruido blanco
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    rainSource = audioCtx.createBufferSource();
    rainSource.buffer = buffer;

    // ESTA es la parte que permite repetirlo
    rainSource.loop = true;

    // Filtro
    const filter = audioCtx.createBiquadFilter();

    filter.type = "lowpass";
    filter.frequency.value = 3000;

    // Volumen
    rainGain = audioCtx.createGain();

    rainGain.gain.value = 0.12;

    // Conexiones
    rainSource.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(audioCtx.destination);

    rainSource.start();

    rainPlaying = true;

    soundBtn.textContent = "⏹ Detener lluvia";

  }

  // Si ya está sonando → la detenemos
  else {

    rainSource.stop();

    await audioCtx.close();

    rainPlaying = false;

    soundBtn.textContent = "🌧 Lluvia";

  }

});
