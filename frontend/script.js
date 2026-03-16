/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   VaaniPay â€” script.js
   All interactivity for index.html
   Linked via: <script src="js/script.js"></script>
   (placed at bottom of <body> so DOM is ready)
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   1. NAVBAR â€” Sticky on scroll
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
(function initNavbar() {
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', function () {
    // Add 'stuck' class when user scrolls past 50px
    if (window.scrollY > 50) {
      nav.classList.add('stuck');
    } else {
      nav.classList.remove('stuck');
    }
  });
})();


/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   2. MOBILE HAMBURGER MENU
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
(function initMobileMenu() {
  const burger   = document.getElementById('burger');
  const mobMenu  = document.getElementById('mobMenu');
  const mobX     = document.getElementById('mobX');

  // Open menu
  burger.addEventListener('click', function () {
    mobMenu.classList.add('on');
    document.body.style.overflow = 'hidden'; // prevent scroll behind menu
  });

  // Close menu with X button
  mobX.addEventListener('click', function () {
    mobMenu.classList.remove('on');
    document.body.style.overflow = '';
  });

  // Close when any nav link is clicked
  const mobLinks = document.querySelectorAll('.mob-link');
  mobLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      mobMenu.classList.remove('on');
      document.body.style.overflow = '';
    });
  });

  // Close if user clicks outside (on the overlay)
  mobMenu.addEventListener('click', function (e) {
    if (e.target === mobMenu) {
      mobMenu.classList.remove('on');
      document.body.style.overflow = '';
    }
  });
})();


/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   3. SMOOTH SCROLL for anchor links
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
(function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Skip if just "#"
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();


// /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//    4. SCROLL REVEAL ANIMATION
//    Elements with class "rv" fade in
//    when they enter the viewport
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
// (function initScrollReveal() {
//   const revealEls = document.querySelectorAll('.rv');

//   // Use IntersectionObserver for performance
//   const observer = new IntersectionObserver(
//     function (entries) {
//       entries.forEach(function (entry) {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('in');
//           // Stop observing once revealed (no re-animation needed)
//           observer.unobserve(entry.target);
//         }
//       });
//     },
//     { threshold: 0.12 } // Trigger when 12% of element is visible
//   );

//   revealEls.forEach(function (el) {
//     observer.observe(el);
//   });
// })();


