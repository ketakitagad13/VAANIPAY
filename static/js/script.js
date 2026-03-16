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
// (function initPhoneMic() {
//   const micBtn = document.getElementById('phoneMicBtn');
//   if (!micBtn) return;

//   const micText = micBtn.closest('.p-mic-area')?.querySelector('.p-mic-t');
//   const micSub  = micBtn.closest('.p-mic-area')?.querySelector('.p-mic-s');

//   const demoSteps = [
//     { t: 'Listening...', s: '"Send 500 rupees to Priya"' },
//     { t: 'Processing...', s: 'Extracting name & amount' },
//     { t: 'Confirming...', s: 'Receiver: Priya | â‚¹500' },
//     { t: 'Tap to Speak', s: 'Say "Send money to..."' }
//   ];

//   let step = 0;
//   let timer = null;

//   micBtn.addEventListener('click', function () {
//     clearTimeout(timer);
//     step = 0;
//     runDemo();
//   });

//   function runDemo() {
//     if (step >= demoSteps.length) return;
//     const s = demoSteps[step];
//     if (micText) micText.textContent = s.t;
//     if (micSub)  micSub.textContent  = s.s;
//     step++;
//     if (step < demoSteps.length) {
//       timer = setTimeout(runDemo, 1200);
//     }
//   }
// })();

