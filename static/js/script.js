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
      addMessage(getReply(msg), false);
    }, 620);
  }

  // â”€â”€ Toggle chatbot open/close â”€â”€
  function toggleChat() {
    cbWin.classList.toggle('on');
    cbBtn.classList.toggle('on');
    cbNotif.style.display = 'none'; // Hide notification dot
  }

  // â”€â”€ Event listeners â”€â”€
  cbBtn.addEventListener('click', toggleChat);

  cbSendBtn.addEventListener('click', function () {
    sendMessage();
  });

  cbInp.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
  });

  // Quick-reply buttons (uses data-q attribute from HTML)
  cbQuick.addEventListener('click', function (e) {
    const btn = e.target.closest('.qb');
    if (btn) sendMessage(btn.dataset.q);
  });

})();


/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   6. PHONE MIC BUTTON DEMO ANIMATION
   Clicking mic in phone mockup
   shows a small demo interaction
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
(function initPhoneMic() {
  const micBtn = document.getElementById('phoneMicBtn');
  if (!micBtn) return;

  const micText = micBtn.closest('.p-mic-area')?.querySelector('.p-mic-t');
  const micSub  = micBtn.closest('.p-mic-area')?.querySelector('.p-mic-s');

  const demoSteps = [
    { t: 'Listening...', s: '"Send 500 rupees to Priya"' },
    { t: 'Processing...', s: 'Extracting name & amount' },
    { t: 'Confirming...', s: 'Receiver: Priya | â‚¹500' },
    { t: 'Tap to Speak', s: 'Say "Send money to..."' }
  ];

  let step = 0;
  let timer = null;

  micBtn.addEventListener('click', function () {
    clearTimeout(timer);
    step = 0;
    runDemo();
  });

  function runDemo() {
    if (step >= demoSteps.length) return;
    const s = demoSteps[step];
    if (micText) micText.textContent = s.t;
    if (micSub)  micSub.textContent  = s.s;
    step++;
    if (step < demoSteps.length) {
      timer = setTimeout(runDemo, 1200);
    }
  }
})();


/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   7. ACTIVE NAV LINK HIGHLIGHTING
   Highlights the correct nav link
   based on scroll position
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', function () {
    let currentId = '';

    sections.forEach(function (section) {
      const sTop = section.offsetTop - 120;
      if (window.scrollY >= sTop) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.style.color = '';
      link.style.background = '';
      if (link.getAttribute('href') === '#' + currentId) {
        link.style.color = 'var(--g1)';
        link.style.background = 'var(--g3)';
      }
    });
  });
})();


