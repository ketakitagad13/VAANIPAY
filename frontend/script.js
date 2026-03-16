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


// (function initScrollReveal() {
//   const revealEls = document.querySelectorAll('.rv');

//   function revealIfVisible(el) {
//     const rect = el.getBoundingClientRect();
//     if (rect.top < window.innerHeight * 0.95) {
//       el.classList.add('in');
//     }
//   }

//   // FIX: Check all elements immediately on page load
//   revealEls.forEach(function(el) { revealIfVisible(el); });

//   // FIX: Also re-check on every scroll
//   window.addEventListener('scroll', function() {
//     revealEls.forEach(function(el) {
//       if (!el.classList.contains('in')) {
//         revealIfVisible(el);
//       }
//     });
//   }, { passive: true });
// })();


(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.rv');

  // Immediately show anything already visible on screen
  function checkAll() {
    revealEls.forEach(function(el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.classList.add('in');
      }
    });
  }

  // Run on load immediately
  checkAll();

  // Run on every scroll
  window.addEventListener('scroll', checkAll, { passive: true });
})();



/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   5. CHATBOT WIDGET
   Smart keyword-matching Q&A bot.
   To upgrade to real AI: replace
   getReply() with an API call to
   Gemini or OpenAI (see Section 11
   of the hackathon guide).
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
(function initChatbot() {

  // â”€â”€ DOM elements â”€â”€
  const cbBtn    = document.getElementById('cbBtn');
  const cbWin    = document.getElementById('cbWin');
  const cbNotif  = document.getElementById('cbNotif');
  const cbInp    = document.getElementById('cbInp');
  const cbSendBtn = document.getElementById('cbSendBtn');
  const cbMsgs   = document.getElementById('cbMsgs');
  const cbQuick  = document.getElementById('cbQuick');

  // â”€â”€ Knowledge base (keyword â†’ answer) â”€â”€
  // To connect real AI: replace this with an API call
  const KB = {
    send:    'To send money, tap the mic ðŸŽ¤ and say "Send [amount] to [name]". Example: "Send 200 rupees to Ramesh". Then tap Confirm â€” done in seconds!',
    safe:    '100% safe! âœ… VaaniPay uses 256-bit encryption, OTP per transaction, and AI fraud detection monitoring every payment.',
    language:'VaaniPay supports 12 Indian languages ðŸŒ including Hindi, Tamil, Telugu, Bengali, Kannada, Marathi, Gujarati, Punjabi, Odia, and Malayalam!',
    offline: 'Yes! ðŸ“¶ VaaniPay works offline. Payments save locally and sync automatically when internet returns. Zero transactions lost.',
    free:    'Signing up is completely free! âœ… Standard UPI charges may apply based on your bank.',
    otp:     'Every login and transaction needs an OTP ðŸ“± sent to your registered number â€” keeping your account always secure.',
    default: "I'm here to help! ðŸ˜Š Ask me about sending money, security, languages, offline mode, or how to get started with VaaniPay."
  };

  // â”€â”€ Match user message to knowledge base â”€â”€
  function getReply(msg) {
    const l = msg.toLowerCase();
    if (/send|pay|transfer|money/.test(l))               return KB.send;
    if (/safe|secure|trust|fraud|encrypt/.test(l))       return KB.safe;
    if (/lang|hindi|tamil|telugu|marathi|kannada|bengali|gujarati|punjabi/.test(l)) return KB.language;
    if (/offline|internet|network|2g|3g|low/.test(l))   return KB.offline;
    if (/free|cost|charge|price|fee/.test(l))            return KB.free;
    if (/otp|verif|login|password|sign/.test(l))         return KB.otp;
    return KB.default;
  }

  // â”€â”€ Add a message bubble to chat â”€â”€
  function addMessage(text, isUser) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'msg ' + (isUser ? 'usr' : 'bot');

    const now = new Date();
    const timeStr = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');

    msgDiv.innerHTML =
      '<div class="bub">' + text + '</div>' +
      '<div class="msg-t">' + timeStr + '</div>';

    cbMsgs.appendChild(msgDiv);
    cbMsgs.scrollTop = cbMsgs.scrollHeight; // Auto-scroll to bottom
  }

  // â”€â”€ Handle sending a message â”€â”€
  function sendMessage(text) {
    const msg = text || cbInp.value.trim();
    if (!msg) return;

    addMessage(msg, true);      // Show user message
    cbInp.value = '';            // Clear input

    // Simulate typing delay for bot reply
    setTimeout(function () {
