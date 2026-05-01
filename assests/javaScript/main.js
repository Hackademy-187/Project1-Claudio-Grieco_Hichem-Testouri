// NAVBAR SCROLL EFFECT
let nav = document.querySelector('.containerNav');
let scrollPos = 0;
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('nav-scrolled');
  } else {
    nav.classList.remove('nav-scrolled');
  }
});