/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   8. YEAR AUTO-UPDATE in footer
   So copyright year is always current
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
(function updateYear() {
  const yearEls = document.querySelectorAll('.ft-bot span');
  const year = new Date().getFullYear();

  yearEls.forEach(function (el) {
    el.textContent = el.textContent.replace(/\d{4}/, year);
  });
})();
/* ══════════════════════════════════════════════════════════════
   9. ONLINE / OFFLINE STATUS BADGE
   Polls /api/status every 7 seconds.
   Shows 🟢 Online or 🔴 Offline in the navbar.
   Falls back gracefully if the endpoint doesn't exist yet.
══════════════════════════════════════════════════════════════ */
(function initStatusBadge() {
  const badge = document.getElementById('statusBadge');
  if (!badge) return;

  function showBadge(text, isOffline) {
    badge.textContent = text;
    if (isOffline) {
      badge.classList.add('offline');
    } else {
      badge.classList.remove('offline');
    }
  }

  function checkStatus() {
    fetch('/api/status', {
      method: 'GET',
      cache: 'no-cache',          // always a fresh check, never cached
      signal: AbortSignal.timeout(4000) // timeout after 4s so it doesn't hang
    })
      .then(function(res) {
        if (res.ok) {
          showBadge('🟢 Online', false);
        } else {
          // Server responded but with an error code (e.g. 503)
          showBadge('🔴 Offline', true);
        }
      })
      .catch(function() {
        // Network failure or endpoint doesn't exist yet
        showBadge('🔴 Offline', true);
      });
  }

  // Run immediately on load, then every 7 seconds
  checkStatus();
  setInterval(checkStatus, 7000);

  // Also hook into the browser's built-in online/offline events
  // as a fast, instant fallback (no waiting for the next poll)
  window.addEventListener('online',  function() { showBadge('🟢 Online',  false); });
  window.addEventListener('offline', function() { showBadge('🔴 Offline', true);  });

})();
/* ══════════════════════════════════════════════════════════════
   10. DARK / LIGHT MODE TOGGLE
   - Remembers user preference in localStorage
   - Applies saved theme instantly on page load (no flicker)
   - Toggle button in navbar switches between dark and light
══════════════════════════════════════════════════════════════ */
(function initThemeToggle() {

  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  // ── Apply theme ──────────────────────────────────────────
  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  // ── Load saved preference (default: light) ───────────────
  // Check localStorage first, then fall back to system preference
  function getSavedTheme() {
    const saved = localStorage.getItem('vaanipay-theme');
    if (saved) return saved === 'dark';
    // Respect OS-level dark mode preference if no saved choice
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // Apply immediately on load to prevent flash of wrong theme
  let isDark = getSavedTheme();
  applyTheme(isDark);

  // ── Handle toggle click ───────────────────────────────────
  toggle.addEventListener('click', function () {
    isDark = !isDark;
    applyTheme(isDark);
    localStorage.setItem('vaanipay-theme', isDark ? 'dark' : 'light');
  });

  // ── Listen for OS theme changes (e.g. auto dark at sunset) ─
  // Only applies if user hasn't manually set a preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    const hasManualPref = localStorage.getItem('vaanipay-theme');
    if (!hasManualPref) {
      isDark = e.matches;
      applyTheme(isDark);
    }
  });

})();
/* ══════════════════════════════════════════════════════════════
   11. LANGUAGE SELECTOR — Full Page Translation
══════════════════════════════════════════════════════════════ */
(function initLangSelector() {

  const selector  = document.getElementById('langSelector');
  const btn       = document.getElementById('lsBtn');
  const dropdown  = document.getElementById('lsDropdown');
  const arrow     = document.getElementById('lsArrow');
  const flagEl    = document.getElementById('lsFlag');
  const currentEl = document.getElementById('lsCurrent');
  const searchEl  = document.getElementById('lsSearch');
  const listEl    = document.getElementById('lsList');

  if (!selector || !btn || !dropdown) return;

  const RTL_LANGS = ['ur-IN'];

  // ── Toast ─────────────────────────────────────────────────
  const toast = document.createElement('div');
  toast.className = 'lang-toast';
  document.body.appendChild(toast);
  let toastTimer = null;
  function showToast(msg) {
    clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
  }

  // ══════════════════════════════════════════════════════════
  // FULL TRANSLATIONS TABLE
  // Every visible string on the page, keyed by data-i18n value
  // ══════════════════════════════════════════════════════════
  const T = {
    'nav.features':      {'en-IN':'Features','hi-IN':'विशेषताएँ','bn-IN':'বৈশিষ্ট্য','ta-IN':'அம்சங்கள்','te-IN':'లక్షణాలు','ml-IN':'സവിശേഷതകൾ','kn-IN':'ವೈಶಿಷ್ಟ್ಯಗಳು','mr-IN':'वैशिष्ट्ये','gu-IN':'વિશેષતાઓ','pa-IN':'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ','or-IN':'ବିଶେଷତା','ur-IN':'خصوصیات'},
    'nav.how':           {'en-IN':'How It Works','hi-IN':'यह कैसे काम करता है','bn-IN':'এটি কীভাবে কাজ করে','ta-IN':'எப்படி செயல்படுகிறது','te-IN':'ఇది ఎలా పని చేస్తుంది','ml-IN':'എങ്ങനെ പ്രവർത്തിക്കുന്നു','kn-IN':'ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ','mr-IN':'हे कसे काम करते','gu-IN':'તે કેવી રીતે કાર્ય કરે છે','pa-IN':'ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ','or-IN':'ଏହା କିପରି କାର୍ଯ୍ୟ କରେ','ur-IN':'یہ کیسے کام کرتا ہے'},
    'nav.analytics':     {'en-IN':'Analytics','hi-IN':'विश्लेषण','bn-IN':'বিশ্লেষণ','ta-IN':'பகுப்பாய்வு','te-IN':'విశ్లేషణలు','ml-IN':'അനലിറ്റിക്സ്','kn-IN':'ವಿಶ್ಲೇಷಣೆ','mr-IN':'विश्लेषण','gu-IN':'વિશ્લેષણ','pa-IN':'ਵਿਸ਼ਲੇਸ਼ਣ','or-IN':'ବିଶ୍ଳେଷଣ','ur-IN':'تجزیات'},
    'nav.security':      {'en-IN':'Security','hi-IN':'सुरक्षा','bn-IN':'নিরাপত্তা','ta-IN':'பாதுகாப்பு','te-IN':'భద్రత','ml-IN':'സുരക്ഷ','kn-IN':'ಭದ್ರತೆ','mr-IN':'सुरक्षा','gu-IN':'સુરક્ષા','pa-IN':'ਸੁਰੱਖਿਆ','or-IN':'ସୁରକ୍ଷା','ur-IN':'سیکیورٹی'},
    'nav.about':         {'en-IN':'About','hi-IN':'हमारे बारे में','bn-IN':'আমাদের সম্পর্কে','ta-IN':'எங்களை பற்றி','te-IN':'మా గురించి','ml-IN':'ഞങ്ങളെക്കുറിച്ച്','kn-IN':'ನಮ್ಮ ಬಗ್ಗೆ','mr-IN':'आमच्याबद्दल','gu-IN':'અમારા વિશે','pa-IN':'ਸਾਡੇ ਬਾਰੇ','or-IN':'ଆମ ବିଷୟରେ','ur-IN':'ہمارے بارے میں'},
    'nav.login':         {'en-IN':'Login','hi-IN':'लॉगिन','bn-IN':'লগইন','ta-IN':'உள்நுழைய','te-IN':'లాగిన్','ml-IN':'ലോഗിൻ','kn-IN':'ಲಾಗಿನ್','mr-IN':'लॉगिन','gu-IN':'લૉગિન','pa-IN':'ਲੌਗਇਨ','or-IN':'ଲଗଇନ','ur-IN':'لاگ ان'},
    'mob.getstarted':    {'en-IN':'Get Started Free','hi-IN':'मुफ़्त शुरू करें','bn-IN':'বিনামূল্যে শুরু করুন','ta-IN':'இலவசமாக தொடங்குங்கள்','te-IN':'ఉచితంగా ప్రారంభించండి','ml-IN':'സൗജന്യമായി ആരംഭിക്കൂ','kn-IN':'ಉಚಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ','mr-IN':'मोफत सुरू करा','gu-IN':'મફત શરૂ કરો','pa-IN':'ਮੁਫ਼ਤ ਸ਼ੁਰੂ ਕਰੋ','or-IN':'ମାଗଣାରେ ଆରମ୍ଭ କରନ୍ତୁ','ur-IN':'مفت شروع کریں'},

    // Hero
    'hero.badge':        {'en-IN':'Now live in 12 Indian languages','hi-IN':'अब 12 भारतीय भाषाओं में','bn-IN':'এখন ১২টি ভারতীয় ভাষায়','ta-IN':'இப்போது 12 இந்திய மொழிகளில்','te-IN':'ఇప్పుడు 12 భారతీయ భాషల్లో','ml-IN':'ഇപ്പോൾ 12 ഇന്ത്യൻ ഭാഷകളിൽ','kn-IN':'ಈಗ 12 ಭಾರತೀಯ ಭಾಷೆಗಳಲ್ಲಿ','mr-IN':'आता 12 भारतीय भाषांमध्ये','gu-IN':'હવે 12 ભારતીય ભાષાઓમાં','pa-IN':'ਹੁਣ 12 ਭਾਰਤੀ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ','or-IN':'ବର୍ତ୍ତମାନ 12 ଭାରତୀୟ ଭାଷାରେ','ur-IN':'اب 12 ہندوستانی زبانوں میں'},
    'hero.hl':           {'en-IN':'Made Simple','hi-IN':'आसान बनाया','bn-IN':'সহজ করা হয়েছে','ta-IN':'எளிதாக்கப்பட்டது','te-IN':'సులభంగా చేయబడింది','ml-IN':'ലളിതമാക்കி','kn-IN':'ಸರಳಗೊಳಿಸಲಾಗಿದೆ','mr-IN':'सोपे केले','gu-IN':'સરળ બનાવ્યું','pa-IN':'ਆਸਾਨ ਬਣਾਇਆ','or-IN':'ସହଜ କରାଯାଇଛି','ur-IN':'آسان بنایا گیا'},
    'hero.ho':           {'en-IN':'for Everyone','hi-IN':'सभी के लिए','bn-IN':'সবার জন্য','ta-IN':'அனைவருக்கும்','te-IN':'అందరికీ','ml-IN':'എല്ലാവർക്കും','kn-IN':'ಎಲ್ಲರಿಗೂ','mr-IN':'प्रत्येकासाठी','gu-IN':'દરેક માટે','pa-IN':'ਸਾਰਿਆਂ ਲਈ','or-IN':'ସମସ୍ତଙ୍କ ପାଇଁ','ur-IN':'سب کے لیے'},
    'hero.title.pre':    {'en-IN':'Digital Payments','hi-IN':'डिजिटल भुगतान','bn-IN':'ডিজিটাল পেমেন্ট','ta-IN':'டிஜிட்டல் பேமெண்ட்','te-IN':'డిజిటల్ చెల్లింపులు','ml-IN':'ഡിജിറ്റൽ പേമെന്റ്','kn-IN':'ಡಿಜಿಟಲ್ ಪಾವತಿ','mr-IN':'डिजिटल पेमेंट','gu-IN':'ડિજિટલ ચુકવણી','pa-IN':'ਡਿਜੀਟਲ ਭੁਗਤਾਨ','or-IN':'ଡିଜିଟାଲ ଭୁଗତାନ','ur-IN':'ڈیجیٹل ادائیگی'},
    'hero.sub':          {'en-IN':'Just speak – VaaniPay turns your voice into instant, secure digital payments. No complex menus. No UPI IDs to memorise. Built for every Indian.','hi-IN':'बस बोलिए – VaaniPay आपकी आवाज़ को तुरंत, सुरक्षित डिजिटल भुगतान में बदल देता है। कोई जटिल मेनू नहीं। कोई UPI ID याद नहीं।','bn-IN':'শুধু বলুন – VaaniPay আপনার কণ্ঠস্বরকে তাৎক্ষণিক, নিরাপদ ডিজিটাল পেমেন্টে রূপান্তরিত করে। কোনো জটিল মেনু নেই।','ta-IN':'பேசுங்கள் – VaaniPay உங்கள் குரலை உடனடி, பாதுகாப்பான டிஜிட்டல் கட்டணமாக மாற்றுகிறது. சிக்கலான மெனுக்கள் இல்லை.','te-IN':'మాట్లాడండి – VaaniPay మీ గొంతును తక్షణ, సురక్షిత డిజిటల్ చెల్లింపులుగా మారుస్తుంది. సంక్లిష్ట మెనులు లేవు.','ml-IN':'സംസാരിക്കൂ – VaaniPay നിങ്ങളുടെ ശബ്ദത്തെ തൽക്ഷണ, സുരക്ഷിത ഡിജിറ്റൽ പേമെന്റാക്കി മാറ്റുന്നു. സങ്കീർണ്ണ മെനുകൾ ഇല്ല.','kn-IN':'ಮಾತನಾಡಿ – VaaniPay ನಿಮ್ಮ ಧ್ವನಿಯನ್ನು ತ್ವರಿತ, ಸುರಕ್ಷಿತ ಡಿಜಿಟಲ್ ಪಾವತಿಯಾಗಿ ಪರಿವರ್ತಿಸುತ್ತದೆ. ಸಂಕೀರ್ಣ ಮೆನುಗಳಿಲ್ಲ.','mr-IN':'फक्त बोला – VaaniPay तुमच्या आवाजाला तात्काळ, सुरक्षित डिजिटल पेमेंटमध्ये बदलते. कोणतेही जटिल मेनू नाही.','gu-IN':'ફક્ત બોલો – VaaniPay તમારા અવાજને તત્કાળ, સુરક્ષિત ડિજિટલ ચુકવણીમાં ફેરવે છે. કોઈ જટિલ મેનૂ નહીં.','pa-IN':'ਬੱਸ ਬੋਲੋ – VaaniPay ਤੁਹਾਡੀ ਆਵਾਜ਼ ਨੂੰ ਤੁਰੰਤ, ਸੁਰੱਖਿਅਤ ਡਿਜੀਟਲ ਭੁਗਤਾਨ ਵਿੱਚ ਬਦਲਦਾ ਹੈ। ਕੋਈ ਜਟਿਲ ਮੇਨੂ ਨਹੀਂ।','or-IN':'କେବଳ କୁହନ୍ତୁ – VaaniPay ଆପଣଙ୍କ ସ୍ୱରକୁ ତୁରନ୍ତ, ସୁରକ୍ଷିତ ଡିଜିଟାଲ ଭୁଗତାନରେ ପରିଣତ କରେ।','ur-IN':'بس بولیں – VaaniPay آپ کی آواز کو فوری، محفوظ ڈیجیٹل ادائیگی میں بدل دیتا ہے۔'},
    'hero.btn1':         {'en-IN':'Get Started Free','hi-IN':'मुफ़्त शुरू करें','bn-IN':'বিনামূল্যে শুরু করুন','ta-IN':'இலவசமாக தொடங்குங்கள்','te-IN':'ఉచితంగా ప్రారంభించండి','ml-IN':'സൗജന്യമായി ആരംഭിക്കൂ','kn-IN':'ಉಚಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ','mr-IN':'मोफत सुरू करा','gu-IN':'મફત શરૂ કરો','pa-IN':'ਮੁਫ਼ਤ ਸ਼ੁਰੂ ਕਰੋ','or-IN':'ମାଗଣାରେ ଆରମ୍ଭ','ur-IN':'مفت شروع کریں'},
    'hero.btn2':         {'en-IN':'See How It Works','hi-IN':'देखें यह कैसे काम करता है','bn-IN':'দেখুন এটি কীভাবে কাজ করে','ta-IN':'எப்படி செயல்படுகிறது என்று பாருங்கள்','te-IN':'ఇది ఎలా పని చేస్తుందో చూడండి','ml-IN':'ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു കാണൂ','kn-IN':'ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ ನೋಡಿ','mr-IN':'हे कसे काम करते ते पहा','gu-IN':'તે કેવી રીતે કાર્ય કરે છે','pa-IN':'ਦੇਖੋ ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ','or-IN':'ଏହା କିପରି କାର୍ଯ୍ୟ କରେ ଦେଖନ୍ତୁ','ur-IN':'دیکھیں یہ کیسے کام کرتا ہے'},
    'hero.stat1.l':      {'en-IN':'Active users','hi-IN':'सक्रिय उपयोगकर्ता','bn-IN':'সক্রিয় ব্যবহারকারী','ta-IN':'செயலில் உள்ள பயனர்கள்','te-IN':'చురుకైన వినియోగదారులు','ml-IN':'സജീവ ഉപയോക്താക്കൾ','kn-IN':'ಸಕ್ರಿಯ ಬಳಕೆದಾರರು','mr-IN':'सक्रिय वापरकर्ते','gu-IN':'સક્રિય વપરાશकर्ता','pa-IN':'ਸਰਗਰਮ ਉਪਭੋਗਤਾ','or-IN':'ସକ୍ରିୟ ଉପଭୋକ୍ତା','ur-IN':'فعال صارفین'},
    'hero.stat2.l':      {'en-IN':'Languages','hi-IN':'भाषाएँ','bn-IN':'ভাষা','ta-IN':'மொழிகள்','te-IN':'భాషలు','ml-IN':'ഭാഷകൾ','kn-IN':'ಭಾಷೆಗಳು','mr-IN':'भाषा','gu-IN':'ભાષાઓ','pa-IN':'ਭਾਸ਼ਾਵਾਂ','or-IN':'ଭାଷା','ur-IN':'زبانیں'},
    'hero.stat3.l':      {'en-IN':'Transactions','hi-IN':'लेन-देन','bn-IN':'লেনদেন','ta-IN':'பரிவர்த்தனைகள்','te-IN':'లావాదేవీలు','ml-IN':'ഇടപാടുകൾ','kn-IN':'ವ್ಯವಹಾರಗಳು','mr-IN':'व्यवहार','gu-IN':'વ્યવહારો','pa-IN':'ਲੈਣ-ਦੇਣ','or-IN':'ଲେଣଦେଣ','ur-IN':'لین دین'},

    // Floating chips
    'fc1.lbl':           {'en-IN':'Voice Command','hi-IN':'आवाज़ कमांड','bn-IN':'ভয়েস কমান্ড','ta-IN':'குரல் கட்டளை','te-IN':'వాయిస్ కమాండ్','ml-IN':'ശബ്ദ കമാൻഡ്','kn-IN':'ಧ್ವನಿ ಆಜ್ಞೆ','mr-IN':'आवाज आदेश','gu-IN':'અવાજ આદેશ','pa-IN':'ਆਵਾਜ਼ ਕਮਾਂਡ','or-IN':'ଭଏସ ଆଦେଶ','ur-IN':'آواز کمانڈ'},
    'fc2.lbl':           {'en-IN':'Payment Sent!','hi-IN':'भुगतान भेजा!','bn-IN':'পেমেন্ট পাঠানো হয়েছে!','ta-IN':'கட்டணம் அனுப்பப்பட்டது!','te-IN':'చెల్లింపు పంపబడింది!','ml-IN':'പേമെന്റ് അയച്ചു!','kn-IN':'ಪಾವತಿ ಕಳುಹಿಸಲಾಗಿದೆ!','mr-IN':'पेमेंट पाठवले!','gu-IN':'ચુકવણી મોકલાઈ!','pa-IN':'ਭੁਗਤਾਨ ਭੇਜਿਆ!','or-IN':'ଭୁଗତାନ ପଠାଯାଇଛି!','ur-IN':'ادائیگی بھیجی!'},

    // Phone mockup
    'phone.balance':     {'en-IN':'Total Balance','hi-IN':'कुल शेष','bn-IN':'মোট ব্যালেন্স','ta-IN':'மொத்த இருப்பு','te-IN':'మొత్తం నిల్వ','ml-IN':'മൊത്തം ബാലൻസ്','kn-IN':'ಒಟ್ಟು ಶಿಲ್ಕು','mr-IN':'एकूण शिल्लक','gu-IN':'કુલ બેલેન્સ','pa-IN':'ਕੁੱਲ ਬੈਲੇਂਸ','or-IN':'ମୋଟ ଜମା','ur-IN':'کل بیلنس'},
    'phone.tap':         {'en-IN':'Tap to Speak','hi-IN':'बोलने के लिए टैप करें','bn-IN':'কথা বলতে ট্যাপ করুন','ta-IN':'பேச தட்டவும்','te-IN':'మాట్లాడటానికి నొక్కండి','ml-IN':'സംസാരിക്കാൻ ടാപ്പ് ചെയ്യൂ','kn-IN':'ಮಾತನಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ','mr-IN':'बोलण्यासाठी टॅप करा','gu-IN':'બોલવા માટે ટૅپ કरो','pa-IN':'ਬੋਲਣ ਲਈ ਟੈਪ ਕਰੋ','or-IN':'କୁହିବା ପାଇଁ ଟ୍ୟାପ୍ କରନ୍ତୁ','ur-IN':'بولنے کے لیے ٹیپ کریں'},
    'phone.say':         {'en-IN':'Say "Send money to..."','hi-IN':'"पैसे भेजो..." कहें','bn-IN':'"টাকা পাঠাও..." বলুন','ta-IN':'"பணம் அனுப்பு..." சொல்லுங்கள்','te-IN':'"డబ్బు పంపు..." చెప్పండి','ml-IN':'"പണം അയക്കൂ..." പറയൂ','kn-IN':'"ಹಣ ಕಳುಹಿಸು..." ಹೇಳಿ','mr-IN':'"पैसे पाठव..." म्हणा','gu-IN':'"પૈसा मोकलो..." कहो','pa-IN':'"ਪੈਸੇ ਭੇਜੋ..." ਕਹੋ','or-IN':'"ଟଙ୍କା ପଠାନ୍ତୁ..." କୁହନ୍ତୁ','ur-IN':'"پیسے بھیجو..." کہیں'},
    'phone.tx1.nm':      {'en-IN':'Ramesh Kumar','hi-IN':'रमेश कुमार','bn-IN':'রমেশ কুমার','ta-IN':'ரமேஷ் குமார்','te-IN':'రమేష్ కుమార్','ml-IN':'രമേഷ് കുമാർ','kn-IN':'ರಮೇಶ್ ಕುಮಾರ್','mr-IN':'रमेश कुमार','gu-IN':'રમેશ કુमार','pa-IN':'ਰਮੇਸ਼ ਕੁਮਾਰ','or-IN':'ରମେଶ କୁମାର','ur-IN':'رمیش کمار'},
    'phone.tx1.t':       {'en-IN':'Today, 10:24 AM','hi-IN':'आज, 10:24 AM','bn-IN':'আজ, 10:24 AM','ta-IN':'இன்று, 10:24 AM','te-IN':'ఈరోజు, 10:24 AM','ml-IN':'ഇന്ന്, 10:24 AM','kn-IN':'ಇಂದು, 10:24 AM','mr-IN':'आज, 10:24 AM','gu-IN':'આজे, 10:24 AM','pa-IN':'ਅੱਜ, 10:24 AM','or-IN':'ଆଜି, 10:24 AM','ur-IN':'آج، 10:24 AM'},
    'phone.tx2.nm':      {'en-IN':'Kirana Store','hi-IN':'किराना स्टोर','bn-IN':'কিরানা স্টোর','ta-IN':'கிரானா கடை','te-IN':'కిరానా స్టోర్','ml-IN':'കിരാന സ്റ്റോർ','kn-IN':'ಕಿರಾಣಾ ಸ್ಟೋರ್','mr-IN':'किराणा स्टोअर','gu-IN':'किराणा स्टोर','pa-IN':'ਕਿਰਾਣਾ ਸਟੋਰ','or-IN':'କିରାଣା ଷ୍ଟୋର','ur-IN':'کرانہ اسٹور'},
    'phone.tx2.t':       {'en-IN':'Yesterday, 6:12 PM','hi-IN':'कल, 6:12 PM','bn-IN':'গতকাল, 6:12 PM','ta-IN':'நேற்று, 6:12 PM','te-IN':'నిన్న, 6:12 PM','ml-IN':'ഇന്നലെ, 6:12 PM','kn-IN':'ನಿನ್ನೆ, 6:12 PM','mr-IN':'काल, 6:12 PM','gu-IN':'ગઈकाल, 6:12 PM','pa-IN':'ਕੱਲ੍ਹ, 6:12 PM','or-IN':'କାଲି, 6:12 PM','ur-IN':'کل، 6:12 PM'},

    // Features
    'feat.chip':         {'en-IN':'Why VaaniPay?','hi-IN':'VaaniPay क्यों?','bn-IN':'কেন VaaniPay?','ta-IN':'ஏன் VaaniPay?','te-IN':'ఎందుకు VaaniPay?','ml-IN':'എന്തുകൊണ്ട് VaaniPay?','kn-IN':'ಏಕೆ VaaniPay?','mr-IN':'VaaniPay का?','gu-IN':'શા माटे VaaniPay?','pa-IN':'VaaniPay ਕਿਉਂ?','or-IN':'କାହିଁକି VaaniPay?','ur-IN':'VaaniPay کیوں؟'},
    'feat.h2':           {'en-IN':'Payments Built for Real People','hi-IN':'असली लोगों के लिए बने भुगतान','bn-IN':'সত্যিকারের মানুষের জন্য পেমেন্ট','ta-IN':'உண்மையான மக்களுக்கான பேமெண்ட்','te-IN':'నిజమైన వ్యక్తుల కోసం చెల్లింపులు','ml-IN':'യഥാർത്ഥ ആളുകൾക്കായുള്ള പേമെന്റ്','kn-IN':'ನಿಜವಾದ ಜನರಿಗಾಗಿ ಪಾವತಿ','mr-IN':'खऱ्या लोकांसाठी बनलेली पेमेंट','gu-IN':'वास्तविक लोगों के लिए भुगतान','pa-IN':'ਅਸਲੀ ਲੋਕਾਂ ਲਈ ਭੁਗਤਾਨ','or-IN':'ପ୍ରକୃତ ଲୋକଙ୍କ ପାଇଁ ଭୁଗତାନ','ur-IN':'حقیقی لوگوں کے لیے ادائیگیاں'},
    'feat.sub':          {'en-IN':'No jargon. No complexity. Fast, simple payments that work for everyone – including first-time smartphone users.','hi-IN':'कोई जटिलता नहीं। सभी के लिए तेज़, सरल भुगतान।','bn-IN':'কোনো জটিলতা নেই। সবার জন্য দ্রুত, সহজ পেমেন্ট।','ta-IN':'எந்த சிக்கலும் இல்லை. அனைவருக்கும் வேகமான, எளிய பேமெண்ட்.','te-IN':'ఎటువంటి సంక్లిష్టత లేదు. అందరికీ వేగంగా, సరళంగా.','ml-IN':'സങ്കീർണ്ണത ഇല്ല. എല്ലാവർക്കും വേഗത്തിൽ, ലളിതമായി.','kn-IN':'ಯಾವುದೇ ಸಂಕೀರ್ಣತೆ ಇಲ್ಲ. ಎಲ್ಲರಿಗೂ ವೇಗವಾಗಿ, ಸರಳವಾಗಿ.','mr-IN':'कोणतीही गुंतागुंत नाही. सर्वांसाठी जलद, सोपी पेमेंट.','gu-IN':'कोई जटिलता नहीं। हर किसी के लिए तेज, सरल भुगतान।','pa-IN':'ਕੋਈ ਜਟਿਲਤਾ ਨਹੀਂ। ਸਾਰਿਆਂ ਲਈ ਤੇਜ਼, ਸਰਲ ਭੁਗਤਾਨ।','or-IN':'କୌଣସି ଜଟିଳତା ନାହିଁ। ସମସ୍ତଙ୍କ ପାଇଁ ଦ୍ରୁତ, ସରଳ ଭୁଗତାନ।','ur-IN':'کوئی پیچیدگی نہیں۔ سب کے لیے تیز، آسان ادائیگی۔'},
    'feat1.title':       {'en-IN':'Voice-Based Payments','hi-IN':'आवाज़ से भुगतान','bn-IN':'ভয়েস-ভিত্তিক পেমেন্ট','ta-IN':'குரல்-அடிப்படையிலான பேமெண்ட்','te-IN':'వాయిస్-ఆధారిత చెల్లింపులు','ml-IN':'ശബ്ദ-അടിസ്ഥാനത്തിലുള്ള പേമെന്റ്','kn-IN':'ಧ್ವನಿ-ಆಧಾರಿತ ಪಾವತಿ','mr-IN':'आवाज-आधारित पेमेंट','gu-IN':'अवाज-आधारित भुगतान','pa-IN':'ਆਵਾਜ਼-ਆਧਾਰਿਤ ਭੁਗਤਾਨ','or-IN':'ଭଏସ-ଆଧାରିତ ଭୁଗତାନ','ur-IN':'آواز پر مبنی ادائیگی'},
    'feat1.desc':        {'en-IN':'Say "Send 200 rupees to Suresh" – no forms, no UPI IDs. Works naturally in your own words and dialect.','hi-IN':'"सुरेश को 200 रुपये भेजो" कहें – कोई फॉर्म नहीं, कोई UPI ID नहीं।','bn-IN':'"সুরেশকে 200 টাকা পাঠাও" বলুন – কোনো ফর্ম নেই, কোনো UPI ID নেই।','ta-IN':'"சுரேஷ்க்கு 200 ரூபாய் அனுப்பு" – எந்த படிவமும் இல்லை.','te-IN':'"సురేష్‌కు 200 రూపాయలు పంపు" – ఏ ఫారంలు లేవు.','ml-IN':'"സുരേഷിന് 200 രൂപ അയക്കൂ" – ഫോമുകൾ ഇല്ല.','kn-IN':'"ಸುರೇಶ್‌ಗೆ 200 ರೂಪಾಯಿ ಕಳುಹಿಸು" – ಯಾವ ಫಾರ್ಮ್‌ಗಳೂ ಇಲ್ಲ.','mr-IN':'"सुरेशला 200 रुपये पाठव" – कोणतेही फॉर्म नाही.','gu-IN':'"सुरेश को 200 रुपये भेजो" – कोई फॉर्म नहीं।','pa-IN':'"ਸੁਰੇਸ਼ ਨੂੰ 200 ਰੁਪਏ ਭੇਜੋ" – ਕੋਈ ਫਾਰਮ ਨਹੀਂ।','or-IN':'"ସୁରେଶକୁ 200 ଟଙ୍କା ପଠାଅ" – କୌଣସି ଫର୍ମ ନାହିଁ।','ur-IN':'"سریش کو 200 روپے بھیجو" – کوئی فارم نہیں۔'},
    'feat2.title':       {'en-IN':'Multilingual Interface','hi-IN':'बहुभाषी इंटरफेस','bn-IN':'বহুভাষিক ইন্টারফেস','ta-IN':'பலமொழி இடைமுகம்','te-IN':'బహుభాషా ఇంటర్‌ఫేస్','ml-IN':'ബഹുഭാഷാ ഇന്റർഫേസ്','kn-IN':'ಬಹುಭಾಷಾ ಇಂಟರ್ಫೇಸ್','mr-IN':'बहुभाषिक इंटरफेस','gu-IN':'बहुभाषी इंटरफेस','pa-IN':'ਬਹੁਭਾਸ਼ੀ ਇੰਟਰਫੇਸ','or-IN':'ବହୁଭାଷୀ ଇଣ୍ଟରଫେସ','ur-IN':'کثیر لسانی انٹرفیس'},
    'feat2.desc':        {'en-IN':'Speak in Hindi, Tamil, Telugu, Bengali, Kannada, Marathi, Gujarati, Punjabi and more – 12 languages supported.','hi-IN':'हिंदी, तमिल, तेलुगु, बंगाली, कन्नड़, मराठी सहित 12 भाषाएँ समर्थित।','bn-IN':'হিন্দি, তামিল, তেলেগু, বাংলা সহ 12টি ভাষা সমর্থিত।','ta-IN':'இந்தி, தமிழ், தெலுங்கு உட்பட 12 மொழிகள் ஆதரிக்கப்படுகின்றன.','te-IN':'హిందీ, తమిళ, తెలుగు సహా 12 భాషలు మద్దతు.','ml-IN':'ഹിന്ദി, തമിഴ്, തെലുങ്ക് ഉൾപ്പെടെ 12 ഭാഷകൾ.','kn-IN':'ಹಿಂದಿ, ತಮಿಳು, ತೆಲುಗು ಸೇರಿದಂತೆ 12 ಭಾಷೆಗಳು.','mr-IN':'हिंदी, तमिळ, तेलगूसह 12 भाषा समर्थित.','gu-IN':'हिंदी, तमिल, तेलुगु सहित 12 भाषाएं समर्थित।','pa-IN':'ਹਿੰਦੀ, ਤਮਿਲ, ਤੇਲਗੂ ਸਮੇਤ 12 ਭਾਸ਼ਾਵਾਂ.','or-IN':'ହିନ୍ଦି, ତାମିଲ, ତେଲୁଗୁ ସହ 12ଟି ଭାଷା ସମର୍ଥିତ।','ur-IN':'ہندی، تمل، تیلگو سمیت 12 زبانیں سپورٹ ہیں۔'},
    'feat3.title':       {'en-IN':'Secure Transactions','hi-IN':'सुरक्षित लेन-देन','bn-IN':'নিরাপদ লেনদেন','ta-IN':'பாதுகாப்பான பரிவர்த்தனைகள்','te-IN':'సురక్షిత లావాదేవీలు','ml-IN':'സുരക്ഷിത ഇടപാടുകൾ','kn-IN':'ಸುರಕ್ಷಿತ ವ್ಯವಹಾರಗಳು','mr-IN':'सुरक्षित व्यवहार','gu-IN':'सुरक्षित लेनदेन','pa-IN':'ਸੁਰੱਖਿਅਤ ਲੈਣ-ਦੇਣ','or-IN':'ସୁରକ୍ଷିତ ଲେଣଦେଣ','ur-IN':'محفوظ لین دین'},
    'feat3.desc':        {'en-IN':'OTP verification, bank-grade 256-bit encryption, and real-time AI fraud detection on every single payment.','hi-IN':'OTP सत्यापन, बैंक-ग्रेड 256-बिट एन्क्रिप्शन, और हर भुगतान पर AI धोखाधड़ी का पता लगाना।','bn-IN':'OTP যাচাইকরণ, ব্যাংক-গ্রেড 256-বিট এনক্রিপশন, প্রতিটি পেমেন্টে AI জালিয়াতি সনাক্তকরণ।','ta-IN':'OTP சரிபார்ப்பு, வங்கி-தர 256-பிட் குறியாக்கம், ஒவ்வொரு கட்டணத்திலும் AI மோசடி கண்டறிதல்.','te-IN':'OTP ధృవీకరణ, 256-బిట్ ఎన్‌క్రిప్షన్, ప్రతి చెల్లింపుపై AI మోసం గుర్తింపు.','ml-IN':'OTP പരിശോധന, 256-ബിറ്റ് എൻക്രിപ്ഷൻ, ഓരോ പേമെന്റിലും AI തട്ടിപ്പ് കണ്ടെത്തൽ.','kn-IN':'OTP ಪರಿಶೀಲನೆ, 256-ಬಿಟ್ ಎನ್‌ಕ್ರಿಪ್ಶನ್, ಪ್ರತಿ ಪಾವತಿಯಲ್ಲಿ AI ವಂಚನೆ ಪತ್ತೆ.','mr-IN':'OTP पडताळणी, 256-बिट एन्क्रिप्शन, प्रत्येक पेमेंटवर AI फसवणूक शोधणे.','gu-IN':'OTP सत्यापन, 256-बिट एन्क्रिप्शन, हर भुगतान पर AI धोखाधड़ी पहचान।','pa-IN':'OTP ਤਸਦੀਕ, 256-ਬਿੱਟ ਐਨਕ੍ਰਿਪਸ਼ਨ, ਹਰ ਭੁਗਤਾਨ ਉੱਤੇ AI ਧੋਖਾਧੜੀ ਖੋਜ।','or-IN':'OTP ଯାଞ୍ଚ, 256-ବିଟ ଏନ୍‌କ୍ରିପ୍ସନ, ପ୍ରତ୍ୟେକ ଭୁଗତାନରେ AI ଠଗ ଚିହ୍ନଟ।','ur-IN':'OTP تصدیق، 256-بٹ انکرپشن، ہر ادائیگی پر AI دھوکہ دہی کا پتہ۔'},
    'feat4.title':       {'en-IN':'Works on Low Internet','hi-IN':'कम इंटरनेट पर काम करता है','bn-IN':'কম ইন্টারনেটে কাজ করে','ta-IN':'குறைந்த இணையத்திலும் செயல்படுகிறது','te-IN':'తక్కువ ఇంటర్నెట్‌లో పని చేస్తుంది','ml-IN':'കുറഞ്ഞ ഇന്റർനെറ്റിലും പ്രവർത്തിക്കുന്നു','kn-IN':'ಕಡಿಮೆ ಇಂಟರ್ನೆಟ್‌ನಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತದೆ','mr-IN':'कमी इंटरनेटवर काम करते','gu-IN':'कम इंटरनेट पर काम करता है','pa-IN':'ਘੱਟ ਇੰਟਰਨੈੱਟ ਤੇ ਕੰਮ ਕਰਦਾ ਹੈ','or-IN':'କମ ଇଣ୍ଟରନେଟରେ କାର୍ଯ୍ୟ କରେ','ur-IN':'کم انٹرنیٹ پر کام کرتا ہے'},
    'feat4.desc':        {'en-IN':'Saves payments offline automatically and syncs when you reconnect. No lost transactions, even on 2G.','hi-IN':'भुगतान ऑफलाइन स्वचालित रूप से सहेजता है। 2G पर भी कोई खोया हुआ लेन-देन नहीं।','bn-IN':'পেমেন্ট স্বয়ংক্রিয়ভাবে অফলাইনে সংরক্ষণ করে। 2G-তেও কোনো হারানো লেনদেন নেই।','ta-IN':'கட்டணங்களை தானாகவே ஆஃப்லைனில் சேமிக்கிறது. 2G இலும் பரிவர்த்தனைகள் இழக்கப்படாது.','te-IN':'చెల్లింపులను స్వయంచాలకంగా ఆఫ్‌లైన్‌లో సేవ్ చేస్తుంది. 2G లోనూ లావాదేవీలు పోవు.','ml-IN':'ഓഫ്‌ലൈനിൽ സ്വയം സേവ് ചെയ്ത് സിങ്ക് ചെയ്യുന്നു. 2G ലും ഇടപാടുകൾ നഷ്ടപ്പെടില്ല.','kn-IN':'ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಉಳಿಸುತ್ತದೆ. 2G ನಲ್ಲಿಯೂ ವ್ಯವಹಾರ ಕಳೆದುಹೋಗದು.','mr-IN':'पेमेंट आपोआप ऑफलाइन सेव्ह करते. 2G वरही कोणताही व्यवहार गमावला जात नाही.','gu-IN':'ऑफलाइन स्वचालित रूप से सहेजता है। 2G पर भी कोई लेनदेन नहीं खोता।','pa-IN':'ਆਫਲਾਈਨ ਸੁਰੱਖਿਅਤ ਕਰਦਾ ਹੈ। 2G ਤੇ ਵੀ ਕੋਈ ਲੈਣ-ਦੇਣ ਨਹੀਂ ਗੁਆਉਂਦਾ।','or-IN':'ଅଫଲାଇନ୍‌ରେ ସ୍ୱୟଂ ସଞ୍ଚୟ ହୁଏ। 2G ରେ ମଧ୍ୟ ଲେଣଦେଣ ହଜ ନ ହୁଏ।','ur-IN':'آف لائن خود بخود محفوظ ہوتا ہے۔ 2G پر بھی کوئی لین دین ضائع نہیں ہوتا۔'},

    // How it works
    'how.chip':          {'en-IN':'Simple Steps','hi-IN':'आसान कदम','bn-IN':'সহজ ধাপ','ta-IN':'எளிய படிகள்','te-IN':'సులభ దశలు','ml-IN':'ലളിതമായ ഘട്ടങ്ങൾ','kn-IN':'ಸರಳ ಹಂತಗಳು','mr-IN':'सोपे चरण','gu-IN':'सरल कदम','pa-IN':'ਆਸਾਨ ਕਦਮ','or-IN':'ସରଳ ପଦକ୍ଷେପ','ur-IN':'آسان مراحل'},
    'how.h2':            {'en-IN':'Pay Anyone in 3 Easy Steps','hi-IN':'3 आसान चरणों में किसी को भी पैसे भेजें','bn-IN':'3টি সহজ ধাপে যে কাউকে পাঠান','ta-IN':'3 எளிய படிகளில் யாருக்கும் பணம் அனுப்புங்கள்','te-IN':'3 సులభ దశల్లో ఎవరికైనా చెల్లించండి','ml-IN':'3 ലളിതമായ ഘട്ടങ്ങളിൽ ആർക്കും അടയ്ക്കൂ','kn-IN':'3 ಸರಳ ಹಂತಗಳಲ್ಲಿ ಯಾರಿಗಾದರೂ ಪಾವತಿಸಿ','mr-IN':'3 सोप्या चरणांमध्ये कोणालाही पैसे द्या','gu-IN':'3 सरल चरणों में किसी को भी भुगतान करें','pa-IN':'3 ਆਸਾਨ ਕਦਮਾਂ ਵਿੱਚ ਕਿਸੇ ਨੂੰ ਵੀ ਭੁਗਤਾਨ ਕਰੋ','or-IN':'3 ସହଜ ପଦକ୍ଷେପରେ ଯେ କାହାକୁ ଭୁଗତାନ','ur-IN':'3 آسان مراحل میں کسی کو بھی ادائیگی کریں'},
    'how.sub':           {'en-IN':'No bank visits. No paperwork. From speaking a command to money delivered – under 10 seconds.','hi-IN':'कोई बैंक विजिट नहीं। कोई कागजी कार्रवाई नहीं। 10 सेकंड से कम।','bn-IN':'কোনো ব্যাংক ভিজিট নেই। কোনো কাগজপত্র নেই। 10 সেকেন্ডের মধ্যে।','ta-IN':'வங்கி வருகை இல்லை. காகித வேலை இல்லை. 10 வினாடிகளுக்கும் குறைவாக.','te-IN':'బ్యాంకు సందర్శనలు లేవు. కాగితపు పని లేదు. 10 సెకన్లలోపు.','ml-IN':'ബാങ്ക് സന്ദർശനം ഇല്ല. കടലാസ് ജോലി ഇല്ല. 10 സെക്കൻഡിൽ.','kn-IN':'ಬ್ಯಾಂಕ್ ಭೇಟಿ ಇಲ್ಲ. ಕಾಗದಪತ್ರ ಕೆಲಸ ಇಲ್ಲ. 10 ಸೆಕೆಂಡ್‌ಗಿಂತ ಕಡಿಮೆ.','mr-IN':'बँकेला भेट नाही. कागदपत्रे नाहीत. 10 सेकंदांपेक्षा कमी.','gu-IN':'बैंक जाने की जरूरत नहीं। 10 सेकंड से कम।','pa-IN':'ਬੈਂਕ ਜਾਣ ਦੀ ਲੋੜ ਨਹੀਂ। 10 ਸਕਿੰਟਾਂ ਤੋਂ ਘੱਟ।','or-IN':'ବ୍ୟାଙ୍କ ପରିଦର୍ଶନ ନାହିଁ। 10 ସେକେଣ୍ଡ ମଧ୍ୟରେ।','ur-IN':'کوئی بینک وزٹ نہیں۔ 10 سیکنڈ سے کم۔'},
    'step1.title':       {'en-IN':'Login with Mobile','hi-IN':'मोबाइल से लॉगिन करें','bn-IN':'মোবাইল দিয়ে লগইন করুন','ta-IN':'மொபைலில் உள்நுழைய','te-IN':'మొబైల్‌తో లాగిన్ చేయండి','ml-IN':'മൊബൈൽ ഉപയോഗിച്ച് ലോഗിൻ','kn-IN':'ಮೊಬೈಲ್‌ನಿಂದ ಲಾಗಿನ್ ಮಾಡಿ','mr-IN':'मोबाईलने लॉगिन करा','gu-IN':'मोबाइल से लॉगिन करें','pa-IN':'ਮੋਬਾਈਲ ਨਾਲ ਲੌਗਇਨ ਕਰੋ','or-IN':'ମୋବାଇଲ ଦ୍ୱାରା ଲଗଇନ','ur-IN':'موبائل سے لاگ ان کریں'},
    'step1.desc':        {'en-IN':'Enter your mobile number or email. Verify with a one-time OTP. No password to remember.','hi-IN':'अपना मोबाइल नंबर या ईमेल दर्ज करें। OTP से सत्यापित करें। कोई पासवर्ड याद नहीं।','bn-IN':'আপনার মোবাইল নম্বর বা ইমেইল দিন। OTP দিয়ে যাচাই করুন। কোনো পাসওয়ার্ড মনে রাখতে হবে না।','ta-IN':'உங்கள் மொபைல் எண் உள்ளிடுங்கள். OTP மூலம் சரிபாருங்கள். கடவுச்சொல் தேவையில்லை.','te-IN':'మీ మొబైల్ నంబర్ నమోదు చేయండి. OTP తో ధృవీకరించండి. పాస్‌వర్డ్ అవసరం లేదు.','ml-IN':'മൊബൈൽ നമ്പർ നൽകൂ. OTP ഉപയോഗിച്ച് പരിശോധിക്കൂ. പാസ്‌വേഡ് ഓർക്കേണ്ടതില്ല.','kn-IN':'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ. OTP ನಿಂದ ಪರಿಶೀಲಿಸಿ. ಪಾಸ್‌ವರ್ಡ್ ನೆನಪಿಡುವ ಅಗತ್ಯವಿಲ್ಲ.','mr-IN':'मोबाईल नंबर किंवा ईमेल टाका. OTP ने पडताळणी करा. पासवर्ड लक्षात ठेवण्याची गरज नाही.','gu-IN':'मोबाइल नंबर दर्ज करें। OTP से सत्यापित करें। कोई पासवर्ड याद नहीं।','pa-IN':'ਮੋਬਾਈਲ ਨੰਬਰ ਦਾਖਲ ਕਰੋ। OTP ਨਾਲ ਤਸਦੀਕ ਕਰੋ। ਕੋਈ ਪਾਸਵਰਡ ਯਾਦ ਨਹੀਂ।','or-IN':'ମୋବାଇଲ ନମ୍ବର ଦିଅନ୍ତୁ। OTP ଦ୍ୱାରା ଯାଞ୍ଚ କରନ୍ତୁ।','ur-IN':'موبائل نمبر درج کریں۔ OTP سے تصدیق کریں۔ کوئی پاسورڈ یاد نہیں۔'},
    'step2.title':       {'en-IN':'Speak Your Command','hi-IN':'अपना आदेश बोलें','bn-IN':'আপনার কমান্ড বলুন','ta-IN':'உங்கள் கட்டளையை சொல்லுங்கள்','te-IN':'మీ ఆదేశం మాట్లాడండి','ml-IN':'നിങ്ങളുടെ കമാൻഡ് പറയൂ','kn-IN':'ನಿಮ್ಮ ಆದೇಶ ಹೇಳಿ','mr-IN':'तुमची आज्ञा सांगा','gu-IN':'अपना आदेश बोलें','pa-IN':'ਆਪਣਾ ਹੁਕਮ ਬੋਲੋ','or-IN':'ଆପଣଙ୍କ ଆଦେଶ କୁହନ୍ତୁ','ur-IN':'اپنا حکم بولیں'},
    'step2.desc':        {'en-IN':'Say "Send 500 to Priya" in your language. VaaniPay listens, understands, and fills in all details.','hi-IN':'अपनी भाषा में "प्रिया को 500 भेजो" कहें। VaaniPay सुनता और सभी विवरण भरता है।','bn-IN':'আপনার ভাষায় "প্রিয়াকে 500 পাঠাও" বলুন। VaaniPay শোনে ও সমস্ত বিবরণ পূরণ করে।','ta-IN':'உங்கள் மொழியில் "பிரியாவுக்கு 500 அனுப்பு" என்று சொல்லுங்கள்.','te-IN':'మీ భాషలో "ప్రియకు 500 పంపు" అని చెప్పండి. VaaniPay వింటుంది.','ml-IN':'നിങ്ങളുടെ ഭാഷയിൽ "പ്രിയക്ക് 500 അയക്കൂ" എന്ന് പറയൂ.','kn-IN':'ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ "ಪ್ರಿಯಾಗೆ 500 ಕಳುಹಿಸು" ಎಂದು ಹೇಳಿ.','mr-IN':'तुमच्या भाषेत "प्रियाला 500 पाठव" म्हणा.','gu-IN':'"प्रिया को 500 भेजो" कहें। VaaniPay सुनता और समझता है।','pa-IN':'"ਪ੍ਰਿਆ ਨੂੰ 500 ਭੇਜੋ" ਕਹੋ। VaaniPay ਸੁਣਦਾ ਅਤੇ ਵੇਰਵੇ ਭਰਦਾ ਹੈ।','or-IN':'"ପ୍ରିୟାକୁ 500 ପଠାଅ" କୁହନ୍ତୁ। VaaniPay ଶୁଣେ ଏବଂ ବୁଝେ।','ur-IN':'"پریا کو 500 بھیجو" کہیں۔ VaaniPay سنتا اور سمجھتا ہے۔'},
    'step3.title':       {'en-IN':'Confirm & Send','hi-IN':'पुष्टि करें और भेजें','bn-IN':'নিশ্চিত করুন এবং পাঠান','ta-IN':'உறுதிப்படுத்தி அனுப்புங்கள்','te-IN':'నిర్ధారించి పంపండి','ml-IN':'സ്ഥിരീകരിക്കൂ & അയക്കൂ','kn-IN':'ದೃಢೀಕರಿಸಿ ಮತ್ತು ಕಳುಹಿಸಿ','mr-IN':'पुष्टी करा आणि पाठवा','gu-IN':'पुष्टि करें और भेजें','pa-IN':'ਪੁਸ਼ਟੀ ਕਰੋ ਅਤੇ ਭੇਜੋ','or-IN':'ନିଶ୍ଚିତ ଏବଂ ପଠାନ୍ତୁ','ur-IN':'تصدیق کریں اور بھیجیں'},
    'step3.desc':        {'en-IN':'Review the details, tap Confirm, and money reaches the recipient instantly. SMS receipt sent automatically.','hi-IN':'विवरण की समीक्षा करें, Confirm टैप करें, पैसा तुरंत पहुंच जाता है। SMS रसीद स्वचालित रूप से भेजी जाती है।','bn-IN':'বিবরণ পর্যালোচনা করুন, Confirm ট্যাপ করুন, অর্থ তাৎক্ষণিকভাবে পৌঁছায়।','ta-IN':'விவரங்களை மதிப்பாய்வு செய்யுங்கள், Confirm தட்டவும், பணம் உடனடியாக சேரும்.','te-IN':'వివరాలను సమీక్షించండి, Confirm నొక్కండి, డబ్బు వెంటనే చేరుతుంది.','ml-IN':'വിവരങ്ങൾ പരിശോധിക്കൂ, Confirm ടാപ്പ് ചെയ്യൂ, പണം ഉടൻ ലഭ്യകർക്ക് ലഭിക്കും.','kn-IN':'ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ, Confirm ಟ್ಯಾಪ್ ಮಾಡಿ, ಹಣ ಕ್ಷಣಾರ್ಧದಲ್ಲಿ ತಲುಪುತ್ತದೆ.','mr-IN':'तपशील तपासा, Confirm टॅप करा, पैसे तात्काळ पोहोचतात.','gu-IN':'विवरण की समीक्षा करें, Confirm टैप करें, पैसा तुरंत पहुंचता है।','pa-IN':'ਵੇਰਵੇ ਦੀ ਸਮੀਖਿਆ ਕਰੋ, Confirm ਟੈਪ ਕਰੋ, ਪੈਸੇ ਤੁਰੰਤ ਪਹੁੰਚਦੇ ਹਨ।','or-IN':'ବିବରଣୀ ସମୀକ୍ଷା କରନ୍ତୁ, Confirm ଟ୍ୟାପ କରନ୍ତୁ, ଟଙ୍କା ତୁରନ୍ତ ପହଞ୍ôiବ।','ur-IN':'تفصیلات دیکھیں، Confirm ٹیپ کریں، پیسے فوراً پہنچ جاتے ہیں۔'},

    // Analytics
    'analy.chip':        {'en-IN':'Transaction Analytics','hi-IN':'लेन-देन विश्लेषण','bn-IN':'লেনদেন বিশ্লেষণ','ta-IN':'பரிவர்த்தனை பகுப்பாய்வு','te-IN':'లావాదేవీ విశ్లేషణలు','ml-IN':'ഇടപാട് അനലിറ്റിക്സ്','kn-IN':'ವ್ಯವಹಾರ ವಿಶ್ಲೇಷಣೆ','mr-IN':'व्यवहार विश्लेषण','gu-IN':'लेनदेन विश्लेषण','pa-IN':'ਲੈਣ-ਦੇਣ ਵਿਸ਼ਲੇਸ਼ਣ','or-IN':'ଲେଣଦେଣ ବିଶ୍ଳେଷଣ','ur-IN':'لین دین تجزیات'},
    'analy.h2':          {'en-IN':'Your Payment History at a Glance','hi-IN':'एक नज़र में आपका भुगतान इतिहास','bn-IN':'এক নজরে আপনার পেমেন্ট ইতিহাস','ta-IN':'உங்கள் கட்டண வரலாறு ஒரே பார்வையில்','te-IN':'మీ చెల్లింపు చరిత్ర ఒక చూపులో','ml-IN':'ഒറ്റ നോട്ടത്തിൽ നിങ്ങളുടെ പേമെന്റ് ചരിത്രം','kn-IN':'ಒಂದು ನೋಟದಲ್ಲಿ ನಿಮ್ಮ ಪಾವತಿ ಇತಿಹಾಸ','mr-IN':'एका दृष्टिक्षेपात तुमचा पेमेंट इतिहास','gu-IN':'एक नज़र में आपका भुगतान इतिहास','pa-IN':'ਇੱਕ ਨਜ਼ਰ ਵਿੱਚ ਤੁਹਾਡਾ ਭੁਗਤਾਨ ਇਤਿਹਾਸ','or-IN':'ଏକ ଦୃଷ୍ଟিରେ ଆପଣଙ୍କ ଭୁଗତାନ ଇତିହାସ','ur-IN':'ایک نظر میں آپ کی ادائیگی کی تاریخ'},
    'analy.sub':         {'en-IN':'Track every rupee — where it went, when it moved, and how your spending patterns look over time.','hi-IN':'हर रुपया ट्रैक करें — वह कहाँ गया, कब गया।','bn-IN':'প্রতিটি টাকা ট্র্যাক করুন — এটি কোথায় গেছে, কখন গেছে।','ta-IN':'ஒவ்வொரு ரூபாயையும் கண்காணியுங்கள்.','te-IN':'ప్రతి రూపాయి ట్రాక్ చేయండి.','ml-IN':'ഓരോ രൂപയും ട്രാക്ക് ചെയ്യൂ.','kn-IN':'ಪ್ರತಿ ರೂಪಾಯಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.','mr-IN':'प्रत्येक रुपया ट्रॅक करा.','gu-IN':'हर रुपया ट्रैक करें।','pa-IN':'ਹਰ ਰੁਪਏ ਨੂੰ ਟ੍ਰੈਕ ਕਰੋ।','or-IN':'ପ୍ରତ୍ୟେକ ଟଙ୍କା ଟ୍ରାକ କରନ୍ତୁ।','ur-IN':'ہر روپے کو ٹریک کریں۔'},
    'analy.sent.lbl':    {'en-IN':'Total Sent (This Month)','hi-IN':'कुल भेजा (इस महीने)','bn-IN':'মোট পাঠানো (এই মাসে)','ta-IN':'மொத்த அனுப்பியது (இம்மாதம்)','te-IN':'మొత్తం పంపబడింది (ఈ నెల)','ml-IN':'ആകെ അയച്ചത് (ഈ മാസം)','kn-IN':'ಒಟ್ಟು ಕಳುಹಿಸಲಾಗಿದೆ (ಈ ತಿಂಗಳು)','mr-IN':'एकूण पाठवले (या महिन्यात)','gu-IN':'कुल भेजा (इस महीने)','pa-IN':'ਕੁੱਲ ਭੇਜਿਆ (ਇਸ ਮਹੀਨੇ)','or-IN':'ମୋଟ ପଠାଯାଇଛି (ଏହି ମାସ)','ur-IN':'کل بھیجا (اس مہینے)'},
    'analy.recv.lbl':    {'en-IN':'Total Received (This Month)','hi-IN':'कुल प्राप्त (इस महीने)','bn-IN':'মোট প্রাপ্ত (এই মাসে)','ta-IN':'மொத்த பெற்றது (இம்மாதம்)','te-IN':'మొత్తం స్వీకరించబడింది (ఈ నెల)','ml-IN':'ആകെ ലഭിച്ചത് (ഈ മാസം)','kn-IN':'ಒಟ್ಟು ಸ್ವೀಕರಿಸಲಾಗಿದೆ (ಈ ತಿಂಗಳು)','mr-IN':'एकूण प्राप्त (या महिन्यात)','gu-IN':'कुल प्राप्त (इस महीने)','pa-IN':'ਕੁੱਲ ਪ੍ਰਾਪਤ (ਇਸ ਮਹੀਨੇ)','or-IN':'ମୋଟ ପ୍ରାପ୍ତ (ଏହି ମାସ)','ur-IN':'کل موصول (اس مہینے)'},
    'analy.count.lbl':   {'en-IN':'Transactions This Month','hi-IN':'इस महीने के लेन-देन','bn-IN':'এই মাসের লেনদেন','ta-IN':'இம்மாத பரிவர்த்தனைகள்','te-IN':'ఈ నెల లావాదేవీలు','ml-IN':'ഈ മാസത്തെ ഇടപാടുകൾ','kn-IN':'ಈ ತಿಂಗಳ ವ್ಯವಹಾರಗಳು','mr-IN':'या महिन्यातील व्यवहार','gu-IN':'इस महीने के लेनदेन','pa-IN':'ਇਸ ਮਹੀਨੇ ਦੇ ਲੈਣ-ਦੇਣ','or-IN':'ଏହି ମାସ ଲେଣଦେଣ','ur-IN':'اس مہینے کے لین دین'},
    'analy.filter.all':  {'en-IN':'All','hi-IN':'सभी','bn-IN':'সব','ta-IN':'அனைத்தும்','te-IN':'అన్నీ','ml-IN':'എല്ലാം','kn-IN':'ಎಲ್ಲಾ','mr-IN':'सर्व','gu-IN':'सभी','pa-IN':'ਸਾਰੇ','or-IN':'ସମସ୍ତ','ur-IN':'سب'},
    'analy.filter.sent': {'en-IN':'Sent','hi-IN':'भेजा','bn-IN':'পাঠানো','ta-IN':'அனுப்பியது','te-IN':'పంపబడింది','ml-IN':'അയച്ചത്','kn-IN':'ಕಳುಹಿಸಿದ','mr-IN':'पाठवले','gu-IN':'भेजा','pa-IN':'ਭੇਜਿਆ','or-IN':'ପଠାଯାଇଛି','ur-IN':'بھیجا'},
    'analy.filter.recv': {'en-IN':'Received','hi-IN':'प्राप्त','bn-IN':'প্রাপ্ত','ta-IN':'பெற்றது','te-IN':'స్వీకరించబడింది','ml-IN':'ലഭിച്ചത്','kn-IN':'ಸ್ವೀಕರಿಸಿದ','mr-IN':'प्राप्त','gu-IN':'प्राप्त','pa-IN':'ਪ੍ਰਾਪਤ','or-IN':'ପ୍ରାପ୍ତ','ur-IN':'موصول'},
    'analy.tx.title':    {'en-IN':'Transaction History','hi-IN':'लेन-देन इतिहास','bn-IN':'লেনদেন ইতিহাস','ta-IN':'பரிவர்த்தனை வரலாறு','te-IN':'లావాదేవీ చరిత్ర','ml-IN':'ഇടപാട് ചരിത്രം','kn-IN':'ವ್ಯವಹಾರ ಇತಿಹಾಸ','mr-IN':'व्यवहार इतिहास','gu-IN':'लेनदेन इतिहास','pa-IN':'ਲੈਣ-ਦੇਣ ਇਤਿਹਾਸ','or-IN':'ଲେଣଦେଣ ଇତିହାସ','ur-IN':'لین دین کی تاریخ'},
    'analy.view.all':    {'en-IN':'View all transactions →','hi-IN':'सभी लेन-देन देखें →','bn-IN':'সব লেনদেন দেখুন →','ta-IN':'அனைத்து பரிவர்த்தனைகளையும் காண →','te-IN':'అన్ని లావాదేవీలు చూడండి →','ml-IN':'എല്ലാ ഇടപാടുകളും കാണൂ →','kn-IN':'ಎಲ್ಲಾ ವ್ಯವಹಾರಗಳನ್ನು ನೋಡಿ →','mr-IN':'सर्व व्यवहार पहा →','gu-IN':'सभी लेनदेन देखें →','pa-IN':'ਸਾਰੇ ਲੈਣ-ਦੇਣ ਦੇਖੋ →','or-IN':'ସମସ୍ତ ଲେଣଦେଣ ଦେଖନ୍ତୁ →','ur-IN':'تمام لین دین دیکھیں →'},
    'analy.chart.title': {'en-IN':'Weekly Spend — March 2025','hi-IN':'साप्ताहिक खर्च — मार्च 2025','bn-IN':'সাপ্তাহিক ব্যয় — মার্চ 2025','ta-IN':'வாராந்திர செலவு — மார்ச் 2025','te-IN':'వారపు ఖర్చు — మార్చి 2025','ml-IN':'ആഴ്ചയിലെ ചെലവ് — മാർച്ച് 2025','kn-IN':'ವಾರದ ಖರ್ಚು — ಮಾರ್ಚ್ 2025','mr-IN':'साप्ताहिक खर्च — मार्च 2025','gu-IN':'साप्ताहिक खर्च — मार्च 2025','pa-IN':'ਹਫ਼ਤਾਵਾਰੀ ਖਰਚ — ਮਾਰਚ 2025','or-IN':'ସାପ୍ତାହିକ ଖର୍ଚ — ମାର୍ଚ 2025','ur-IN':'ہفتہ وار خرچ — مارچ 2025'},

    // Security
    'sec.chip':          {'en-IN':'Trust & Safety','hi-IN':'विश्वास और सुरक्षा','bn-IN':'বিশ্বাস ও নিরাপত্তা','ta-IN':'நம்பிக்கை & பாதுகாப்பு','te-IN':'విశ్వాసం & భద్రత','ml-IN':'വിശ്വാസം & സുരക്ഷ','kn-IN':'ವಿಶ್ವಾಸ & ಭದ್ರತೆ','mr-IN':'विश्वास आणि सुरक्षा','gu-IN':'विश्वास और सुरक्षा','pa-IN':'ਭਰੋਸਾ ਅਤੇ ਸੁਰੱਖਿਆ','or-IN':'ବିଶ୍ୱାସ ଏବଂ ସୁରକ୍ଷା','ur-IN':'اعتماد اور سلامتی'},
    'sec.h':             {'en-IN':'Your Money is Always Safe','hi-IN':'आपका पैसा हमेशा सुरक्षित है','bn-IN':'আপনার অর্থ সবসময় নিরাপদ','ta-IN':'உங்கள் பணம் எப்போதும் பாதுகாப்பாக உள்ளது','te-IN':'మీ డబ్బు ఎప్పుడూ సురక్షితం','ml-IN':'നിങ്ങളുടെ പണം എപ്പോഴും സുരക്ഷിതം','kn-IN':'ನಿಮ್ಮ ಹಣ ಯಾವಾಗಲೂ ಸುರಕ್ಷಿತ','mr-IN':'तुमचे पैसे नेहमी सुरक्षित असतात','gu-IN':'आपका पैसा हमेशा सुरक्षित है','pa-IN':'ਤੁਹਾਡਾ ਪੈਸਾ ਹਮੇਸ਼ਾ ਸੁਰੱਖਿਅਤ ਹੈ','or-IN':'ଆପଣଙ୍କ ଟଙ୍କା ସର୍ବଦା ସୁରକ୍ଷିତ','ur-IN':'آپ کی رقم ہمیشہ محفوظ ہے'},
    'sec.sub':           {'en-IN':'Built with the same security standards used by India\'s top banks – protecting every transaction, every time.','hi-IN':'भारत के शीर्ष बैंकों जैसे सुरक्षा मानकों के साथ बनाया गया।','bn-IN':'ভারতের শীর্ষ ব্যাংকগুলির মতো একই নিরাপত্তা মানদণ্ড দিয়ে তৈরি।','ta-IN':'இந்தியாவின் சிறந்த வங்கிகள் பயன்படுத்தும் அதே பாதுகாப்பு தரங்களுடன்.','te-IN':'భారతదేశంలోని అగ్రశ్రేణి బ్యాంకులు ఉపయోగించే అదే భద్రతా ప్రమాణాలతో.','ml-IN':'ഇന്ത്യയിലെ ഒന്നാംനിര ബാങ്കുകൾ ഉപയോഗിക്കുന്ന അതേ സുരക്ഷാ നിലവാരത്തോടെ.','kn-IN':'ಭಾರತದ ಪ್ರಮುಖ ಬ್ಯಾಂಕ್‌ಗಳು ಬಳಸುವ ಅದೇ ಭದ್ರತಾ ಮಾನದಂಡಗಳೊಂದಿಗೆ.','mr-IN':'भारतातील आघाडीच्या बँकांप्रमाणेच सुरक्षा मानकांसह.','gu-IN':'भारत के शीर्ष बैंकों जैसे सुरक्षा मानकों के साथ।','pa-IN':'ਭਾਰਤ ਦੇ ਚੋਟੀ ਦੇ ਬੈਂਕਾਂ ਵਰਗੇ ਸੁਰੱਖਿਆ ਮਿਆਰਾਂ ਨਾਲ।','or-IN':'ଭାରତର ଶ୍ରେଷ୍ଠ ବ୍ୟାଙ୍କ ସମ ସୁରକ୍ଷା ମାନ ସହ।','ur-IN':'ہندوستان کے ٹاپ بینکوں جیسے سیکیورٹی معیارات کے ساتھ۔'},
    'sec1.t':            {'en-IN':'OTP Verification','hi-IN':'OTP सत्यापन','bn-IN':'OTP যাচাইকরণ','ta-IN':'OTP சரிபார்ப்பு','te-IN':'OTP ధృవీకరణ','ml-IN':'OTP പരിശോധന','kn-IN':'OTP ಪರಿಶೀಲನೆ','mr-IN':'OTP पडताळणी','gu-IN':'OTP सत्यापन','pa-IN':'OTP ਤਸਦੀਕ','or-IN':'OTP ଯାଞ୍ଚ','ur-IN':'OTP تصدیق'},
    'sec1.d':            {'en-IN':'Every login and transaction verified with a one-time password sent to your registered mobile number.','hi-IN':'प्रत्येक लॉगिन और लेन-देन OTP से सत्यापित।','bn-IN':'প্রতিটি লগইন এবং লেনদেন OTP দ্বারা যাচাই।','ta-IN':'ஒவ்வொரு உள்நுழைவும் OTP மூலம் சரிபார்க்கப்படுகிறது.','te-IN':'ప్రతి లాగిన్ మరియు లావాదేవీ OTP తో ధృవీకరించబడుతుంది.','ml-IN':'ഓരോ ലോഗിനും OTP ഉപയോഗിച്ച് പരിശോധിക്കപ്പെടുന്നു.','kn-IN':'ಪ್ರತಿ ಲಾಗಿನ್ ಮತ್ತು ವ್ಯವಹಾರ OTP ನಿಂದ ಪರಿಶೀಲಿಸಲ್ಪಡುತ್ತದೆ.','mr-IN':'प्रत्येक लॉगिन आणि व्यवहार OTP ने पडताळला जातो.','gu-IN':'हर लॉगिन और लेनदेन OTP से सत्यापित।','pa-IN':'ਹਰ ਲੌਗਇਨ ਅਤੇ ਲੈਣ-ਦੇਣ OTP ਨਾਲ ਤਸਦੀਕ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।','or-IN':'ପ୍ରତ୍ୟେକ ଲଗଇନ ଏବଂ ଲେଣଦେଣ OTP ଦ୍ୱାରା ଯାଞ୍ଚ।','ur-IN':'ہر لاگ ان اور لین دین OTP سے تصدیق۔'},
    'sec2.t':            {'en-IN':'AI Fraud Detection','hi-IN':'AI धोखाधड़ी का पता','bn-IN':'AI জালিয়াতি সনাক্তকরণ','ta-IN':'AI மோசடி கண்டறிதல்','te-IN':'AI మోసం గుర్తింపు','ml-IN':'AI തട്ടിപ്പ് കണ്ടെത്തൽ','kn-IN':'AI ವಂಚನೆ ಪತ್ತೆ','mr-IN':'AI फसवणूक शोधणे','gu-IN':'AI धोखाधड़ी पहचान','pa-IN':'AI ਧੋਖਾਧੜੀ ਖੋਜ','or-IN':'AI ଠଗ ଚିହ୍ନଟ','ur-IN':'AI دھوکہ دہی کا پتہ'},
    'sec2.d':            {'en-IN':'Our AI monitors every transaction in real-time and blocks suspicious activity before it touches your account.','hi-IN':'हमारा AI हर लेन-देन को रियल-टाइम में मॉनिटर करता है।','bn-IN':'আমাদের AI প্রতিটি লেনদেন রিয়েল-টাইমে পর্যবেক্ষণ করে।','ta-IN':'எங்கள் AI ஒவ்வொரு பரிவர்த்தனையையும் நிகழ்நேரத்தில் கண்காணிக்கிறது.','te-IN':'మా AI ప్రతి లావాదేవీని రియల్-టైమ్‌లో పర్యవేక్షిస్తుంది.','ml-IN':'ഞങ്ങളുടെ AI ഓരോ ഇടപാടും തത്സമയം നിരീക്ഷിക്കുന്നു.','kn-IN':'ನಮ್ಮ AI ಪ್ರತಿ ವ್ಯವಹಾರವನ್ನು ರಿಯಲ್-ಟೈಮ್‌ನಲ್ಲಿ ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡುತ್ತದೆ.','mr-IN':'आमचा AI प्रत्येक व्यवहार रिअल-टाइममध्ये निरीक्षण करतो.','gu-IN':'हमारा AI हर लेनदेन को रियल-टाइम में मॉनिटर करता है।','pa-IN':'ਸਾਡਾ AI ਹਰ ਲੈਣ-ਦੇਣ ਨੂੰ ਰੀਅਲ-ਟਾਈਮ ਵਿੱਚ ਨਿਗਰਾਨੀ ਕਰਦਾ ਹੈ।','or-IN':'ଆମ AI ପ୍ରତ୍ୟେକ ଲେଣଦେଣ ରିଅଲ-ଟାଇମ୍‌ରେ ନଜର ରଖେ।','ur-IN':'ہمارا AI ہر لین دین کو ریل ٹائم میں مانیٹر کرتا ہے۔'},
    'sec3.t':            {'en-IN':'256-bit Encryption','hi-IN':'256-बिट एन्क्रिप्शन','bn-IN':'256-বিট এনক্রিপশন','ta-IN':'256-பிட் குறியாக்கம்','te-IN':'256-బిట్ ఎన్‌క్రిప్షన్','ml-IN':'256-ബിറ്റ് എൻക്രിപ്ഷൻ','kn-IN':'256-ಬಿಟ್ ಎನ್‌ಕ್ರಿಪ್ಶನ್','mr-IN':'256-बिट एन्क्रिप्शन','gu-IN':'256-बिट एन्क्रिप्शन','pa-IN':'256-ਬਿੱਟ ਐਨਕ੍ਰਿਪਸ਼ਨ','or-IN':'256-ବିଟ ଏନ୍‌କ୍ରିପ୍ସନ','ur-IN':'256-بٹ انکرپشن'},
    'sec3.d':            {'en-IN':'Bank-grade AES-256 encryption secures all data in transit and at rest – same standard as RBI-regulated banks.','hi-IN':'बैंक-ग्रेड AES-256 एन्क्रिप्शन – RBI-विनियमित बैंकों जैसा ही मानक।','bn-IN':'ব্যাংক-গ্রেড AES-256 এনক্রিপশন – RBI-নিয়ন্ত্রিত ব্যাংকের মতো একই মানদণ্ড।','ta-IN':'வங்கி-தர AES-256 குறியாக்கம் – RBI-ஒழுங்குபடுத்தப்பட்ட வங்கிகளின் அதே தரம்.','te-IN':'బ్యాంక్-గ్రేడ్ AES-256 ఎన్‌క్రిప్షన్ – RBI-నియంత్రిత బ్యాంకుల అదే ప్రమాణం.','ml-IN':'ബാങ്ക്-ഗ്രേഡ് AES-256 എൻക്രിപ്ഷൻ – RBI-നിയന്ത്രിത ബാങ്കുകളുടെ അതേ നിലവാരം.','kn-IN':'ಬ್ಯಾಂಕ್-ಗ್ರೇಡ್ AES-256 ಎನ್‌ಕ್ರಿಪ್ಶನ್ – RBI-ನಿಯಂತ್ರಿತ ಬ್ಯಾಂಕ್‌ಗಳ ಅದೇ ಮಾನದಂಡ.','mr-IN':'बँक-ग्रेड AES-256 एन्क्रिप्शन – RBI-नियमित बँकांसारखाच मानक.','gu-IN':'बैंक-ग्रेड AES-256 एन्क्रिप्शन – RBI-नियमित बैंकों जैसा मानक।','pa-IN':'ਬੈਂਕ-ਗ੍ਰੇਡ AES-256 ਐਨਕ੍ਰਿਪਸ਼ਨ – RBI-ਨਿਯੰਤ੍ਰਿਤ ਬੈਂਕਾਂ ਦਾ ਉਹੀ ਮਿਆਰ।','or-IN':'ବ୍ୟାଙ୍କ-ଗ୍ରେଡ AES-256 ଏନ୍‌କ୍ରିପ୍ସନ – RBI-ନିୟନ୍ତ୍ରିତ ବ୍ୟାଙ୍କ ସମ ମାନ।','ur-IN':'بینک-گریڈ AES-256 انکرپشن – RBI-ریگولیٹڈ بینکوں جیسا معیار۔'},

    // About
    'about.chip':        {'en-IN':'Our Story','hi-IN':'हमारी कहानी','bn-IN':'আমাদের গল্প','ta-IN':'எங்கள் கதை','te-IN':'మా కథ','ml-IN':'ഞങ്ങളുടെ കഥ','kn-IN':'ನಮ್ಮ ಕಥೆ','mr-IN':'आमची कथा','gu-IN':'हमारी कहानी','pa-IN':'ਸਾਡੀ ਕਹਾਣੀ','or-IN':'ଆମ କାହାଣୀ','ur-IN':'ہماری کہانی'},
    'about.h':           {'en-IN':'We Built VaaniPay Because India Deserves Better','hi-IN':'हमने VaaniPay बनाया क्योंकि भारत बेहतर का हकदार है','bn-IN':'আমরা VaaniPay তৈরি করেছি কারণ ভারত আরও ভালো পাওয়ার যোগ্য','ta-IN':'இந்தியா சிறந்ததை பெற தகுதியானது என்பதால் VaaniPay கட்டினோம்','te-IN':'భారతదేశం మెరుగైనదానికి అర్హమని VaaniPay నిర్మించాం','ml-IN':'ഇന്ത്യ ഇതിനേക്കാൾ മികച്ചതിന് അർഹമാണ് എന്നതിനാൽ VaaniPay നിർമ്മിച്ചു','kn-IN':'ಭಾರತ ಉತ್ತಮವಾದದ್ದನ್ನು ಪಡೆಯಲು ಅರ್ಹ ಎಂದು VaaniPay ನಿರ್ಮಿಸಿದ್ದೇವೆ','mr-IN':'आम्ही VaaniPay बनवला कारण भारत अधिक चांगल्याच्या लायक आहे','gu-IN':'हमने VaaniPay बनाया क्योंकि भारत बेहतर का हकदार है','pa-IN':'ਅਸੀਂ VaaniPay ਬਣਾਇਆ ਕਿਉਂਕਿ ਭਾਰਤ ਬਿਹਤਰ ਦਾ ਹੱਕਦਾਰ ਹੈ','or-IN':'ଆମେ VaaniPay ତିଆରି କଲୁ କାରଣ ଭାରତ ଭଲ ପ୍ରାପ୍ୟ','ur-IN':'ہم نے VaaniPay بنایا کیونکہ ہندوستان بہتر کا مستحق ہے'},
    'about.team.h':      {'en-IN':'Meet the Team Behind VaaniPay','hi-IN':'VaaniPay के पीछे की टीम से मिलें','bn-IN':'VaaniPay-এর পেছনের টিমের সাথে পরিচিত হন','ta-IN':'VaaniPay-க்கு பின்னால் உள்ள அணியை சந்தியுங்கள்','te-IN':'VaaniPay వెనుక ఉన్న బృందాన్ని కలవండి','ml-IN':'VaaniPay-ന് പിന്നിലെ ടീമിനെ കണ്ടുമുട്ടൂ','kn-IN':'VaaniPay ಹಿಂದಿನ ತಂಡವನ್ನು ಭೇಟಿ ಮಾಡಿ','mr-IN':'VaaniPay मागील टीमला भेटा','gu-IN':'VaaniPay के पीछे की टीम से मिलें','pa-IN':'VaaniPay ਦੇ ਪਿੱਛੇ ਟੀਮ ਨੂੰ ਮਿਲੋ','or-IN':'VaaniPay ପଛ ଟିମ ସହ ମିଳନ୍ତୁ','ur-IN':'VaaniPay کے پیچھے ٹیم سے ملیں'},

    // CTA
    'cta.chip':          {'en-IN':'Join Millions of Users','hi-IN':'लाखों उपयोगकर्ताओं से जुड़ें','bn-IN':'লক্ষ লক্ষ ব্যবহারকারীর সাথে যোগ দিন','ta-IN':'மில்லியன் பயனர்களுடன் சேருங்கள்','te-IN':'లక్షలాది వినియోగదారులతో చేరండి','ml-IN':'ദശലക്ഷക്കണക്കിന് ഉപയോക്താക്കളുടെ കൂടെ ചേരൂ','kn-IN':'ಲಕ್ಷಾಂತರ ಬಳಕೆದಾರರೊಂದಿಗೆ ಸೇರಿ','mr-IN':'लाखो वापरकर्त्यांमध्ये सामील व्हा','gu-IN':'लाखों उपयोगकर्ताओं से जुड़ें','pa-IN':'ਲੱਖਾਂ ਉਪਭੋਗਤਾਵਾਂ ਨਾਲ ਜੁੜੋ','or-IN':'ଲକ୍ଷ ଉପଭୋକ୍ତାଙ୍କ ସହ ଯୋଗ ଦିଅନ୍ତୁ','ur-IN':'لاکھوں صارفین کے ساتھ شامل ہوں'},
    'cta.h':             {'en-IN':'Start Sending Money with Just Your Voice Today','hi-IN':'आज ही सिर्फ अपनी आवाज़ से पैसे भेजना शुरू करें','bn-IN':'আজই শুধু আপনার কণ্ঠ দিয়ে অর্থ পাঠানো শুরু করুন','ta-IN':'இன்றே உங்கள் குரலால் மட்டும் பணம் அனுப்பத் தொடங்குங்கள்','te-IN':'ఈ రోజే మీ గొంతుతో మాత్రమే డబ్బు పంపడం ప్రారంభించండి','ml-IN':'ഇന്ന് തന്നെ നിങ്ങളുടെ ശബ്ദം കൊണ്ട് മാത്രം പണം അയക്കൂ','kn-IN':'ಇಂದೇ ನಿಮ್ಮ ಧ್ವನಿಯಿಂದ ಮಾತ್ರ ಹಣ ಕಳುಹಿಸಲು ಪ್ರಾರಂಭಿಸಿ','mr-IN':'आजच फक्त तुमच्या आवाजाने पैसे पाठवण्यास सुरुवात करा','gu-IN':'आज ही सिर्फ अपनी आवाज से पैसे भेजना शुरू करें','pa-IN':'ਅੱਜ ਹੀ ਸਿਰਫ਼ ਆਪਣੀ ਆਵਾਜ਼ ਨਾਲ ਪੈਸੇ ਭੇਜਣਾ ਸ਼ੁਰੂ ਕਰੋ','or-IN':'ଆଜି ହିଁ ଆପଣଙ୍କ ସ୍ୱରରେ ଟଙ୍କା ପଠାଇବା ଆରମ୍ଭ କରନ୍ତୁ','ur-IN':'آج ہی صرف اپنی آواز سے پیسے بھیجنا شروع کریں'},
    'cta.sub':           {'en-IN':'Free to sign up. No bank account required to get started. Works on any smartphone.','hi-IN':'साइन अप मुफ्त। शुरुआत के लिए कोई बैंक खाता आवश्यक नहीं।','bn-IN':'সাইন আপ করা বিনামূল্যে। কোনো ব্যাংক অ্যাকাউন্ট প্রয়োজন নেই।','ta-IN':'பதிவு செய்வது இலவசம். வங்கி கணக்கு தேவையில்லை.','te-IN':'సైన్ అప్ చేయడం ఉచితం. బ్యాంక్ ఖాతా అవసరం లేదు.','ml-IN':'സൈൻ അപ്പ് ചെയ്യൽ സൗജന്യം. ബാങ്ക് അക്കൗണ്ട് ആവശ്യമില്ല.','kn-IN':'ಸೈನ್ ಅಪ್ ಮಾಡಲು ಉಚಿತ. ಬ್ಯಾಂಕ್ ಖಾತೆ ಅಗತ್ಯವಿಲ್ಲ.','mr-IN':'साइन अप करणे मोफत. बँक खाते आवश्यक नाही.','gu-IN':'साइन अप मुफ्त। बैंक खाता जरूरी नहीं।','pa-IN':'ਸਾਈਨ ਅੱਪ ਮੁਫ਼ਤ। ਬੈਂਕ ਖਾਤਾ ਜ਼ਰੂਰੀ ਨਹੀਂ।','or-IN':'ସାଇନ ଅପ ମାଗଣା। ବ୍ୟାଙ୍କ ଖାତା ଆବଶ୍ୟକ ନାହିଁ।','ur-IN':'سائن اپ مفت۔ بینک اکاؤنٹ ضروری نہیں۔'},
    'cta.btn1':          {'en-IN':'Get Started Free','hi-IN':'मुफ़्त शुरू करें','bn-IN':'বিনামূল্যে শুরু করুন','ta-IN':'இலவசமாக தொடங்குங்கள்','te-IN':'ఉచితంగా ప్రారంభించండి','ml-IN':'സൗജന്യമായി ആരംഭിക്കൂ','kn-IN':'ಉಚಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ','mr-IN':'मोफत सुरू करा','gu-IN':'मफत शुरू करें','pa-IN':'ਮੁਫ਼ਤ ਸ਼ੁਰੂ ਕਰੋ','or-IN':'ମାଗଣାରେ ଆରମ୍ଭ','ur-IN':'مفت شروع کریں'},
    'cta.btn2':          {'en-IN':'Watch Demo','hi-IN':'डेमो देखें','bn-IN':'ডেমো দেখুন','ta-IN':'டெமோ பாருங்கள்','te-IN':'డెమో చూడండి','ml-IN':'ഡെമോ കാണൂ','kn-IN':'ಡೆಮೋ ನೋಡಿ','mr-IN':'डेमो पहा','gu-IN':'डेमो देखें','pa-IN':'ਡੈਮੋ ਦੇਖੋ','or-IN':'ଡେମୋ ଦେଖନ୍ତୁ','ur-IN':'ڈیمو دیکھیں'},
    'cta.note':          {'en-IN':'No credit card required · Works on 2G/3G · 12 languages supported','hi-IN':'कोई क्रेडिट कार्ड नहीं · 2G/3G पर काम करता है · 12 भाषाएँ','bn-IN':'কোনো ক্রেডিট কার্ড নেই · 2G/3G তে কাজ করে · 12টি ভাষা','ta-IN':'கிரெடிட் கார்டு தேவையில்லை · 2G/3G · 12 மொழிகள்','te-IN':'క్రెడిట్ కార్డ్ అవసరం లేదు · 2G/3G · 12 భాషలు','ml-IN':'ക്രെഡിറ്റ് കാർഡ് ആവശ്യമില്ല · 2G/3G · 12 ഭാഷകൾ','kn-IN':'ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಅಗತ್ಯವಿಲ್ಲ · 2G/3G · 12 ಭಾಷೆಗಳು','mr-IN':'क्रेडिट कार्ड आवश्यक नाही · 2G/3G · 12 भाषा','gu-IN':'क्रेडिट कार्ड जरूरी नहीं · 2G/3G · 12 भाषाएं','pa-IN':'ਕ੍ਰੈਡਿਟ ਕਾਰਡ ਜ਼ਰੂਰੀ ਨਹੀਂ · 2G/3G · 12 ਭਾਸ਼ਾਵਾਂ','or-IN':'କ୍ରେଡିଟ କାର୍ଡ ଆବଶ୍ୟକ ନାହିଁ · 2G/3G · 12 ଭାଷା','ur-IN':'کریڈٹ کارڈ ضروری نہیں · 2G/3G · 12 زبانیں'},

    // Footer
    'ft.tagline':        {'en-IN':'Making digital payments accessible for every Indian – one voice command at a time.','hi-IN':'हर भारतीय के लिए डिजिटल भुगतान सुलभ बनाना – एक आवाज़ कमांड में।','bn-IN':'প্রতিটি ভারতীয়ের জন্য ডিজিটাল পেমেন্ট সহজলভ্য করে তোলা।','ta-IN':'ஒவ்வொரு இந்தியருக்கும் டிஜிட்டல் கட்டணங்களை அணுகக்கூடியதாக செய்கிறோம்.','te-IN':'ప్రతి భారతీయుడికి డిజిటల్ చెల్లింపులు అందుబాటులో ఉంచడం.','ml-IN':'ഓരോ ഇന്ത്യക്കാരനും ഡിജിറ്റൽ പേമെന്റ് ലഭ്യമാക്കുന്നു.','kn-IN':'ಪ್ರತಿ ಭಾರತೀಯನಿಗೂ ಡಿಜಿಟಲ್ ಪಾವತಿ ಸುಲಭವಾಗಿಸುವುದು.','mr-IN':'प्रत्येक भारतीयासाठी डिजिटल पेमेंट सुलभ करणे.','gu-IN':'हर भारतीय के लिए डिजिटल भुगतान सुलभ बनाना।','pa-IN':'ਹਰ ਭਾਰਤੀ ਲਈ ਡਿਜੀਟਲ ਭੁਗਤਾਨ ਸੁਲਭ ਬਣਾਉਣਾ।','or-IN':'ପ୍ରତ୍ୟେକ ଭାରତୀୟ ପାଇଁ ଡିଜିଟାଲ ଭୁଗତାନ ସୁଲଭ କରିବା।','ur-IN':'ہر ہندوستانی کے لیے ڈیجیٹل ادائیگی قابل رسائی بنانا۔'},
    'ft.quicklinks':     {'en-IN':'Quick Links','hi-IN':'त्वरित लिंक','bn-IN':'দ্রুত লিঙ্ক','ta-IN':'விரைவு இணைப்புகள்','te-IN':'త్వరిత లింక్‌లు','ml-IN':'ദ്രുത ലിങ്കുകൾ','kn-IN':'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು','mr-IN':'जलद दुवे','gu-IN':'त्वरित लिंक','pa-IN':'ਤੇਜ਼ ਲਿੰਕ','or-IN':'ଦ୍ରୁତ ଲିଙ୍କ','ur-IN':'فوری لنکس'},
    'ft.company':        {'en-IN':'Company','hi-IN':'कंपनी','bn-IN':'কোম্পানি','ta-IN':'நிறுவனம்','te-IN':'కంపెనీ','ml-IN':'കമ്പനി','kn-IN':'ಕಂಪನಿ','mr-IN':'कंपनी','gu-IN':'कंपनी','pa-IN':'ਕੰਪਨੀ','or-IN':'କମ୍ପାନୀ','ur-IN':'کمپنی'},
    'ft.contact':        {'en-IN':'Contact','hi-IN':'संपर्क','bn-IN':'যোগাযোগ','ta-IN':'தொடர்பு','te-IN':'సంప్రదింపు','ml-IN':'ബന്ധപ്പെടൂ','kn-IN':'ಸಂಪರ್ಕ','mr-IN':'संपर्क','gu-IN':'संपर्क','pa-IN':'ਸੰਪਰਕ','or-IN':'ସଂଯୋଗ','ur-IN':'رابطہ'},
    'ft.copy':           {'en-IN':'© 2026 VaaniPay Technologies Pvt. Ltd. All rights reserved.','hi-IN':'© 2026 VaaniPay Technologies Pvt. Ltd. सर्वाधिकार सुरक्षित।','bn-IN':'© 2026 VaaniPay Technologies Pvt. Ltd. সর্বস্বত্ব সংরক্ষিত।','ta-IN':'© 2026 VaaniPay Technologies Pvt. Ltd. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.','te-IN':'© 2026 VaaniPay Technologies Pvt. Ltd. అన్ని హక్కులు నిల్వ ఉంచబడ్డాయి.','ml-IN':'© 2026 VaaniPay Technologies Pvt. Ltd. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.','kn-IN':'© 2026 VaaniPay Technologies Pvt. Ltd. ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.','mr-IN':'© 2026 VaaniPay Technologies Pvt. Ltd. सर्व हक्क राखीव.','gu-IN':'© 2026 VaaniPay Technologies Pvt. Ltd. सभी अधिकार सुरक्षित।','pa-IN':'© 2026 VaaniPay Technologies Pvt. Ltd. ਸਾਰੇ ਅਧਿਕਾਰ ਸੁਰੱਖਿਅਤ।','or-IN':'© 2026 VaaniPay Technologies Pvt. Ltd. ସମସ୍ତ ଅଧିକାର ସଂରକ୍ଷିତ।','ur-IN':'© 2026 VaaniPay Technologies Pvt. Ltd. تمام حقوق محفوظ ہیں۔'},

    // Chatbot
    'cb.name':           {'en-IN':'VaaniPay Assistant','hi-IN':'VaaniPay सहायक','bn-IN':'VaaniPay সহকারী','ta-IN':'VaaniPay உதவியாளர்','te-IN':'VaaniPay సహాయకుడు','ml-IN':'VaaniPay അസിസ്റ്റന്റ്','kn-IN':'VaaniPay ಸಹಾಯಕ','mr-IN':'VaaniPay सहाय्यक','gu-IN':'VaaniPay सहायक','pa-IN':'VaaniPay ਸਹਾਇਕ','or-IN':'VaaniPay ସହାୟକ','ur-IN':'VaaniPay معاون'},
    'cb.status':         {'en-IN':'Online now','hi-IN':'अभी ऑनलाइन','bn-IN':'এখন অনলাইন','ta-IN':'இப்போது ஆன்லைன்','te-IN':'ఇప్పుడు ఆన్‌లైన్','ml-IN':'ഇപ്പോൾ ഓൺലൈൻ','kn-IN':'ಈಗ ಆನ್‌ಲೈನ್','mr-IN':'आत्ता ऑनलाइन','gu-IN':'अभी ऑनलाइन','pa-IN':'ਹੁਣ ਆਨਲਾਈਨ','or-IN':'ଏବେ ଅନଲାଇନ','ur-IN':'ابھی آن لائن'},
    'cb.placeholder':    {'en-IN':'Ask me anything...','hi-IN':'कुछ भी पूछें...','bn-IN':'যেকোনো কিছু জিজ্ঞেস করুন...','ta-IN':'எதையும் கேளுங்கள்...','te-IN':'ఏదైనా అడగండి...','ml-IN':'എന്തും ചോദിക്കൂ...','kn-IN':'ಏನಾದರೂ ಕೇಳಿ...','mr-IN':'काहीही विचारा...','gu-IN':'कुछ भी पूछें...','pa-IN':'ਕੁਝ ਵੀ ਪੁੱਛੋ...','or-IN':'ଯାହା ହେଉ ପଚାରନ୍ତୁ...','ur-IN':'کچھ بھی پوچھیں...'},
    'cb.q1':             {'en-IN':'How to send?','hi-IN':'कैसे भेजें?','bn-IN':'কিভাবে পাঠাবেন?','ta-IN':'எப்படி அனுப்புவது?','te-IN':'ఎలా పంపాలి?','ml-IN':'എങ്ങനെ അയക്കാം?','kn-IN':'ಹೇಗೆ ಕಳುಹಿಸಬೇಕು?','mr-IN':'कसे पाठवायचे?','gu-IN':'कैसे भेजें?','pa-IN':'ਕਿਵੇਂ ਭੇਜਣਾ ਹੈ?','or-IN':'କିପରି ପଠାଇବେ?','ur-IN':'کیسے بھیجیں؟'},
    'cb.q2':             {'en-IN':'Is it safe?','hi-IN':'क्या यह सुरक्षित है?','bn-IN':'এটা কি নিরাপদ?','ta-IN':'இது பாதுகாப்பானதா?','te-IN':'ఇది సురక్షితమా?','ml-IN':'ഇത് സുരക്ഷിതമാണോ?','kn-IN':'ಇದು ಸುರಕ್ಷಿತವೇ?','mr-IN':'हे सुरक्षित आहे का?','gu-IN':'क्या यह सुरक्षित है?','pa-IN':'ਕੀ ਇਹ ਸੁਰੱਖਿਅਤ ਹੈ?','or-IN':'ଏହା ସୁରକ୍ଷିତ କି?','ur-IN':'کیا یہ محفوظ ہے؟'},
    'cb.q3':             {'en-IN':'Languages?','hi-IN':'भाषाएँ?','bn-IN':'ভাষা?','ta-IN':'மொழிகள்?','te-IN':'భాషలు?','ml-IN':'ഭാഷകൾ?','kn-IN':'ಭಾಷೆಗಳು?','mr-IN':'भाषा?','gu-IN':'भाषाएं?','pa-IN':'ਭਾਸ਼ਾਵਾਂ?','or-IN':'ଭାଷା?','ur-IN':'زبانیں؟'},
    'cb.q4':             {'en-IN':'Offline mode?','hi-IN':'ऑफलाइन मोड?','bn-IN':'অফলাইন মোড?','ta-IN':'ஆஃப்லைன் பயன்முறை?','te-IN':'ఆఫ్‌లైన్ మోడ్?','ml-IN':'ഓഫ്‌ലൈൻ മോഡ്?','kn-IN':'ಆಫ್‌ಲೈನ್ ಮೋಡ್?','mr-IN':'ऑफलाइन मोड?','gu-IN':'ऑफलाइन मोड?','pa-IN':'ਆਫਲਾਈਨ ਮੋਡ?','or-IN':'ଅଫଲାଇନ ମୋଡ?','ur-IN':'آف لائن موڈ؟'},
    'cb.greet':          {'en-IN':'Namaste! 🙏 I\'m Vaani. How can I help you with your payments today?','hi-IN':'नमस्ते! 🙏 मैं वाणी हूँ। आज आपके भुगतान में कैसे मदद करूँ?','bn-IN':'নমস্কার! 🙏 আমি বাণী। আজ আপনার পেমেন্টে কীভাবে সাহায্য করতে পারি?','ta-IN':'வணக்கம்! 🙏 நான் வாணி. இன்று உங்கள் கட்டணத்தில் எப்படி உதவட்டும்?','te-IN':'నమస్కారం! 🙏 నేను వాణి. ఈ రోజు మీ చెల్లింపులో ఎలా సహాయం చేయగలను?','ml-IN':'നമസ്കാരം! 🙏 ഞാൻ വാണി. ഇന്ന് നിങ്ങളുടെ പേമെന്റിൽ എങ്ങനെ സഹായിക്കട്ടെ?','kn-IN':'ನಮಸ್ಕಾರ! 🙏 ನಾನು ವಾಣಿ. ಇಂದು ನಿಮ್ಮ ಪಾವತಿಯಲ್ಲಿ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?','mr-IN':'नमस्कार! 🙏 मी वाणी आहे. आज तुमच्या पेमेंटमध्ये मी कशी मदद करू?','gu-IN':'नमस्ते! 🙏 मैं वाणी हूं। आज आपकी पेमेंट में कैसे मदद करूं?','pa-IN':'ਨਮਸਤੇ! 🙏 ਮੈਂ ਵਾਣੀ ਹਾਂ। ਅੱਜ ਤੁਹਾਡੇ ਭੁਗਤਾਨ ਵਿੱਚ ਕਿਵੇਂ ਮਦਦ ਕਰਾਂ?','or-IN':'ନମସ୍କାର! 🙏 ମୁଁ ବାଣୀ। ଆଜି ଆପଣଙ୍କ ଭୁଗତାନରେ କିପରି ସାହାଯ୍ୟ କରିବି?','ur-IN':'نمستے! 🙏 میں وانی ہوں۔ آج آپ کی ادائیگی میں کیسے مدد کروں؟'},
  };

  // ══════════════════════════════════════════════════════════
  // TAG every element with data-i18n on first run
  // ══════════════════════════════════════════════════════════
  function tagElements() {
    const MAP = [
      // Navbar
      ['.nav-links a[href="#features"]',            'nav.features'],
      ['.nav-links a[href="#how"]',                 'nav.how'],
      ['.nav-links a[href="#analy"]',               'nav.analytics'],
      ['.nav-links a[href="#security"]',            'nav.security'],
      ['.nav-links a[href="#about"]',               'nav.about'],
      ['.nav-login',                                'nav.login'],
      ['.mob-link[href="#features"]',               'nav.features'],
      ['.mob-link[href="#how"]',                    'nav.how'],
      ['.mob-link[href="#analy"]',                  'nav.analytics'],
      ['.mob-link[href="#security"]',               'nav.security'],
      ['.mob-link[href="#about"]',                  'nav.about'],
      ['.mob-menu .btn-green',                      'mob.getstarted'],

      // Hero badge (keep dot child — use special mode)
      ['.hero-badge',                               'hero.badge',        'badge'],
      ['.hero-title .hl',                           'hero.hl'],
      ['.hero-title .ho',                           'hero.ho'],
      ['.hero-sub',                                 'hero.sub'],
      ['.hero-btns .btn-green',                     'hero.btn1',         'svgbtn'],
      ['.hero-btns .btn-outline',                   'hero.btn2'],
      ['.hero-stats .stat-item:nth-child(1) .stat-l','hero.stat1.l'],
      ['.hero-stats .stat-item:nth-child(2) .stat-l','hero.stat2.l'],
      ['.hero-stats .stat-item:nth-child(3) .stat-l','hero.stat3.l'],

      // Floating chips
      ['.fc1 .fc-lbl',                              'fc1.lbl'],
      ['.fc2 .fc-lbl',                              'fc2.lbl'],

      // Phone
      ['.p-bal-lbl',                                'phone.balance'],
      ['.p-mic-t',                                  'phone.tap'],
      ['.p-mic-s',                                  'phone.say'],
      ['.p-txs .p-tx:nth-child(1) .p-tx-nm',       'phone.tx1.nm'],
      ['.p-txs .p-tx:nth-child(1) .p-tx-tm',       'phone.tx1.t'],
      ['.p-txs .p-tx:nth-child(2) .p-tx-nm',       'phone.tx2.nm'],
      ['.p-txs .p-tx:nth-child(2) .p-tx-tm',       'phone.tx2.t'],

      // Features
      ['.features .chip',                           'feat.chip'],
      ['.features .h2',                             'feat.h2'],
      ['.features > .wrap > .tc .body-lg',          'feat.sub'],
      ['.feat-grid .feat-card:nth-child(1) .feat-title','feat1.title'],
      ['.feat-grid .feat-card:nth-child(1) .feat-desc', 'feat1.desc'],
      ['.feat-grid .feat-card:nth-child(2) .feat-title','feat2.title'],
      ['.feat-grid .feat-card:nth-child(2) .feat-desc', 'feat2.desc'],
      ['.feat-grid .feat-card:nth-child(3) .feat-title','feat3.title'],
      ['.feat-grid .feat-card:nth-child(3) .feat-desc', 'feat3.desc'],
      ['.feat-grid .feat-card:nth-child(4) .feat-title','feat4.title'],
      ['.feat-grid .feat-card:nth-child(4) .feat-desc', 'feat4.desc'],

      // How
      ['.how .chip',                                'how.chip'],
      ['.how .h2',                                  'how.h2'],
      ['.how > .wrap > .tc .body-lg',               'how.sub'],
      ['.steps .step:nth-child(1) .step-title',     'step1.title'],
      ['.steps .step:nth-child(1) .step-desc',      'step1.desc'],
      ['.steps .step:nth-child(2) .step-title',     'step2.title'],
      ['.steps .step:nth-child(2) .step-desc',      'step2.desc'],
      ['.steps .step:nth-child(3) .step-title',     'step3.title'],
      ['.steps .step:nth-child(3) .step-desc',      'step3.desc'],

      // Analytics
      ['.analy-sec .chip',                          'analy.chip'],
      ['.analy-sec .h2',                            'analy.h2'],
      ['.analy-sec .body-lg',                       'analy.sub'],
      ['.analy-card.green .ac-lbl',                 'analy.sent.lbl'],
      ['.analy-card.amber .ac-lbl',                 'analy.recv.lbl'],
      ['.analy-card.blue .ac-lbl',                  'analy.count.lbl'],
      ['.tf[onclick*="\'all\'"]',                   'analy.filter.all'],
      ['.tf[onclick*="\'sent\'"]',                  'analy.filter.sent'],
      ['.tf[onclick*="\'received\'"]',              'analy.filter.recv'],
      ['.tx-panel-title',                           'analy.tx.title'],
      ['.tx-more',                                  'analy.view.all'],
      ['.chart-title',                              'analy.chart.title'],

      // Security
      ['.security .chip',                           'sec.chip'],
      ['.sec-h',                                    'sec.h'],
      ['.sec-sub',                                  'sec.sub'],
      ['.sec-items .sec-item:nth-child(1) .sec-it', 'sec1.t'],
      ['.sec-items .sec-item:nth-child(1) .sec-id', 'sec1.d'],
      ['.sec-items .sec-item:nth-child(2) .sec-it', 'sec2.t'],
      ['.sec-items .sec-item:nth-child(2) .sec-id', 'sec2.d'],
      ['.sec-items .sec-item:nth-child(3) .sec-it', 'sec3.t'],
      ['.sec-items .sec-item:nth-child(3) .sec-id', 'sec3.d'],

      // About
      ['.about-text .chip',                         'about.chip'],
      ['.about-h',                                  'about.h',           'svgbtn'],
      ['.about-team-h',                             'about.team.h'],

      // CTA
      ['.cta-sec .chip',                            'cta.chip'],
      ['.cta-h',                                    'cta.h'],
      ['.cta-sub',                                  'cta.sub'],
      ['.cta-btns .btn-white',                      'cta.btn1',          'svgbtn'],
      ['.cta-btns .btn-ghost-w',                    'cta.btn2'],
      ['.cta-note',                                 'cta.note',          'svgbtn'],

      // Footer
      ['.ft-tagline',                               'ft.tagline'],
      ['.ft-grid > div:nth-child(2) .ft-col-h',    'ft.quicklinks'],
      ['.ft-grid > div:nth-child(3) .ft-col-h',    'ft.company'],
      ['.ft-grid > div:nth-child(4) .ft-col-h',    'ft.contact'],
      ['.ft-bot span',                              'ft.copy'],

      // Chatbot
      ['.cb-bot-nm',                                'cb.name'],
      ['.cb-status',                                'cb.status',         'badge'],
      ['.cb-inp',                                   'cb.placeholder',    'placeholder'],
      ['.cb-quick .qb:nth-child(1)',                'cb.q1'],
      ['.cb-quick .qb:nth-child(2)',                'cb.q2'],
      ['.cb-quick .qb:nth-child(3)',                'cb.q3'],
      ['.cb-quick .qb:nth-child(4)',                'cb.q4'],
    ];

    MAP.forEach(function([sel, key, mode]) {
      document.querySelectorAll(sel).forEach(function(el) {
        el.setAttribute('data-i18n', key);
        if (mode) el.setAttribute('data-i18n-mode', mode);
      });
    });
  }

  // ══════════════════════════════════════════════════════════
  // APPLY translations to every tagged element
  // ══════════════════════════════════════════════════════════
  function applyLang(lang) {
    var fallback = 'en-IN';

    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key  = el.getAttribute('data-i18n');
      var mode = el.getAttribute('data-i18n-mode') || 'text';
      var row  = T[key];
      if (!row) return;
      var val = row[lang] || row[fallback];
      if (!val) return;

      if (mode === 'text') {
        el.textContent = val;

      } else if (mode === 'placeholder') {
        el.setAttribute('placeholder', val);

      } else if (mode === 'svgbtn') {
        // Preserve SVG/non-text child nodes, replace text only
        var saved = Array.from(el.childNodes).filter(function(n) {
          return n.nodeType !== 3; // keep element nodes, remove text
        });
        el.textContent = val;
        saved.forEach(function(n) { el.insertBefore(n, el.firstChild); });

      } else if (mode === 'badge') {
        // Preserve first non-text child (e.g. badge-dot, cb-dot span)
        var firstChild = Array.from(el.childNodes).find(function(n) {
          return n.nodeType !== 3;
        });
        el.textContent = ' ' + val;
        if (firstChild) el.insertBefore(firstChild, el.firstChild);
      }
    });

    // RTL
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', RTL_LANGS.includes(lang) ? 'rtl' : 'ltr');

    // Update chatbot greeting message (first bot bubble)
    var firstBub = document.querySelector('.cb-msgs .msg.bot .bub');
    if (firstBub && T['cb.greet'] && T['cb.greet'][lang]) {
      firstBub.textContent = T['cb.greet'][lang];
    }
  }

  // ── Dropdown helpers ──────────────────────────────────────
  function openDropdown() {
    dropdown.classList.add('open');
    arrow.classList.add('open');
    searchEl.value = '';
    showAll();
    setTimeout(function() { searchEl.focus(); }, 50);
  }
  function closeDropdown() {
    dropdown.classList.remove('open');
    arrow.classList.remove('open');
  }
  function showAll() {
    listEl.querySelectorAll('.ls-item').forEach(function(i) { i.style.display = ''; });
    var e = listEl.querySelector('.ls-empty');
    if (e) e.remove();
  }

  // ── Search ────────────────────────────────────────────────
  searchEl.addEventListener('input', function() {
    var q = this.value.trim().toLowerCase();
    var n = 0;
    listEl.querySelectorAll('.ls-item').forEach(function(item) {
      var match = !q
        || item.dataset.name.toLowerCase().includes(q)
        || item.dataset.native.toLowerCase().includes(q)
        || item.dataset.lang.toLowerCase().includes(q);
      item.style.display = match ? '' : 'none';
      if (match) n++;
    });
    var ex = listEl.querySelector('.ls-empty');
    if (!n && !ex) {
      var d = document.createElement('div');
      d.className = 'ls-empty';
      d.textContent = 'No language found';
      listEl.appendChild(d);
    } else if (n && ex) ex.remove();
  });

  // ── Select ────────────────────────────────────────────────
  function selectLang(item) {
    var lang   = item.dataset.lang;
    var name   = item.dataset.name;
    var native = item.dataset.native;
    var flag   = item.dataset.flag;

    flagEl.textContent    = flag;
    currentEl.textContent = name;

    listEl.querySelectorAll('.ls-item').forEach(function(i) {
      i.classList.toggle('active', i.dataset.lang === lang);
    });

    applyLang(lang);
    closeDropdown();
    localStorage.setItem('vaanipay-lang', lang);
    showToast('🌐 ' + native + ' (' + name + ') selected');
  }

  // ── Events ────────────────────────────────────────────────
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdown.classList.contains('open') ? closeDropdown() : openDropdown();
  });
  listEl.addEventListener('click', function(e) {
    var item = e.target.closest('.ls-item');
    if (item) selectLang(item);
  });
  document.addEventListener('click', function(e) {
    if (!selector.contains(e.target)) closeDropdown();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeDropdown();
  });

  // ── Init on load ──────────────────────────────────────────
  tagElements(); // stamp data-i18n on every element first

  var saved = localStorage.getItem('vaanipay-lang') || 'en-IN';
  var savedItem = listEl.querySelector('[data-lang="' + saved + '"]');
  if (savedItem) {
    flagEl.textContent    = savedItem.dataset.flag;
    currentEl.textContent = savedItem.dataset.name;
    savedItem.classList.add('active');
  }
  applyLang(saved);

})();
/* =====================================
   10. WALLET API CONNECTION
   ===================================== */

// Load balance
async function loadBalance(){

const res = await fetch("/api/balance");
const data = await res.json();

document.getElementById("walletBalance").innerText =
"₹" + data.balance;

}


// Send money
async function vaaniSendMoney(name, amount){

const res = await fetch("/api/send",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name:name,
amount:amount
})
});

const data = await res.json();

if(data.success){

alert("Payment successful");

document.getElementById("walletBalance").innerText =
"₹" + data.balance;

loadTransactions();

}
else{

alert(data.message);

}

}


// Load transactions
async function loadTransactions(){

const res = await fetch("/api/transactions");
const data = await res.json();

const list = document.getElementById("txnList");

list.innerHTML="";

data.reverse().forEach(txn=>{

const item=document.createElement("div");

item.innerHTML=
txn.name+" - ₹"+txn.amount;

list.appendChild(item);

});

}


// Load when page opens
window.onload=function(){

loadBalance();
loadTransactions();

};
