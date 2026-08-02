/* =========================================================
   slider.js — hero carousel (autoplay, dots, swipe, keyboard)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.getElementById("slides");
  const slideItems = Array.from(document.querySelectorAll(".slide"));
  const dotsContainer = document.getElementById("heroDots");

  if (!slides || slideItems.length === 0) return;

  let current = 0;
  let timer = null;

  // Build the dots from the slide count so markup stays in sync.
  if (dotsContainer) {
    dotsContainer.innerHTML = slideItems
      .map(
        (_, index) =>
          `<button class="dot" type="button" role="tab" aria-label="Go to slide ${index + 1}"></button>`
      )
      .join("");
  }
  const dots = dotsContainer ? dotsContainer.querySelectorAll(".dot") : [];

  function showSlide(index) {
    current = (index + slideItems.length) % slideItems.length;
    slides.style.transform = `translate3d(-${current * 100}%, 0, 0)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
      dot.setAttribute("aria-selected", String(i === current));
    });
  }

  const nextSlide = () => showSlide(current + 1);
  const prevSlide = () => showSlide(current - 1);

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(nextSlide, 4000);
  }
  function stopAutoplay() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      startAutoplay();
    });
  });

  // Touch swipe support.
  let startX = 0;
  slides.addEventListener("touchstart", (event) => { startX = event.touches[0].clientX; }, { passive: true });
  slides.addEventListener("touchend", (event) => {
    const deltaX = startX - event.changedTouches[0].clientX;
    if (Math.abs(deltaX) < 50) return;
    deltaX > 0 ? nextSlide() : prevSlide();
    startAutoplay();
  }, { passive: true });

  // Keyboard support + pause on hover / hidden tab.
  slides.parentElement.addEventListener("mouseenter", stopAutoplay);
  slides.parentElement.addEventListener("mouseleave", startAutoplay);
  document.addEventListener("visibilitychange", () => (document.hidden ? stopAutoplay() : startAutoplay()));
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") nextSlide();
    if (event.key === "ArrowLeft") prevSlide();
  });

  showSlide(0);
  startAutoplay();
});
