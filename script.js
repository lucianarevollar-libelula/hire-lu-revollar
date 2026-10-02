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
let dropTimer;

let rainPlaying = false;

soundBtn.addEventListener("click", async () => {

  if (!rainPlaying) {

    // =========================
    // 1. ENCENDEMOS LA LLUVIA
    // =========================

    const AudioContext =
      window.AudioContext || window.webkitAudioContext;

    audioCtx = new AudioContext();

    await audioCtx.resume();

    // -------------------------
    // LLUVIA DE FONDO
    // -------------------------

    const duration = 3;

    const buffer = audioCtx.createBuffer(
      1,
      audioCtx.sampleRate * duration,
      audioCtx.sampleRate
    );

    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    rainSource = audioCtx.createBufferSource();
    rainSource.buffer = buffer;
    rainSource.loop = true;

    const rainFilter = audioCtx.createBiquadFilter();

    rainFilter.type = "lowpass";
    rainFilter.frequency.value = 1800;

    rainGain = audioCtx.createGain();

    // Bajamos bastante la estática
    rainGain.gain.value = 0.035;

    rainSource.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(audioCtx.destination);

    rainSource.start();


    // =========================
    // 2. CREAMOS UNA GOTA
    // =========================

    function createDrop() {

      if (!rainPlaying) return;

      const oscillator = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      // Cada gota tendrá una frecuencia diferente
      const frequency =
        500 + Math.random() * 1800;

      oscillator.type = "sine";
      oscillator.frequency.value = frequency;

      const now = audioCtx.currentTime;

      // Empieza rápidamente
      gain.gain.setValueAtTime(
        0.0001,
        now
      );

      gain.gain.exponentialRampToValueAtTime(
        0.025,
        now + 0.005
      );

      // Y desaparece rápidamente
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + 0.12
      );

      oscillator.connect(gain);
      gain.connect(audioCtx.destination);

      oscillator.start(now);
      oscillator.stop(now + 0.13);


      // =========================
      // 3. DECIDIMOS CUÁNDO
      //    CAE LA PRÓXIMA GOTA
      // =========================

      const nextDrop =
        80 + Math.random() * 350;

      dropTimer = setTimeout(
        createDrop,
        nextDrop
      );
    }


    rainPlaying = true;

    createDrop();

    soundBtn.textContent =
      "⏹ Detener lluvia";

  } else {

    // =========================
    // 4. APAGAMOS TODO
    // =========================

    rainPlaying = false;

    clearTimeout(dropTimer);

    rainSource.stop();

    await audioCtx.close();

    soundBtn.textContent =
      "🌧 Lluvia";
  }

});
