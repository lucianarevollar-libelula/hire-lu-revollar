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
let rainTimer;
let rainPlaying = false;

soundBtn.addEventListener("click", async () => {

  // =========================
  // ENCENDER LLUVIA
  // =========================

  if (!rainPlaying) {

    const AudioContext =
      window.AudioContext || window.webkitAudioContext;

    audioCtx = new AudioContext();
    await audioCtx.resume();

    rainPlaying = true;

    // =========================
    // CREAR UNA GOTA
    // =========================

    function createDrop() {

      if (!rainPlaying) return;

      // Creamos un fragmento MUY corto de ruido
      const duration =
        0.025 + Math.random() * 0.06;

      const buffer = audioCtx.createBuffer(
        1,
        audioCtx.sampleRate * duration,
        audioCtx.sampleRate
      );

      const data = buffer.getChannelData(0);

      for (let i = 0; i < data.length; i++) {

        // Ruido aleatorio
        const noise =
          Math.random() * 2 - 1;

        // La gota pierde fuerza rápidamente
        const envelope =
          1 - i / data.length;

        data[i] =
          noise * envelope;
      }


      const drop =
        audioCtx.createBufferSource();

      drop.buffer = buffer;


      // =========================
      // FILTRO DE LA GOTA
      // =========================

      const filter =
        audioCtx.createBiquadFilter();

      filter.type = "bandpass";

      filter.frequency.value =
        900 + Math.random() * 2200;

      filter.Q.value =
        0.7 + Math.random() * 1.5;


      // =========================
      // VOLUMEN
      // =========================

      const gain =
        audioCtx.createGain();

      gain.gain.value =
        0.015 + Math.random() * 0.035;


      // =========================
      // POSICIÓN
      // =========================

      const panner =
        audioCtx.createStereoPanner();

      panner.pan.value =
        Math.random() * 2 - 1;


      // =========================
      // CONECTAMOS
      // =========================

      drop.connect(filter);
      filter.connect(gain);
      gain.connect(panner);
      panner.connect(audioCtx.destination);

      drop.start();


      // =========================
      // PRÓXIMA GOTA
      // =========================

      const nextDrop =
        25 + Math.random() * 100;

      rainTimer =
        setTimeout(createDrop, nextDrop);
    }


    // Arranca la lluvia
    createDrop();

    soundBtn.textContent =
      "⏹ Detener lluvia";
  }


  // =========================
  // APAGAR LLUVIA
  // =========================

  else {

    rainPlaying = false;

    clearTimeout(rainTimer);

    await audioCtx.close();

    soundBtn.textContent =
      "🌧 Lluvia";
  }

});
