// Maneja la navegación entre secciones
document.querySelectorAll('.nav-btn').forEach(button => {
  button.addEventListener('click', () => {
    // Quitar clase active de todos los botones
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    // Poner active al botón clickeado
    button.classList.add('active');

    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    // Mostrar la sección correspondiente
    const sectionId = button.getAttribute('data-section');
    document.getElementById(sectionId).classList.add('active');
  });
});
