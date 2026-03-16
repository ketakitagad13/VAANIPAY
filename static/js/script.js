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