/* ══════════════════════════════════════════════════════
   6. VOICE RECOGNITION — Web Speech API
   Steps:
   1. User clicks mic → browser asks mic permission
   2. recognition.start() begins listening
   3. Browser converts audio → text in real time
   4. onresult fires → we grab transcript
   5. We pass the text to Section 7 (parseCommand)
   6. Section 7 returns { amount, to } structured data
   7. We show confirmation card to user
══════════════════════════════════════════════════════ */
(function initPhoneMic() {

  const micBtn  = document.getElementById('phoneMicBtn');
  const micText = micBtn ? micBtn.closest('.p-mic-area')?.querySelector('.p-mic-t') : null;
  const micSub  = micBtn ? micBtn.closest('.p-mic-area')?.querySelector('.p-mic-s') : null;

  /* ── Helper: update the mic area text ── */
  function setMicUI(title, sub) {
    if (micText) micText.textContent = title;
    if (micSub)  micSub.textContent  = sub;
  }

  /* ── Helper: reset mic UI back to default ── */
  function resetMicUI() {
    setMicUI('Tap to Speak', 'Say "Send money to..."');
    if (micBtn) micBtn.style.background = '';
  }

  /* ════════════════════════════════════════
     SECTION 7 — COMMAND PARSER
     Converts "Send 100 rupees to Ramesh"
     into { amount: 100, to: "Ramesh" }

     Step 1: lowercase the full text
     Step 2: regex to find any number
     Step 3: find word after "to" = receiver
     Step 4: if both found → return data
             else → return null
  ════════════════════════════════════════ */
  // function parseCommand(text) {

  //   /* Step 1 — lowercase for consistent matching */
  //   const lower = text.toLowerCase();

  //   /* Step 2 — find any number in the text
  //      Examples: "500", "100 rupees", "₹200"
  //      The regex \d+ matches one or more digits */
  //   const numberMatch = lower.match(/\d+/);
  //   const amount = numberMatch ? parseInt(numberMatch[0]) : null;

  //   /* Step 3 — find the receiver name
  //      Look for the word that comes after "to"
  //      Example: "send 500 to ramesh" → "ramesh"
  //      We capitalize the first letter for display */
  //   let receiver = null;
  //   const toMatch = lower.match(/\bto\s+([a-z]+)/);
  //   if (toMatch && toMatch[1]) {
  //     receiver = toMatch[1].charAt(0).toUpperCase() + toMatch[1].slice(1);
  //   }

  //   /* Step 4 — only return if both values found */
  //   if (amount && receiver) {
  //     return { amount: amount, to: receiver };
  //   }
  //   return null;
  // }

function parseCommand(text) {

    var lower = (text || '').toLowerCase().trim();
    if (!lower) return null;

    var numberMatch = lower.match(/\d+/);
    var amount = numberMatch ? parseInt(numberMatch[0], 10) : null;

    var receiver = extractRecipient(lower);

    if (amount && receiver) {
      return { amount: amount, to: receiver };
    }
    return null;
  }

  function extractRecipient(lower) {
    var stopWords = [
      'send', 'pay', 'transfer', 'money', 'rupee', 'rupees', 'rs', 'inr', 'please', 'now',
      'ko', 'to', 'bhejo', 'bhejna', 'karo', 'karna', 'at', 'the', 'a', 'an', 'my', 'for',
      'sir', 'madam', 'ji', 'bhai', 'didi', 'hai', 'ka', 'ke', 'ki'
    ];

    function cleanName(raw) {
      if (!raw) return null;
      var cleaned = raw
        .replace(/[0-9₹.,!?]/g, ' ')
        .replace(/\b(please|now|rupees?|rs|inr|bhejo|karo|karna|ji|bhai|didi|sir|madam)\b/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      if (!cleaned) return null;

      var words = cleaned.split(' ').filter(function(w) {
        return w && stopWords.indexOf(w) === -1;
      });

      if (!words.length) return null;
      return words.slice(0, 2).map(function(w) {
        return w.charAt(0).toUpperCase() + w.slice(1);
      }).join(' ');
    }

    var toMatch = lower.match(/\bto\s+([\p{L}a-z]+(?:\s+[\p{L}a-z]+){0,2})/u);
    var candidate = cleanName(toMatch && toMatch[1]);
    if (candidate) return candidate;

    var koMatch = lower.match(/([\p{L}a-z]+(?:\s+[\p{L}a-z]+){0,2})\s+ko\b/u);
    candidate = cleanName(koMatch && koMatch[1]);
    if (candidate) return candidate;

    var words = lower
      .replace(/[0-9₹.,!?]/g, ' ')
      .split(/\s+/)
      .filter(function(w) { return w && stopWords.indexOf(w) === -1; });

    if (!words.length) return null;
    return words.slice(-2).map(function(w) {
      return w.charAt(0).toUpperCase() + w.slice(1);
    }).join(' ');
  }

  function getVoiceLanguage() {
    var saved = window.localStorage ? (localStorage.getItem('vp_language') || localStorage.getItem('vp_lang')) : null;
    var lang = saved || navigator.language || 'hi-IN';
    return lang;
  }

  function speakPaymentSuccess(parsed, language) {
    if (!('speechSynthesis' in window) || !parsed) return;

    var lang = language || 'hi-IN';
    var message;

    if (lang.indexOf('hi') === 0) {
      message = 'Aapka ' + parsed.to + ' ko ' + parsed.amount + ' rupaye ka payment safal ho gaya hai.';
    } else if (lang.indexOf('ta') === 0) {
      message = parsed.to + 'க்கு ' + parsed.amount + ' ரூபாய் பணம் வெற்றிகரமாக அனுப்பப்பட்டது.';
    } else if (lang.indexOf('te') === 0) {
      message = parsed.to + ' కు ' + parsed.amount + ' రూపాయల చెల్లింపు విజయవంతమైంది.';
    } else if (lang.indexOf('bn') === 0) {
      message = parsed.to + ' কে ' + parsed.amount + ' টাকার পেমেন্ট সফল হয়েছে।';
    } else {
      message = 'Your payment of rupees ' + parsed.amount + ' to ' + parsed.to + ' is successful.';
    }

    window.speechSynthesis.cancel();
    var utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = lang;
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }

  /* ════════════════════════════════════════
     CONFIRMATION CARD
     Shows parsed result before sending
  ════════════════════════════════════════ */
  function showConfirmCard(parsed, onConfirm, onCancel) {
    /* Remove any existing card first */
    var old = document.getElementById('vpConfirmCard');
    if (old) old.remove();

    var card = document.createElement('div');
    card.id = 'vpConfirmCard';
    card.style.cssText = [
      'position:fixed', 'bottom:100px', 'left:50%',
      'transform:translateX(-50%)',
      'background:#fff', 'border-radius:20px',
      'box-shadow:0 20px 60px rgba(0,0,0,0.18)',
      'padding:24px 28px', 'z-index:99999',
      'min-width:280px', 'text-align:center',
      'border:2px solid #2eb050',
      'font-family:Nunito,sans-serif'
    ].join(';');

    card.innerHTML =
      '<div style="font-size:.75rem;font-weight:700;color:#2eb050;letter-spacing:.1em;text-transform:uppercase;margin-bottom:10px">Confirm Payment</div>' +
      '<div style="font-size:2rem;font-weight:800;color:#0d1f12;margin-bottom:4px">₹' + parsed.amount + '</div>' +
      '<div style="font-size:1rem;color:#4a6652;margin-bottom:20px">to <strong>' + parsed.to + '</strong></div>' +
      '<div style="display:flex;gap:10px;justify-content:center">' +
        '<button id="vpCancelBtn" style="flex:1;padding:12px;border-radius:50px;border:2px solid #d0e8d8;background:#fff;color:#4a6652;font-family:Nunito,sans-serif;font-weight:700;font-size:.9rem;cursor:pointer">Cancel</button>' +
        '<button id="vpSendBtn"   style="flex:1;padding:12px;border-radius:50px;border:none;background:#2eb050;color:#fff;font-family:Nunito,sans-serif;font-weight:700;font-size:.9rem;cursor:pointer">Send ✓</button>' +
      '</div>';

    document.body.appendChild(card);

    document.getElementById('vpSendBtn').addEventListener('click', function() {
      card.remove();
      onConfirm();
    });
    document.getElementById('vpCancelBtn').addEventListener('click', function() {
      card.remove();
      onCancel();
    });

    /* Auto-dismiss after 15 seconds */
    setTimeout(function() { if (card.parentNode) card.remove(); }, 15000);
  }

  /* ════════════════════════════════════════
     PAYMENT SENDER
     Calls Flask /api/pay or queues offline
  ════════════════════════════════════════ */
  function sendPayment(parsed) {
    var voiceLang = getVoiceLanguage();
    setMicUI('Sending...', '₹' + parsed.amount + ' → ' + parsed.to);

    /* If offline — queue it */
    if (!navigator.onLine) {
      if (window.vpQueue) window.vpQueue.queue({ amount: parsed.amount, to: parsed.to, language: voiceLang });
      setMicUI('Saved Offline ✓', 'Will send when internet returns');
      setTimeout(resetMicUI, 3000);
      return;
    }

    /* Online — send now */
    fetch('/api/pay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: parsed.amount, to: parsed.to, language: voiceLang })
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.status === 'success') {
        setMicUI('Payment Sent! ✓', '₹' + parsed.amount + ' to ' + parsed.to);
        speakPaymentSuccess(parsed, voiceLang);
      } else {
        setMicUI('Failed ✗', data.message || 'Try again');
      }
      setTimeout(resetMicUI, 3000);
    })
    .catch(function() {
      setMicUI('Error', 'Flask not running?');
      setTimeout(resetMicUI, 3000);
    });
  }

  /* ════════════════════════════════════════
     SPEECH RECOGNITION SETUP
     Step 1: Check browser support
     Step 2: Configure recognition
     Step 3: Wire mic button click
     Step 4: Handle result → parse → confirm
  ════════════════════════════════════════ */

  /* Step 1 — Check if browser supports Web Speech API */
  var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!micBtn) return; /* no mic button on this page */

  if (!SpeechAPI) {
    /* Browser doesn't support it — show message */
    micBtn.addEventListener('click', function() {
      setMicUI('Not Supported', 'Use Chrome browser');
      setTimeout(resetMicUI, 3000);
    });
    return;
  }

  /* Step 2 — Configure recognition */
  var recognition = new SpeechAPI();
  recognition.lang            = getVoiceLanguage();
  recognition.interimResults  = false;   /* only final result, not live words */
  recognition.maxAlternatives = 1;
  var isListening = false;

  /* Step 3 — Wire mic button click */
  micBtn.addEventListener('click', function() {
    if (isListening) {
      recognition.stop();
      return;
    }
    try {
      recognition.start();
    } catch(e) {
      setMicUI('Tap to Speak', 'Say "Send money to..."');
    }
  });

  /* Show listening state */
  recognition.onstart = function() {
    isListening = true;
    micBtn.style.background = '#e53e3e'; /* red = recording */
    setMicUI('Listening...', 'Speak now');
  };

  /* Step 4 — onresult fires when speech detected */
  recognition.onresult = function(event) {
    var transcript = event.results[0][0].transcript;
    setMicUI('Heard:', '"' + transcript + '"');

    /* Pass to Section 7 parser */
    var parsed = parseCommand(transcript);

    if (parsed) {
      /* Step 4a — parsing succeeded, show confirm card */
      setMicUI('Confirm below ↓', '₹' + parsed.amount + ' to ' + parsed.to);
      showConfirmCard(
        parsed,
        function() { sendPayment(parsed); },   /* user tapped Send */
        function() { resetMicUI(); }            /* user tapped Cancel */
      );
    } else {
      /* Step 4b — could not parse, show error */
      setMicUI('Try again', 'Say "Send 500 to Ramesh"');
      setTimeout(resetMicUI, 3000);
    }
  };

  /* Step 4 — onresult fires when speech detected */
  recognition.onresult = function(event) {
    var transcript = event.results[0][0].transcript;
    setMicUI('Heard:', '"' + transcript + '"');

    /* Use frontend parser directly — faster, works offline */
    var parsed = parseCommand(transcript);

    if (parsed) {
      setMicUI('Confirm below ↓', '₹' + parsed.amount + ' to ' + parsed.to);
      showConfirmCard(
        parsed,
        function() { sendPayment(parsed); },
        function() { resetMicUI(); }
      );
    } else {
      /* Frontend failed — try backend as fallback */
      fetch('/api/voice-parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: transcript, language: getVoiceLanguage() })
      })
      .then(function(r) { return r.json(); })
      .then(function(backendParsed) {
        if (backendParsed.amount && backendParsed.to) {
          setMicUI('Confirm below ↓', '₹' + backendParsed.amount + ' to ' + backendParsed.to);
          showConfirmCard(
            backendParsed,
            function() { sendPayment(backendParsed); },
            function() { resetMicUI(); }
          );
        } else if (backendParsed.amount && !backendParsed.to) {
          var autoReceiver = extractRecipient(transcript.toLowerCase());
          if (autoReceiver) {
            var recovered = { amount: backendParsed.amount, to: autoReceiver };
            setMicUI('Confirm below ↓', '₹' + recovered.amount + ' to ' + recovered.to);
            showConfirmCard(
              recovered,
              function() { sendPayment(recovered); },
              function() { resetMicUI(); }
            );
          } else {
            setMicUI('Try again', 'Please speak recipient name clearly');
            setTimeout(resetMicUI, 3000);
          }
        } else {
          setMicUI('Try again', 'Say "Send 500 to Ramesh"');
          setTimeout(resetMicUI, 3000);
        }
      })
      .catch(function() {
        setMicUI('Try again', 'Say "Send 500 to Ramesh"');
        setTimeout(resetMicUI, 3000);
      });
    }
  };

  recognition.onend = function() {
    isListening = false;
    micBtn.style.background = '';
  };

  recognition.onerror = function(event) {
    isListening = false;
    micBtn.style.background = '';
    if (event.error === 'not-allowed') {
      setMicUI('Mic Blocked', 'Allow mic in Chrome settings');
    } else if (event.error === 'no-speech') {
      setMicUI('No speech heard', 'Tap and speak clearly');
    } else {
      setMicUI('Error: ' + event.error, 'Try again');
    }
    setTimeout(resetMicUI, 3000);
  };

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

(function initOfflineQueue() {
  function isOnline() { return navigator.onLine; }

  function queuePayment(payment) {
    const q = JSON.parse(localStorage.getItem('vpQueue') || '[]');
    q.push(payment);
    localStorage.setItem('vpQueue', JSON.stringify(q));
  }

  function syncQueue() {
    const q = JSON.parse(localStorage.getItem('vpQueue') || '[]');
    if (!q.length) return;
    fetch('/api/sync', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ pending: q })
    }).then(r => r.json()).then(d => {
      alert(d.message);
      localStorage.removeItem('vpQueue');
    });
  }

  // Auto-sync when coming back online
  window.addEventListener('online', syncQueue);
  
  // Export so voice payment can use it
  window.vpQueue = { queue: queuePayment, sync: syncQueue, online: isOnline };
})();