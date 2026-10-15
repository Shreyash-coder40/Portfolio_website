// ===== HIGH-PERFORMANCE NAVBAR SCROLL & ACTIVE SPY =====
const navbar = document.getElementById("navbar");
const scrollTop = document.getElementById("scroll-top");
const navLinks = document.querySelectorAll(".nav-link");

let isNavbarScrolled = false;
let isScrollTopVisible = false;
let scrollTicking = false;

function onScrollFrame() {
  const y = window.scrollY || window.pageYOffset;
  const shouldScrolled = y > 45;
  const shouldTop = y > 380;

  if (shouldScrolled !== isNavbarScrolled) {
    isNavbarScrolled = shouldScrolled;
    navbar.classList.toggle("scrolled", isNavbarScrolled);
  }

  if (shouldTop !== isScrollTopVisible) {
    isScrollTopVisible = shouldTop;
    scrollTop.classList.toggle("show", isScrollTopVisible);
  }

  scrollTicking = false;
}

window.addEventListener("scroll", () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(onScrollFrame);
    scrollTicking = true;
  }
}, { passive: true });

// High-performance IntersectionObserver for active nav link highlighting (zero scroll-loop cost!)
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + id);
      });
    }
  });
}, {
  rootMargin: "-20% 0px -65% 0px",
  threshold: 0
});

document.querySelectorAll("section[id]").forEach(sec => sectionObserver.observe(sec));

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById("hamburger");
const navLinksList = document.getElementById("nav-links");

if (hamburger && navLinksList) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = navLinksList.classList.toggle("open");
    hamburger.classList.toggle("active", isOpen);
    if (window.CyberAudio) window.CyberAudio.playClick();
  });

  navLinksList.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navLinksList.classList.remove("open");
      hamburger.classList.remove("active");
    });
  });

  // Close when clicking outside of the navbar
  document.addEventListener("click", (e) => {
    if (navLinksList.classList.contains("open") && !navLinksList.contains(e.target) && !hamburger.contains(e.target)) {
      navLinksList.classList.remove("open");
      hamburger.classList.remove("active");
    }
  });

  // Close on Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinksList.classList.contains("open")) {
      navLinksList.classList.remove("open");
      hamburger.classList.remove("active");
    }
  });

  // Close on resize above 992px
  window.addEventListener("resize", () => {
    if (window.innerWidth > 992 && navLinksList.classList.contains("open")) {
      navLinksList.classList.remove("open");
      hamburger.classList.remove("active");
    }
  });
}

// ===== TYPEWRITER EFFECT =====
const roles = [
  "Full Stack Developer",
  "MERN Stack Specialist",
  "DSA & Problem Solver",
  "Hackathon Finalist 🏆",
  "Creative Web Developer"
];
let roleIdx = 0;
let charIdx = roles[0].length;
let isDeleting = true;
const typeEl = document.getElementById("typewriter");

function typewrite() {
  if (!typeEl) return;
  const current = roles[roleIdx];
  if (isDeleting) {
    charIdx--;
    typeEl.textContent = current.substring(0, charIdx);
  } else {
    charIdx++;
    typeEl.textContent = current.substring(0, charIdx);
  }

  let delay = isDeleting ? 45 : 85;

  if (!isDeleting && charIdx === current.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    delay = 350;
  }

  setTimeout(typewrite, delay);
}

if (typeEl) {
  typeEl.textContent = roles[0];
  setTimeout(typewrite, 2000);
}

// ===== HERO BACKGROUND PARTICLES (HERO SECTION ONLY) =====
function initHeroParticles() {
  const pBox = document.getElementById("particles") || document.querySelector(".hero-particles");
  if (!pBox) return;
  pBox.innerHTML = "";

  const colorClasses = ["sprinkle-cyan", "sprinkle-blue", "sprinkle-white", "sprinkle-purple", "sprinkle-gold"];
  const shapeClasses = ["sprinkle-dot", "sprinkle-dot", "sprinkle-sparkle"];

  const count = 22;
  for (let i = 0; i < count; i++) {
    const sp = document.createElement("div");
    const color = colorClasses[Math.floor(Math.random() * colorClasses.length)];
    const shape = shapeClasses[Math.floor(Math.random() * shapeClasses.length)];
    const isTwinkle = Math.random() > 0.45;

    sp.className = `sprinkle ${shape} ${color}${isTwinkle ? " twinkle" : ""}`;

    const size = shape === "sprinkle-sparkle" ? (4.5 + Math.random() * 3).toFixed(1) : (2 + Math.random() * 2).toFixed(1);
    sp.style.width = `${size}px`;
    sp.style.height = `${size}px`;

    sp.style.left = `${(Math.random() * 94 + 3).toFixed(1)}%`;
    sp.style.top = `${(Math.random() * 92 + 4).toFixed(1)}%`;

    const duration = (4 + Math.random() * 4).toFixed(1);
    const delay = (Math.random() * 4).toFixed(1);
    const maxOp = (0.4 + Math.random() * 0.4).toFixed(2);
    const driftX = ((Math.random() - 0.5) * 36).toFixed(0);

    sp.style.animationDuration = `${duration}s`;
    sp.style.animationDelay = `${delay}s`;
    sp.style.setProperty('--max-op', maxOp);
    sp.style.setProperty('--drift-x', `${driftX}px`);

    pBox.appendChild(sp);
  }
}
initHeroParticles();

// ===== ANIMATE SKILL BARS ON SCROLL =====
document.querySelectorAll(".pill-fill").forEach(bar => {
  bar.setAttribute("data-w", bar.style.width);
  bar.style.width = "0";
});
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll(".pill-fill").forEach(bar => {
        setTimeout(() => { bar.style.width = bar.getAttribute("data-w"); }, 100);
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll(".skill-category").forEach(cat => barObserver.observe(cat));

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.getAttribute("data-count"));
  if (isNaN(target)) return;
  const prefix = el.getAttribute("data-prefix") || "";
  const suffix = el.hasAttribute("data-suffix") ? el.getAttribute("data-suffix") : "+";
  let count = 0;
  const inc = Math.max(Math.ceil(target / 60), 1);
  const timer = setInterval(() => {
    count = Math.min(count + inc, target);
    el.textContent = `${prefix}${count}${count >= target ? suffix : ""}`;
    if (count >= target) {
      clearInterval(timer);
    }
  }, 25);
}
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll(".stat-num").forEach(animateCounter);
      statObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
const statsRow = document.querySelector(".stats-row");
if (statsRow) statObserver.observe(statsRow);

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("reveal-visible");
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.02, rootMargin: "0px 0px 140px 0px" });

const revealElements = document.querySelectorAll(
  ".section-header, .about-content-col, .about-img-wrapper, .timeline-item, .recruiter-highlight-banner, .skill-card-modern, .project-card, .achievement-card, .contact-items, .contact-form, .about-info-item"
);

revealElements.forEach((el) => {
  el.classList.add("reveal-init");
  revealObserver.observe(el);
});

// ===== EMAILJS CONFIGURATION & CONNECT WITH US HANDLER =====
const EMAILJS_CONFIG = {
  PUBLIC_KEY: "pmo9m_ml1vYBYzUnP",
  SERVICE_ID: "service_vokmozk",
  TEMPLATE_ID: "template_8z7vo4r",
};

// Initialize EmailJS SDK when library is loaded
if (typeof emailjs !== "undefined" && EMAILJS_CONFIG.PUBLIC_KEY && EMAILJS_CONFIG.PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
  try {
    emailjs.init({
      publicKey: EMAILJS_CONFIG.PUBLIC_KEY,
    });
  } catch (err) {
    console.warn("EmailJS init warning:", err);
  }
}

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const btn = document.getElementById("submit-btn");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    const nameVal = nameInput ? nameInput.value.trim() : "";
    const emailVal = emailInput ? emailInput.value.trim() : "";
    const subjectVal = (subjectInput && subjectInput.value.trim()) || "New Contact Message from Portfolio";
    const messageVal = messageInput ? messageInput.value.trim() : "";

    if (!nameVal || !emailVal || !messageVal) {
      if (formStatus) {
        formStatus.className = "form-status error";
        formStatus.textContent = "⚠️ Please fill in all required fields.";
      }
      return;
    }

    if (btn) {
      btn.textContent = "Sending Message... ⏳";
      btn.disabled = true;
    }
    if (formStatus) {
      formStatus.className = "form-status info";
      formStatus.textContent = "Connecting to mail server...";
    }

    // Format a crystal-clear message body with the sender's details attached
    const formattedMessage = `${messageVal}\n\n━━━━━━━━━━━━━━━━━━━━\n👤 Sender: ${nameVal}\n📧 Reply Email: ${emailVal}\n📌 Subject: ${subjectVal}`;

    // Comprehensive parameter bundle:
    // Ensures delivery to Shreyash's inbox regardless of whether the template's "To Email"
    // is configured as {{email}}, {{to_email}}, or {{recipient}}, while preserving sender info.
    const templateParams = {
      // Recipient target (guarantees delivery to Shreyash Debnath)
      email: "shreyashdebnath2@gmail.com",
      to_email: "shreyashdebnath2@gmail.com",
      recipient: "shreyashdebnath2@gmail.com",
      recipient_email: "shreyashdebnath2@gmail.com",
      to_name: "Shreyash Debnath",

      // Sender details (mapped across all common template variables)
      from_name: nameVal,
      name: nameVal,
      user_name: nameVal,
      sender_name: nameVal,

      from_email: emailVal,
      user_email: emailVal,
      sender_email: emailVal,
      visitor_email: emailVal,
      reply_to: emailVal,

      // Subject & Message
      subject: subjectVal,
      title: subjectVal,
      message: formattedMessage,
      message_html: formattedMessage.replace(/\n/g, "<br>"),
    };

    function showMailtoFallback(reason) {
      if (btn) {
        btn.textContent = "Send via Email Client ✉️";
        btn.disabled = false;
        btn.style.background = "#f59e0b";
        btn.style.color = "#000";
      }
      const mailtoUrl = `mailto:shreyashdebnath2@gmail.com?subject=${encodeURIComponent(subjectVal)}&body=${encodeURIComponent(formattedMessage)}`;
      if (formStatus) {
        formStatus.className = "form-status error";
        formStatus.innerHTML = `⚠️ <strong>Notice:</strong> ${escapeHtml(reason)}<br><a href="${mailtoUrl}" style="display:inline-block;margin-top:8px;padding:6px 14px;background:#00f5d4;color:#040911;border-radius:20px;font-weight:700;text-decoration:none;">🚀 Click Here to Open in Gmail / Mail App</a>`;
      }
    }

    if (typeof emailjs === "undefined") {
      console.error("EmailJS SDK not loaded");
      showMailtoFallback("EmailJS library could not be loaded. Send directly via your mail client:");
      return;
    }

    emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    )
      .then((response) => {
        console.log("EmailJS Sent Successfully:", response.status, response.text);
        if (btn) {
          btn.textContent = "Message Sent! ✅";
          btn.style.background = "#4ade80";
          btn.style.color = "#000";
        }
        if (formStatus) {
          formStatus.className = "form-status success";
          formStatus.innerHTML = `✅ <strong>Message Sent Successfully!</strong> Thank you <strong>${escapeHtml(nameVal)}</strong>, your message has been delivered to Shreyash's inbox (shreyashdebnath2@gmail.com).`;
        }
        if (window.CyberAudio) window.CyberAudio.playSuccess();
        contactForm.reset();
        setTimeout(() => {
          if (btn) {
            btn.textContent = "Send Message 🚀";
            btn.disabled = false;
            btn.style.background = "";
            btn.style.color = "";
          }
        }, 5000);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        const errMsg = error && (error.text || error.message) ? (error.text || error.message) : "Failed to deliver message.";
        showMailtoFallback(errMsg);
      });
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const hash = this.getAttribute("href");
    if (!hash || hash === "#") return;
    const target = document.querySelector(hash);
    if (target) {
      e.preventDefault();
      const navHeight = 70;
      const targetOffset = Math.max(0, target.getBoundingClientRect().top + window.scrollY - navHeight);
      window.scrollTo({
        top: targetOffset,
        behavior: "smooth"
      });
    }
  });
});

// ===== KESHAV-INSPIRED CUSTOM CURSOR (ZERO-DELAY POINTER + SMOOTH RING FOLLOWER) =====
const cursorDot = document.getElementById("cursor-dot");
const cursorRing = document.getElementById("cursor-ring");
const ambientGlow = document.getElementById("ambient-cursor-glow");

// Global scroll active flag for decoupling expensive hover transforms during scrolling
let isScrollingWindow = false;
let scrollIdleTimer = null;
window.addEventListener("scroll", () => {
  isScrollingWindow = true;
  clearTimeout(scrollIdleTimer);
  scrollIdleTimer = setTimeout(() => {
    isScrollingWindow = false;
  }, 90);
}, { passive: true });

if (cursorDot && cursorRing && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  let isInitialized = false;
  let mouseX = -200, mouseY = -200;
  let ringX = -200, ringY = -200;
  let lastRingX = -200, lastRingY = -200;

  // Immediate, zero-delay hardware update on pointermove & mousemove
  function onPointerMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isInitialized) {
      ringX = mouseX;
      ringY = mouseY;
      lastRingX = ringX;
      lastRingY = ringY;
      cursorDot.style.opacity = "1";
      cursorRing.style.opacity = "1";
      if (ambientGlow) ambientGlow.style.opacity = "0.75";
      isInitialized = true;
    }

    // Zero-delay 1:1 hardware coordinates on the main dot pointer
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  }

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("mousemove", onPointerMove, { passive: true });

  // Smooth follower RAF loop for the delicate outer ring
  function animateCursorFollowers() {
    if (isInitialized) {
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        ringX += dx * 0.18;
        ringY += dy * 0.18;

        if (Math.abs(ringX - lastRingX) > 0.1 || Math.abs(ringY - lastRingY) > 0.1) {
          lastRingX = ringX;
          lastRingY = ringY;
          cursorRing.style.left = `${ringX.toFixed(2)}px`;
          cursorRing.style.top = `${ringY.toFixed(2)}px`;

          if (ambientGlow) {
            ambientGlow.style.transform = `translate3d(${ringX.toFixed(1)}px, ${ringY.toFixed(1)}px, 0)`;
          }
        }
      }
    }
    requestAnimationFrame(animateCursorFollowers);
  }
  requestAnimationFrame(animateCursorFollowers);

  // Keshav-style State Management:
  // .ch = interactive hover (links, buttons, clickable cards)
  // .ct = text input caret (inputs, textareas)
  // .cc = tactile click compression (mousedown)
  const hoverSelector = "a, button, input[type='submit'], input[type='button'], label, [role='button'], .btn, .skill-pill, .project-card, .achievement-card, .timeline-card, .social-icon, .hamburger, .t-tag, .tech-chip, .skill-card-modern, .highlight-item, .recruiter-highlight-banner, .project-img-wrap, .lightbox-close, .browser-ext-link, .cert-proof-btn, .cert-preview-wrap, .cert-link-badge, .scroll-to-top, .copy-email-badge, .hero-hire-pill";
  const textSelector = "input:not([type='submit']):not([type='button']):not([type='checkbox']):not([type='radio']):not([type='range']):not([type='file']), textarea, [contenteditable='true']";

  document.addEventListener("mouseover", (e) => {
    if (!e.target || !e.target.closest) return;

    if (e.target.closest(textSelector)) {
      document.body.classList.add("ct");
      document.body.classList.remove("ch");
    } else if (e.target.closest(hoverSelector)) {
      document.body.classList.add("ch");
      document.body.classList.remove("ct");
    }
  }, { passive: true });

  document.addEventListener("mouseout", (e) => {
    if (!e.relatedTarget || !e.relatedTarget.closest) {
      document.body.classList.remove("ch", "ct");
      return;
    }

    const nextIsText = e.relatedTarget.closest(textSelector);
    const nextIsHover = e.relatedTarget.closest(hoverSelector);

    if (nextIsText) {
      document.body.classList.add("ct");
      document.body.classList.remove("ch");
    } else if (nextIsHover) {
      document.body.classList.add("ch");
      document.body.classList.remove("ct");
    } else {
      document.body.classList.remove("ch", "ct");
    }
  }, { passive: true });

  // Tactile click feedback (.cc) & cyber ripple pulse
  window.addEventListener("mousedown", (e) => {
    document.body.classList.add("cc");

    const ripple = document.createElement("div");
    ripple.className = "cursor-ripple";
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 450);
  });

  window.addEventListener("mouseup", () => {
    document.body.classList.remove("cc");
  });

  // Fade out cursor when mouse leaves browser window
  document.addEventListener("mouseleave", () => {
    cursorDot.style.opacity = "0";
    cursorRing.style.opacity = "0";
    if (ambientGlow) ambientGlow.style.opacity = "0";
    document.body.classList.remove("ch", "ct", "cc");
  });

  document.addEventListener("mouseenter", () => {
    cursorDot.style.opacity = "1";
    cursorRing.style.opacity = "1";
    if (ambientGlow) ambientGlow.style.opacity = "0.75";
  });
}

// ===== 3D CARD TILT & INTERACTIVE SPOTLIGHT (GPU-OPTIMIZED & SCROLL PROTECTED) =====
const tiltCards = document.querySelectorAll(".skill-card-modern, .project-card, .achievement-card");

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  tiltCards.forEach(card => {
    let bounds = null;
    let tiltRaf = null;

    card.addEventListener("mouseenter", () => {
      if (isScrollingWindow) return;
      bounds = card.getBoundingClientRect();
      card.style.setProperty('--spotlight-opacity', '1');
      card.style.transition = "transform 0.1s ease-out, border-color 0.3s ease, box-shadow 0.3s ease";
    });

    card.addEventListener("mousemove", (e) => {
      if (isScrollingWindow) return;
      if (!bounds) bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      if (tiltRaf) cancelAnimationFrame(tiltRaf);
      tiltRaf = requestAnimationFrame(() => {
        const xPct = ((mouseX / bounds.width) * 100).toFixed(1);
        const yPct = ((mouseY / bounds.height) * 100).toFixed(1);

        card.style.setProperty('--mouse-x', `${xPct}%`);
        card.style.setProperty('--mouse-y', `${yPct}%`);

        // Subtle, refined 3D tilt
        const xOffset = (mouseX / bounds.width) - 0.5;
        const yOffset = (mouseY / bounds.height) - 0.5;

        const tiltX = (yOffset * -6).toFixed(2);
        const tiltY = (xOffset * 6).toFixed(2);

        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px) scale3d(1.01, 1.01, 1.01)`;
      });
    });

    card.addEventListener("mouseleave", () => {
      if (tiltRaf) cancelAnimationFrame(tiltRaf);
      card.style.setProperty('--spotlight-opacity', '0');
      card.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.35s ease";
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)";
      bounds = null;
    });
  });
}

// ===== FULLSCREEN PROJECT IMAGE LIGHTBOX =====
const lightbox = document.getElementById("image-lightbox");
const lightboxImg = lightbox ? lightbox.querySelector(".lightbox-img") : null;
const lightboxTitle = lightbox ? lightbox.querySelector(".lightbox-title") : null;
const lightboxLink = lightbox ? lightbox.querySelector(".lightbox-actions a") : null;
const lightboxClose = document.getElementById("lightbox-close");
const lightboxOverlay = document.getElementById("lightbox-overlay");

const nextshopTrigger = document.getElementById("nextshop-preview-trigger");
const ecocommandTrigger = document.getElementById("ecocommand-preview-trigger");
const apexvisaTrigger = document.getElementById("apexvisa-preview-trigger");

function openProjectLightbox(imgSrc, titleHtml, actionUrl, actionText) {
  if (!lightbox) return;
  if (lightboxImg) lightboxImg.src = imgSrc;
  if (lightboxTitle) lightboxTitle.innerHTML = titleHtml;
  if (lightboxLink) {
    lightboxLink.href = actionUrl;
    lightboxLink.textContent = actionText;
  }
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProjectLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

if (nextshopTrigger) {
  nextshopTrigger.addEventListener("click", () => {
    openProjectLightbox("assets/nextshop.png?v=2", '<span class="accent">NextShop</span> — High-Resolution Store Preview', "https://nextshop-coral-rho.vercel.app/", "Open Store ↗");
  });
}

if (ecocommandTrigger) {
  ecocommandTrigger.addEventListener("click", () => {
    openProjectLightbox("assets/ecocommand.png", '<span class="accent">Eco-Command</span> — Municipal Waste Management & Fleet Tracking', "https://www.youtube.com/watch?v=Ys-yf6mtv4s", "Watch Demo ↗");
  });
}

if (apexvisaTrigger) {
  apexvisaTrigger.addEventListener("click", () => {
    openProjectLightbox("assets/apexvisa.png", '<span class="accent">ApexVisa</span> — Immigration & Education Consultancy Platform', "https://visa-portal-six.vercel.app/", "Open Website ↗");
  });
}

// Certificate previews in fullscreen lightbox
document.querySelectorAll(".cert-preview-wrap").forEach(wrap => {
  wrap.addEventListener("click", () => {
    const certType = wrap.getAttribute("data-cert");
    if (certType === "buildathon") {
      openProjectLightbox(
        "assets/cert-buildathon.png",
        '<span class="accent">OpenAI Academy &times; NxtWave Regional Buildathon</span> — Official Certificate Proof',
        "https://cdn1.ccbp.in/misc/openai-rg-c/GG2ZO1SFVZ.png",
        "Open Official CCBP Link ↗"
      );
    } else if (certType === "takeover") {
      openProjectLightbox(
        "assets/cert-takeover.png",
        '<span class="accent">NIAT Takeover Hackathon</span> — Official Certificate Proof',
        "https://s3-ap-south-1.amazonaws.com/poster-generation-backend-nxtwave-media-static/misc/NIAT-HACKATHON-CER/TZ88ZPCGQ2.png",
        "Open Official S3 Link ↗"
      );
    }
  });
});

if (lightboxClose) lightboxClose.addEventListener("click", closeProjectLightbox);
if (lightboxOverlay) lightboxOverlay.addEventListener("click", closeProjectLightbox);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox && lightbox.classList.contains("active")) {
    closeProjectLightbox();
  }
});

// ===== ONE-CLICK COPY EMAIL BADGE =====
const copyEmailBtn = document.getElementById("copy-email-btn");
const emailToCopy = "shreyashdebnath2@gmail.com";

if (copyEmailBtn) {
  let tooltipTimeout;
  copyEmailBtn.addEventListener("click", () => {
    function showCopiedState() {
      copyEmailBtn.classList.add("copied");
      const label = copyEmailBtn.querySelector(".copy-label");
      if (label) label.textContent = "Copied!";
      if (window.CyberAudio) window.CyberAudio.playSuccess();
      clearTimeout(tooltipTimeout);
      tooltipTimeout = setTimeout(() => {
        copyEmailBtn.classList.remove("copied");
        if (label) label.textContent = "Copy";
      }, 2500);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(emailToCopy)
        .then(showCopiedState)
        .catch(() => fallbackCopy(emailToCopy, showCopiedState));
    } else {
      fallbackCopy(emailToCopy, showCopiedState);
    }
  });
}

function fallbackCopy(text, cb) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    if (cb) cb();
  } catch (err) {
    console.error("Clipboard copy error:", err);
  }
  document.body.removeChild(ta);
}

// ===== DYNAMIC LEETCODE STATS FETCHER (@shreyash-coder40) =====
function initLeetCodeStats() {
  const totalEl = document.getElementById("lc-total-solved");
  const easyEl = document.getElementById("lc-easy-solved");
  const medEl = document.getElementById("lc-med-solved");
  const hardEl = document.getElementById("lc-hard-solved");
  const easyTotalEl = document.getElementById("lc-easy-total");
  const medTotalEl = document.getElementById("lc-med-total");
  const hardTotalEl = document.getElementById("lc-hard-total");
  const easyBar = document.getElementById("lc-easy-bar");
  const medBar = document.getElementById("lc-med-bar");
  const hardBar = document.getElementById("lc-hard-bar");
  const rankingVal = document.getElementById("lc-ranking-val");
  const recentList = document.getElementById("lc-recent-list");
  const gaugeEasy = document.getElementById("gauge-easy");

  if (!totalEl) return;

  const LEETCODE_API = "https://leetcode-api-faisalshohag.vercel.app/shreyash-coder40";

  fetch(LEETCODE_API)
    .then(res => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then(data => {
      const totalSolved = data.totalSolved || 127;
      const easySolved = data.easySolved || 60;
      const medSolved = data.mediumSolved || 53;
      const hardSolved = data.hardSolved || 14;

      const totalEasy = data.totalEasy || 971;
      const totalMed = data.totalMedium || 2128;
      const totalHard = data.totalHard || 983;

      if (totalEl) totalEl.textContent = totalSolved;
      if (easyEl) easyEl.textContent = easySolved;
      if (medEl) medEl.textContent = medSolved;
      if (hardEl) hardEl.textContent = hardSolved;

      if (easyTotalEl) easyTotalEl.textContent = totalEasy;
      if (medTotalEl) medTotalEl.textContent = totalMed;
      if (hardTotalEl) hardTotalEl.textContent = totalHard;

      // Update progress bars with realistic visual widths
      if (easyBar) easyBar.style.width = `${Math.min(100, Math.max(12, (easySolved / 150) * 100)).toFixed(1)}%`;
      if (medBar) medBar.style.width = `${Math.min(100, Math.max(10, (medSolved / 150) * 100)).toFixed(1)}%`;
      if (hardBar) hardBar.style.width = `${Math.min(100, Math.max(6, (hardSolved / 150) * 100)).toFixed(1)}%`;

      // Update ranking if available
      if (data.ranking && rankingVal) {
        rankingVal.textContent = `#${Number(data.ranking).toLocaleString()}`;
      }

      // Update gauge circle offset (circumference 314)
      if (gaugeEasy) {
        const pct = Math.min(1, totalSolved / 250);
        const offset = Math.max(20, 314 - (pct * 314));
        gaugeEasy.style.strokeDashoffset = `${offset.toFixed(0)}`;
      }

      // Render recent accepted problems if provided
      if (data.recentSubmissions && Array.isArray(data.recentSubmissions) && data.recentSubmissions.length > 0 && recentList) {
        const accepted = data.recentSubmissions
          .filter(s => s.statusDisplay === "Accepted")
          .slice(0, 3);
        
        if (accepted.length > 0) {
          recentList.innerHTML = accepted.map(item => `
            <span class="recent-problem-pill">
              ${item.title} <span class="lang-tag">${(item.lang || 'cpp').toUpperCase()}</span>
            </span>
          `).join('');
        }
      }
    })
    .catch(err => {
      console.warn("LeetCode live API sync fallback to cached metrics:", err);
    });
}
initLeetCodeStats();

// ===== CYBER UI SOUND FX ENGINE (WEB AUDIO API) =====
function initCyberSoundFX() {
  const soundToggleBtn = document.getElementById("sound-toggle-btn");
  const soundIcon = document.getElementById("sound-icon");
  let audioCtx = null;
  let isSoundEnabled = false;

  // Read stored preference, defaulting to false (polite opt-in audio)
  try {
    const saved = localStorage.getItem("portfolio_sound_enabled");
    if (saved === "true") {
      isSoundEnabled = true;
    }
  } catch (e) {
    isSoundEnabled = false;
  }

  function getAudioContext() {
    if (!audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtx = new AudioCtx();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  let toastEl = null;
  let toastTimer = null;
  function displaySoundToast(text) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "sound-toast";
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = text;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove("show");
    }, 2200);
  }

  // Update UI state
  function updateSoundUI(showToast = false, message = "") {
    if (!soundToggleBtn || !soundIcon) return;
    if (isSoundEnabled) {
      soundToggleBtn.classList.add("sound-on");
      soundIcon.textContent = "🔊";
      soundToggleBtn.setAttribute("title", "Mute Cyber Sound FX (Sound ON)");
      soundToggleBtn.setAttribute("aria-label", "Mute Cyber Sound FX");
    } else {
      soundToggleBtn.classList.remove("sound-on");
      soundIcon.textContent = "🔇";
      soundToggleBtn.setAttribute("title", "Enable Cyber Sound FX (Synthesized Sci-Fi Audio)");
      soundToggleBtn.setAttribute("aria-label", "Enable Cyber Sound FX");
    }

    if (showToast) {
      displaySoundToast(message || (isSoundEnabled ? "🔊 Cyber Audio FX: ON" : "🔇 Cyber Audio FX: MUTED"));
    }
  }

  // Initial UI sync
  updateSoundUI(false);

  // 1. Soft Cyber Click (Interactive Buttons, Navigation, Cards)
  function playCyberClick() {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.032);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.032);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);
    } catch (e) {}
  }

  // 2. Mechanical Terminal Keystroke
  function playTerminalKey() {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      // Organic mechanical pitch jitter (420Hz +/- 35Hz)
      const pitch = 420 + (Math.random() * 70 - 35);
      osc.type = "triangle";
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.4, now + 0.024);
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.024);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.026);
    } catch (e) {}
  }

  // 3. Cyber Theme Shift Chime (Harmonic intervals tailored to palette vibe)
  function playThemeShift(themeKey) {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const chordMap = {
        cyan: [587.33, 880],       // D5 -> A5
        violet: [523.25, 783.99],  // C5 -> G5
        emerald: [659.25, 987.77], // E5 -> B5
        amber: [440, 659.25]       // A4 -> E5
      };
      const notes = chordMap[themeKey] || chordMap.cyan;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        const noteStart = now + (idx * 0.035);
        osc.frequency.setValueAtTime(freq, noteStart);
        gain.gain.setValueAtTime(0.036, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(noteStart);
        osc.stop(noteStart + 0.17);
      });
    } catch (e) {}
  }

  // 4. Terminal Command Execution Chirp
  function playTerminalCommand() {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.05);
      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.055);
    } catch (e) {}
  }

  // 5. Celebration / Success Arpeggio (Copy Email, Hire Shreyash, Resume)
  function playSuccessChime() {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        const startTime = now + (i * 0.055);
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.04, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.23);
      });
    } catch (e) {}
  }

  // 6. Terminal Error / Unknown Command Buzz
  function playErrorBeep() {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(170, now);
      osc.frequency.exponentialRampToValueAtTime(95, now + 0.06);
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.065);
    } catch (e) {}
  }

  // Toggle Sound State
  function toggleSound(forceState) {
    if (typeof forceState === "boolean") {
      isSoundEnabled = forceState;
    } else {
      isSoundEnabled = !isSoundEnabled;
    }

    try {
      localStorage.setItem("portfolio_sound_enabled", isSoundEnabled ? "true" : "false");
    } catch (e) {}

    updateSoundUI(true);

    if (isSoundEnabled) {
      const ctx = getAudioContext();
      if (ctx) {
        try {
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.085);
        } catch (e) {}
      }
    }
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener("click", () => {
      toggleSound();
    });
  }

  // Expose sound API globally
  window.CyberAudio = {
    playClick: playCyberClick,
    playKey: playTerminalKey,
    playTheme: playThemeShift,
    playCommand: playTerminalCommand,
    playSuccess: playSuccessChime,
    playError: playErrorBeep,
    toggle: toggleSound,
    isEnabled: () => isSoundEnabled
  };

  // Global subtle click feedback on interactive buttons and navigation links
  document.addEventListener("click", (e) => {
    const target = e.target.closest("button, a, .term-quick-pill, .filter-chip, .project-card, .skill-card-modern, .hero-resume-btn, .nav-resume-pill");
    if (!target) return;
    if (target.id === "sound-toggle-btn" || target.closest("#sound-toggle-btn")) return;
    if (target.hasAttribute("data-set-theme")) return;
    if (target.id === "copy-email-badge" || target.closest("#copy-email-badge")) return;
    
    playCyberClick();
  }, { passive: true });
}
initCyberSoundFX();

// ===== CYBER THEME ACCENT SWITCHER =====
function initThemeSwitcher() {
  const switcher = document.getElementById("theme-switcher");
  const toggleBtn = document.getElementById("theme-toggle-btn");
  const currentSwatch = document.getElementById("current-theme-swatch");
  const themeOpts = document.querySelectorAll(".theme-opt[data-set-theme]");

  if (!switcher || !toggleBtn) return;

  const themeColors = {
    cyan: "#00f5d4",
    violet: "#c084fc",
    emerald: "#10b981",
    amber: "#f59e0b"
  };

  function applyTheme(themeKey, saveToStorage = true) {
    if (!themeColors[themeKey]) themeKey = "cyan";

    document.documentElement.setAttribute("data-theme", themeKey);

    // Update active class on dropdown options
    themeOpts.forEach(opt => {
      const isSelected = opt.getAttribute("data-set-theme") === themeKey;
      opt.classList.toggle("active", isSelected);
      opt.setAttribute("aria-selected", isSelected ? "true" : "false");
    });

    // Update current swatch color indicator
    if (currentSwatch) {
      currentSwatch.style.backgroundColor = themeColors[themeKey];
      currentSwatch.style.boxShadow = `0 0 10px ${themeColors[themeKey]}`;
    }

    if (saveToStorage) {
      try {
        localStorage.setItem("portfolio_theme_accent", themeKey);
      } catch (e) {
        /* ignore localStorage errors */
      }
    }
  }

  // Toggle dropdown open/close
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = switcher.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (window.CyberAudio) window.CyberAudio.playClick();
  });

  // Theme option clicks
  themeOpts.forEach(opt => {
    opt.addEventListener("click", (e) => {
      e.stopPropagation();
      const themeKey = opt.getAttribute("data-set-theme");
      applyTheme(themeKey, true);
      if (window.CyberAudio) window.CyberAudio.playTheme(themeKey);
      switcher.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!switcher.contains(e.target)) {
      switcher.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Close on Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && switcher.classList.contains("open")) {
      switcher.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Sync initial state from data-theme or storage
  let currentTheme = "cyan";
  try {
    currentTheme = localStorage.getItem("portfolio_theme_accent") || document.documentElement.getAttribute("data-theme") || "cyan";
  } catch (e) {
    currentTheme = document.documentElement.getAttribute("data-theme") || "cyan";
  }
  applyTheme(currentTheme, false);
}
initThemeSwitcher();

// ===== RESUME FULLSCREEN MODAL CONTROLLER =====
function initResumeModal() {
  const resumeModal = document.getElementById("resume-modal");
  const resumeClose = document.getElementById("resume-close");
  const resumeOverlay = document.getElementById("resume-overlay");
  const previewTrigger = document.getElementById("preview-resume-trigger");

  function openResume() {
    if (!resumeModal) return;
    resumeModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeResume() {
    if (!resumeModal) return;
    resumeModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (previewTrigger) {
    previewTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      openResume();
    });
  }

  if (resumeClose) resumeClose.addEventListener("click", closeResume);
  if (resumeOverlay) resumeOverlay.addEventListener("click", closeResume);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && resumeModal && resumeModal.classList.contains("active")) {
      closeResume();
    }
  });
}
initResumeModal();



// ===== DYNAMIC GITHUB STREAK STATS FETCHER (@Shreyash-coder40) =====
function initGitHubStats() {
  const totalContribsEl = document.getElementById("gh-total-contribs");
  const firstDateEl = document.getElementById("gh-first-date");
  const currentStreakEl = document.getElementById("gh-current-streak");
  const currentDatesEl = document.getElementById("gh-current-dates");
  const longestStreakEl = document.getElementById("gh-longest-streak");
  const longestDatesEl = document.getElementById("gh-longest-dates");

  if (!totalContribsEl) return;

  function formatStreakDate(dateStr) {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-").map(Number);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[m - 1]} ${d}`;
  }

  function formatYearDate(dateStr) {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-").map(Number);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[m - 1]} ${d}, ${y}`;
  }

  const STREAK_API = "https://streak-stats.demolab.com/?user=Shreyash-coder40&type=json";

  fetch(STREAK_API)
    .then(res => res.ok ? res.json() : null)
    .then(data => {
      if (!data) return;

      // 1. Total Contributions
      if (data.totalContributions !== undefined) {
        totalContribsEl.textContent = data.totalContributions;
      }
      if (data.firstContribution && firstDateEl) {
        firstDateEl.textContent = `${formatYearDate(data.firstContribution)} - Present`;
      }

      // 2. Current Streak
      if (data.currentStreak) {
        const curLen = data.currentStreak.length ?? 0;
        currentStreakEl.textContent = curLen;

        if (currentDatesEl && data.currentStreak.start && data.currentStreak.end) {
          currentDatesEl.textContent = `${formatStreakDate(data.currentStreak.start)} - ${formatStreakDate(data.currentStreak.end)}`;
        }
      }

      // 3. Longest Streak
      if (data.longestStreak) {
        longestStreakEl.textContent = data.longestStreak.length ?? 18;

        if (longestDatesEl && data.longestStreak.start && data.longestStreak.end) {
          longestDatesEl.textContent = `${formatStreakDate(data.longestStreak.start)} - ${formatStreakDate(data.longestStreak.end)}`;
        }
      }
    })
    .catch(err => {
      console.warn("GitHub Streak API fallback to cached metrics:", err);
    });
}
initGitHubStats();

// ===== INTERACTIVE CLI TERMINAL EASTER EGG (shreyash@portfolio:~$) =====
function initInteractiveTerminal() {
  const drawer = document.getElementById("terminal-drawer");
  const triggerBtn = document.getElementById("terminal-trigger-btn");
  const closeBtn = document.getElementById("term-close-btn");
  const headerCloseBtn = document.getElementById("term-header-close-btn");
  const minBtn = document.getElementById("term-min-btn");
  const maxBtn = document.getElementById("term-max-btn");
  const inputEl = document.getElementById("term-input");
  const outputEl = document.getElementById("term-output");
  const bodyEl = document.getElementById("term-body");
  const quickPills = document.querySelectorAll(".term-quick-pill");

  if (!drawer || !inputEl || !outputEl) return;

  let commandHistory = [];
  let historyIndex = -1;
  let isInitialized = false;

  const validCommands = [
    "help", "about", "skills", "projects", "stats",
    "resume", "contact", "theme", "sound", "audio", "brief", "pitch", "recruiter", "summary", "ls", "cat",
    "whoami", "date", "sudo", "clear", "cls", "exit"
  ];

  function openTerminal() {
    drawer.classList.add("active");
    drawer.setAttribute("aria-hidden", "false");
    if (window.CyberAudio) window.CyberAudio.playClick();
    if (!isInitialized) {
      renderWelcomeBanner();
      isInitialized = true;
    }
    setTimeout(() => {
      inputEl.focus();
    }, 50);
  }

  function closeTerminal() {
    drawer.classList.remove("active");
    drawer.setAttribute("aria-hidden", "true");
    if (window.CyberAudio) window.CyberAudio.playClick();
  }

  function toggleTerminal() {
    if (drawer.classList.contains("active")) {
      closeTerminal();
    } else {
      openTerminal();
    }
  }

  // Toggle button click
  if (triggerBtn) {
    triggerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleTerminal();
    });
  }

  // Close buttons
  if (closeBtn) closeBtn.addEventListener("click", closeTerminal);
  if (headerCloseBtn) headerCloseBtn.addEventListener("click", closeTerminal);
  if (minBtn) minBtn.addEventListener("click", closeTerminal);

  // Maximize / Restore button
  if (maxBtn) {
    maxBtn.addEventListener("click", () => {
      drawer.classList.toggle("maximized");
      if (window.CyberAudio) window.CyberAudio.playClick();
      inputEl.focus();
    });
  }

  // Click anywhere in terminal body to focus input
  if (bodyEl) {
    bodyEl.addEventListener("click", (e) => {
      if (e.target.tagName !== "A") {
        inputEl.focus();
      }
    });
  }

  // Global keydown: ` or ~ toggles terminal (unless user is in another input/textarea)
  window.addEventListener("keydown", (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
    const isEditing = activeTag === "input" || activeTag === "textarea";

    if (e.key === "`" || e.key === "~") {
      if (!isEditing || document.activeElement === inputEl) {
        e.preventDefault();
        toggleTerminal();
      }
    } else if (e.key === "Escape" && drawer.classList.contains("active")) {
      closeTerminal();
    }
  });

  function renderWelcomeBanner() {
    outputEl.innerHTML = `
<div class="term-line term-banner-ascii">
╔════════════════════════════════════════════════════════════╗
║   SHREYASH DEBNATH — CLI v2.4.0 (x86_64-pc-portfolio)      ║
║   Interactive Recruiter &amp; Developer Console            ║
╚════════════════════════════════════════════════════════════╝</div>
<div class="term-line term-dim">Type <span class="term-accent">help</span> to view available commands, or click any quick pill below.</div>
<div class="term-line term-dim">Quick: Type <span class="term-accent">brief</span> for 60s summary &bull; <span class="term-accent">sound</span> for audio FX &bull; <span class="term-gold">sudo hire</span></div>
`;
    scrollToBottom();
  }

  function scrollToBottom() {
    if (bodyEl) {
      bodyEl.scrollTop = bodyEl.scrollHeight;
    }
  }

  function printLine(content, type = "") {
    const line = document.createElement("div");
    line.className = `term-line ${type}`;
    line.innerHTML = content;
    outputEl.appendChild(line);
    scrollToBottom();
  }

  function executeCommand(rawCmd) {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Record in history
    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;

    // Echo the executed command
    printLine(`
      <div class="term-cmd-echo">
        <span class="term-prompt">
          <span class="prompt-user">shreyash</span><span class="prompt-at">@</span><span class="prompt-host">portfolio</span>:<span class="prompt-path">~</span><span class="prompt-dollar">$</span>
        </span>
        <strong>${escapeHtml(trimmed)}</strong>
      </div>
    `);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case "help":
        printLine(`
<span class="term-gold">AVAILABLE COMMANDS:</span>
  <span class="term-accent">brief</span> (pitch)    - Open 60-Second Recruiter Summary &amp; Pitch modal
  <span class="term-accent">about</span>          - Bio, education, CGPA &amp; current focus
  <span class="term-accent">skills</span>         - Full technical stack &amp; proficiencies
  <span class="term-accent">projects</span>       - Flagship full-stack &amp; AI projects + repos
  <span class="term-accent">stats</span>          - Live LeetCode &amp; GitHub contribution metrics
  <span class="term-accent">resume</span>         - Launch official PDF resume viewer
  <span class="term-accent">contact</span>        - Email, LinkedIn &amp; smooth scroll to contact
  <span class="term-accent">theme [color]</span>  - Change cyber accent (cyan, violet, emerald, amber)
  <span class="term-accent">sound [on|off]</span> - Toggle cyber audio FX (synthesized Web Audio)
  <span class="term-accent">ls</span>             - List virtual repository files
  <span class="term-accent">cat &lt;file&gt;</span>     - View contents of a file (e.g. cat resume.txt)
  <span class="term-accent">whoami</span>         - Display current guest user session
  <span class="term-accent">date</span>           - Display current system date &amp; time
  <span class="term-gold">sudo hire</span>      - Unlock instant Recruiter Hire Protocol!
  <span class="term-accent">clear</span> (cls)     - Clear terminal display
  <span class="term-accent">exit</span>           - Close this terminal window
`);
        break;

      case "about":
        printLine(`
<span class="term-accent">SHREYASH DEBNATH</span>
────────────────────────────────────────────────────────
<span class="term-gold">Degree:</span>   B.Tech Software Engineering (2nd Year, Year 2026)
<span class="term-gold">CGPA:</span>     9.3 / 10
<span class="term-gold">College:</span>  NIAT VGU, Jaipur, Rajasthan
<span class="term-gold">Focus:</span>    Full-Stack Systems, Next.js, Python, C++, DSA &amp; GenAI
<span class="term-gold">Status:</span>   <span class="term-success">● Open to Software Engineering Internships</span>
<span class="term-gold">Email:</span>    shreyashdebnath2@gmail.com
`);
        break;

      case "skills":
        printLine(`
<span class="term-accent">TECHNICAL STACK &amp; PROFICIENCY:</span>
────────────────────────────────────────────────────────
<span class="term-gold">[LANGUAGES]</span>   C++, Python, JavaScript (ES6+), TypeScript, SQL, HTML5/CSS3
<span class="term-gold">[FRONTEND]</span>    Next.js 15, React 19, TailwindCSS, Vanilla CSS, Vite
<span class="term-gold">[BACKEND]</span>     Node.js, Express, Python (FastAPI/Flask), REST APIs
<span class="term-gold">[DATABASES]</span>   PostgreSQL, MongoDB, Supabase, Firebase
<span class="term-gold">[AI &amp; ML]</span>     Gemini 2.5 Flash, Prompt Engineering, RAG Chains, Suno
<span class="term-gold">[TOOLS]</span>       Git, GitHub, Docker, n8n Automation, Linux, VS Code
<span class="term-gold">[DSA TRACK]</span>   LeetCode 1500+ Rating &bull; 125+ Verified Problems Solved
`);
        break;

      case "projects":
        printLine(`
<span class="term-accent">FEATURED PROJECTS:</span>
────────────────────────────────────────────────────────
1. <strong class="term-gold">NextShop (E-Commerce Platform)</strong>
   Full production AI storefront with Razorpay checkout &amp; Gemini chatbot.
   Demo: <a href="https://nextshop-coral-rho.vercel.app/" target="_blank" class="term-link">https://nextshop-coral-rho.vercel.app/ ↗</a>
   Code: <a href="https://github.com/Shreyash-coder40/E-commerce-Website" target="_blank" class="term-link">GitHub/E-commerce-Website ↗</a>

2. <strong class="term-gold">Study AI Assistant</strong>
   Gemini 2.5 Flash AI study companion with interactive Gradio interface.
   Code: <a href="https://github.com/Shreyash-coder40/Study-Ai-assistant-" target="_blank" class="term-link">GitHub/Study-Ai-assistant- ↗</a>

3. <strong class="term-gold">Aadhaar-Setu-Vision (UIDAI Hackathon)</strong>
   Analytics dashboard with Isolation Forest anomaly detection &amp; Prophet forecasting.
   Code: <a href="https://github.com/Shreyash-coder40/Aadhaar-Setu-Vision" target="_blank" class="term-link">GitHub/Aadhaar-Setu-Vision ↗</a>

4. <strong class="term-gold">DSA-Leetcode</strong>
   Curated solutions in modern C++ spanning Trees, Graphs, DP &amp; Arrays.
   Code: <a href="https://github.com/Shreyash-coder40/DSA-leetcode" target="_blank" class="term-link">GitHub/DSA-leetcode ↗</a>
`);
        break;

      case "stats":
        printLine(`
<span class="term-accent">LIVE PERFORMANCE METRICS:</span>
────────────────────────────────────────────────────────
<span class="term-gold">LeetCode DSA:</span>
  • Total Solved: 127+ Problems (Easy: 60 | Med: 53 | Hard: 14)
  • Contest Rating: 1500+
  • Global Ranking: Top ~1.39M
  • Profile: <a href="https://leetcode.com/u/shreyash-coder40/" target="_blank" class="term-link">leetcode.com/u/shreyash-coder40/ ↗</a>

<span class="term-gold">GitHub Open Source:</span>
  • Total Contributions: 656+
  • Longest Streak: 18 Days (Jun 27 - Jul 14)
  • Current Streak: Active 🔥
  • Profile: <a href="https://github.com/Shreyash-coder40" target="_blank" class="term-link">github.com/Shreyash-coder40 ↗</a>
`);
        break;

      case "resume":
        printLine(`Opening official resume viewer... <span class="term-success">[PDF Loaded]</span>`);
        const resumeTrigger = document.getElementById("preview-resume-trigger");
        if (resumeTrigger) {
          resumeTrigger.click();
        } else {
          window.open("assets/shreyash-resume.pdf", "_blank");
        }
        break;

      case "contact":
        printLine(`
<span class="term-accent">GET IN TOUCH:</span>
────────────────────────────────────────────────────────
Email:    <a href="mailto:shreyashdebnath2@gmail.com" class="term-link">shreyashdebnath2@gmail.com</a>
GitHub:   <a href="https://github.com/Shreyash-coder40" target="_blank" class="term-link">github.com/Shreyash-coder40</a>
LinkedIn: <a href="https://www.linkedin.com/in/shreyash-debnath-0719a93a1" target="_blank" class="term-link">linkedin.com/in/shreyash-debnath</a>
Location: Jaipur, Rajasthan, India

<span class="term-dim">Scrolling you down to contact form...</span>
`);
        const contactSec = document.getElementById("contact");
        if (contactSec) {
          contactSec.scrollIntoView({ behavior: "smooth" });
        }
        break;

      case "theme":
        const targetColor = (args[0] || "").toLowerCase();
        if (["cyan", "violet", "emerald", "amber"].includes(targetColor)) {
          const opt = document.querySelector(`.theme-opt[data-set-theme="${targetColor}"]`);
          if (opt) {
            opt.click();
            printLine(`Accent theme switched to <span class="term-accent">${targetColor.toUpperCase()}</span> ✨`, "term-success");
          }
        } else {
          printLine(`Usage: <span class="term-accent">theme [cyan | violet | emerald | amber]</span>`);
        }
        break;

      case "sound":
      case "audio":
        const sSub = (args[0] || "").toLowerCase();
        if (sSub === "on") {
          if (window.CyberAudio) window.CyberAudio.toggle(true);
          printLine(`Cyber Audio FX: <span class="term-success">ENABLED (🔊)</span>. Synthesized Web Audio active.`, "term-success");
        } else if (sSub === "off" || sSub === "mute") {
          if (window.CyberAudio) window.CyberAudio.toggle(false);
          printLine(`Cyber Audio FX: <span class="term-accent">MUTED (🔇)</span>.`);
        } else {
          const curr = window.CyberAudio && window.CyberAudio.isEnabled();
          if (window.CyberAudio) window.CyberAudio.toggle();
          printLine(`Cyber Audio FX: <span class="${!curr ? 'term-success' : 'term-accent'}">${!curr ? 'ENABLED 🔊' : 'MUTED 🔇'}</span> (Tip: use <span class="term-accent">sound on</span> or <span class="term-accent">sound off</span>)`);
        }
        break;

      case "summary":
      case "recruiter":
      case "brief":
      case "pitch":
        printLine(`
<span class="term-accent">EXECUTIVE CANDIDATE SUMMARY:</span>
────────────────────────────────────────────────────────
Candidate:    Shreyash Debnath
Education:    B.Tech Software Engineering (CGPA 9.3/10) • NIAT VGU Jaipur
Target Roles: Full-Stack Engineer / Backend / SDE Intern (2026)
Key Skills:   Next.js 15, React 19, Python, C++ (DSA LeetCode 1500+), PostgreSQL
Contact:      <a href="mailto:shreyashdebnath2@gmail.com" class="term-link">shreyashdebnath2@gmail.com</a>
`);
        break;

      case "ls":
        printLine(`about.md   projects/   resume.pdf   skills.json   contact.txt   secret.sh`);
        break;

      case "cat":
        const file = (args[0] || "").toLowerCase();
        if (!file) {
          printLine(`Usage: cat &lt;filename&gt; (try: cat about.md, cat resume.pdf, cat secret.sh)`);
        } else if (file === "about.md" || file === "about.txt") {
          printLine(`"I am a Software Engineering undergraduate at NIAT VGU Jaipur with CGPA 9.3/10. I build full-stack web products with Next.js, Python, Supabase, and AI models."`);
        } else if (file === "resume.pdf" || file === "resume.txt") {
          printLine(`Opening resume viewer...`);
          const rTrigger = document.getElementById("preview-resume-trigger");
          if (rTrigger) rTrigger.click();
        } else if (file === "skills.json") {
          printLine(`{\n  "languages": ["C++", "Python", "TypeScript", "JavaScript", "SQL"],\n  "frameworks": ["Next.js", "React", "FastAPI"],\n  "database": ["PostgreSQL", "MongoDB", "Supabase"],\n  "cgpa": 9.3\n}`);
        } else if (file === "contact.txt") {
          printLine(`Email: shreyashdebnath2@gmail.com | Location: Jaipur, Rajasthan`);
        } else if (file === "secret.sh") {
          printLine(`echo "Try typing: <span class='term-gold'>sudo hire-shreyash</span>"`);
        } else {
          if (window.CyberAudio) window.CyberAudio.playError();
          printLine(`cat: ${escapeHtml(file)}: No such file or directory`, "term-error");
        }
        break;

      case "sudo":
        const sub = args.join(" ").toLowerCase();
        if (sub.includes("hire")) {
          if (window.CyberAudio) window.CyberAudio.playSuccess();
          printLine(`
<span class="term-gold">[AUTHENTICATING ROOT RECRUITER PRIVILEGES...]</span>
<span class="term-success">████████████████████████████████ 100% ACCESS GRANTED!</span>

<span class="term-accent">🎉 HIRING OFFER PROTOCOL ACTIVATED:</span>
Candidate:    Shreyash Debnath
Top Strengths: CGPA 9.3/10, Next.js 15, Gemini 2.5 AI, LeetCode 1500+
Status:       Available for Internships!

<span class="term-gold">Launching email draft to shreyashdebnath2@gmail.com...</span>
`);
          setTimeout(() => {
            window.location.href = "mailto:shreyashdebnath2@gmail.com?subject=Software%20Engineering%20Role%20-%20Interview%20Invitation&body=Hi%20Shreyash,%0D%0A%0D%0AWe%20reviewed%20your%20portfolio%20and%20were%20very%20impressed%20by%20your%20work.%20We%20would%20love%20to%20discuss%20an%20opportunity%20with%20our%20team.";
          }, 800);
        } else {
          if (window.CyberAudio) window.CyberAudio.playError();
          printLine(`shreyash is not in the sudoers file. This incident will be reported. (Tip: try <span class="term-gold">sudo hire</span>)`, "term-error");
        }
        break;

      case "whoami":
        printLine(`guest_recruiter@portfolio (Privileges: READ_ONLY, HIRE_ENABLED)`);
        break;

      case "date":
        printLine(new Date().toString());
        break;

      case "clear":
      case "cls":
        if (window.CyberAudio) window.CyberAudio.playClick();
        outputEl.innerHTML = "";
        break;

      case "exit":
        printLine("Terminating CLI session... Goodbye!");
        setTimeout(closeTerminal, 400);
        break;

      default:
        if (window.CyberAudio) window.CyberAudio.playError();
        printLine(`bash: ${escapeHtml(cmd)}: command not found. Type <span class="term-accent">help</span> to view all commands.`, "term-error");
        break;
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Handle Command Input
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (window.CyberAudio) window.CyberAudio.playCommand();
      const val = inputEl.value;
      inputEl.value = "";
      executeCommand(val);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex > 0) {
        historyIndex--;
        inputEl.value = commandHistory[historyIndex] || "";
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        inputEl.value = commandHistory[historyIndex] || "";
      } else {
        historyIndex = commandHistory.length;
        inputEl.value = "";
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (window.CyberAudio) window.CyberAudio.playClick();
      const current = inputEl.value.trim().toLowerCase();
      if (current) {
        const match = validCommands.find(c => c.startsWith(current));
        if (match) {
          inputEl.value = match;
        }
      }
    } else if (e.key.length === 1 || e.key === "Backspace") {
      if (window.CyberAudio) window.CyberAudio.playKey();
    }
  });

  // Quick Action Pills
  quickPills.forEach(pill => {
    pill.addEventListener("click", () => {
      const cmd = pill.getAttribute("data-cmd");
      if (cmd) {
        if (window.CyberAudio) window.CyberAudio.playClick();
        inputEl.value = "";
        executeCommand(cmd);
        inputEl.focus();
      }
    });
  });
}
initInteractiveTerminal();

// ===== MOUSE CURSOR SCROLL SPRINKLES (MAGICAL SCROLL SPARKLES) =====
(function initCursorScrollSprinkles() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  let container = document.getElementById("cursor-sprinkles-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "cursor-sprinkles-container";
    container.className = "cursor-sprinkles-container";
    document.body.appendChild(container);
  }

  let curX = -200, curY = -200;
  let lastScrollY = window.scrollY;
  let lastSpawnTime = 0;
  let isMouseInWindow = false;

  const colors = [
    { bg: "rgba(0, 245, 212, 0.95)", glow: "rgba(0, 245, 212, 0.8)", text: "#00f5d4" },
    { bg: "rgba(251, 191, 36, 0.95)", glow: "rgba(251, 191, 36, 0.8)", text: "#fbbf24" },
    { bg: "rgba(192, 132, 252, 0.95)", glow: "rgba(192, 132, 252, 0.8)", text: "#c084fc" },
    { bg: "rgba(56, 189, 248, 0.95)", glow: "rgba(56, 189, 248, 0.8)", text: "#38bdf8" },
    { bg: "rgba(255, 255, 255, 0.95)", glow: "rgba(255, 255, 255, 0.9)", text: "#ffffff" }
  ];

  function updateMouse(e) {
    curX = e.clientX;
    curY = e.clientY;
    isMouseInWindow = true;
  }

  window.addEventListener("mousemove", updateMouse, { passive: true });
  window.addEventListener("pointermove", updateMouse, { passive: true });

  document.addEventListener("mouseleave", () => {
    isMouseInWindow = false;
  });
  document.addEventListener("mouseenter", () => {
    isMouseInWindow = true;
  });

  function spawnSprinkles(scrollDir) {
    if (!isMouseInWindow || curX < 0 || curY < 0 || curX > window.innerWidth || curY > window.innerHeight) return;
    if (container.children.length > 40) return;

    const count = 2 + Math.floor(Math.random() * 2); // 2-3 sprinkles per burst
    for (let i = 0; i < count; i++) {
      const sp = document.createElement("span");
      const color = colors[Math.floor(Math.random() * colors.length)];
      const isStar = Math.random() > 0.45;

      const angle = Math.random() * Math.PI * 2;
      const dist = 16 + Math.random() * 32;
      const dx = Math.cos(angle) * dist;
      // Drift slightly upward when scrolling down, downward when scrolling up
      const dy = Math.sin(angle) * dist + (scrollDir >= 0 ? -14 : 14) * (0.3 + Math.random() * 0.7);
      const rot = (Math.random() > 0.5 ? 1 : -1) * (60 + Math.random() * 140);

      sp.className = `cursor-scroll-sprinkle ${isStar ? "sprinkle-star" : "sprinkle-dot"}`;
      sp.style.left = `${curX + (Math.random() * 10 - 5)}px`;
      sp.style.top = `${curY + (Math.random() * 10 - 5)}px`;
      sp.style.setProperty("--dx", `${dx.toFixed(1)}px`);
      sp.style.setProperty("--dy", `${dy.toFixed(1)}px`);
      sp.style.setProperty("--rot", `${rot.toFixed(0)}deg`);

      if (isStar) {
        sp.textContent = Math.random() > 0.5 ? "✦" : "★";
        sp.style.color = color.text;
        sp.style.textShadow = `0 0 8px ${color.glow}, 0 0 16px ${color.glow}`;
        sp.style.fontSize = `${9 + Math.random() * 6}px`;
      } else {
        const size = 3 + Math.random() * 4;
        sp.style.width = `${size.toFixed(1)}px`;
        sp.style.height = `${size.toFixed(1)}px`;
        sp.style.backgroundColor = color.bg;
        sp.style.boxShadow = `0 0 8px ${color.glow}, 0 0 16px ${color.glow}`;
      }

      container.appendChild(sp);
      setTimeout(() => {
        if (sp.parentNode) sp.parentNode.removeChild(sp);
      }, 700);
    }
  }

  window.addEventListener("scroll", () => {
    const now = performance.now();
    if (now - lastSpawnTime < 40) return; // 40ms throttle
    lastSpawnTime = now;

    const currentScrollY = window.scrollY;
    const scrollDir = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;

    spawnSprinkles(scrollDir);
  }, { passive: true });

  window.addEventListener("wheel", (e) => {
    const now = performance.now();
    if (now - lastSpawnTime < 40) return;
    lastSpawnTime = now;

    spawnSprinkles(e.deltaY);
  }, { passive: true });
})();


// ===== LUMINOUS NEON ORB TRAIL (INSPIRED BY CURSOR MOVEMENT COMET) =====
(function initCursorOrbTrail() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const canvas = document.getElementById("cursor-trail-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  let width = 0, height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas, { passive: true });

  const particles = [];
  const MAX_PARTICLES = 90;

  let lastX = null, lastY = null;
  let isMoving = false;
  let moveTimeout = null;

  // Harmonized palette aligned dynamically with the dark cyber background & active theme
  function getThemeColors() {
    const theme = document.documentElement.getAttribute("data-theme") || "cyan";
    if (theme === "violet") {
      return [
        { core: "rgba(250, 232, 255, ", glow: "rgba(192, 132, 252, " },
        { core: "rgba(243, 232, 255, ", glow: "rgba(168, 85, 247, " },
        { core: "rgba(255, 255, 255, ", glow: "rgba(216, 180, 254, " }
      ];
    } else if (theme === "emerald") {
      return [
        { core: "rgba(209, 250, 229, ", glow: "rgba(16, 185, 129, " },
        { core: "rgba(167, 243, 208, ", glow: "rgba(5, 150, 105, " },
        { core: "rgba(255, 255, 255, ", glow: "rgba(110, 231, 183, " }
      ];
    } else if (theme === "amber") {
      return [
        { core: "rgba(254, 243, 199, ", glow: "rgba(245, 158, 11, " },
        { core: "rgba(253, 230, 138, ", glow: "rgba(217, 119, 6, " },
        { core: "rgba(255, 255, 255, ", glow: "rgba(252, 211, 77, " }
      ];
    } else {
      // Default Cyan cyber theme — perfectly aligned with dark background grid & ambient orbs
      return [
        { core: "rgba(224, 254, 254, ", glow: "rgba(0, 245, 212, " },
        { core: "rgba(207, 250, 254, ", glow: "rgba(56, 189, 248, " },
        { core: "rgba(186, 230, 253, ", glow: "rgba(14, 165, 233, " },
        { core: "rgba(255, 255, 255, ", glow: "rgba(0, 245, 212, " }
      ];
    }
  }

  function addParticle(x, y, sizeMultiplier = 1) {
    if (particles.length >= MAX_PARTICLES) {
      particles.shift();
    }
    const palette = getThemeColors();
    const color = palette[Math.floor(Math.random() * palette.length)];
    // Light, delicate micro-orb radius (1.8px - 4.2px)
    const baseRadius = (1.8 + Math.random() * 2.4) * sizeMultiplier;

    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: baseRadius,
      initialRadius: baseRadius,
      alpha: 0.45 + Math.random() * 0.2, // Light translucent opacity
      decay: 0.028 + Math.random() * 0.018, // Swift gentle fade
      shrink: 0.948 + Math.random() * 0.015,
      color: color
    });
  }

  function onPointerMove(e) {
    const x = e.clientX;
    const y = e.clientY;

    isMoving = true;
    clearTimeout(moveTimeout);
    moveTimeout = setTimeout(() => { isMoving = false; }, 80);

    if (lastX !== null && lastY !== null) {
      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.hypot(dx, dy);

      // Interpolate smoothly with lighter density
      if (dist > 2.5) {
        const stepSize = 7.0; // Spaced out for a delicate, airy trail
        const steps = Math.min(Math.floor(dist / stepSize), 10);
        for (let i = 0; i <= steps; i++) {
          const t = steps === 0 ? 1 : i / steps;
          const px = lastX + dx * t + (Math.random() - 0.5) * 4;
          const py = lastY + dy * t + (Math.random() - 0.5) * 4;
          const mult = 0.8 + t * 0.4;
          addParticle(px, py, mult);
        }
      }
    } else {
      addParticle(x, y, 1);
    }

    lastX = x;
    lastY = y;
  }

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("mousemove", onPointerMove, { passive: true });

  document.addEventListener("mouseleave", () => {
    lastX = null;
    lastY = null;
    isMoving = false;
  });

  // Smooth render loop
  function renderTrail() {
    if (particles.length > 0) {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Physics
        p.x += p.vx;
        p.y += p.vy;
        p.radius *= p.shrink;
        p.alpha -= p.decay;

        if (p.alpha <= 0.01 || p.radius <= 0.3) {
          particles.splice(i, 1);
          continue;
        }

        // Render soft translucent luminous orb
        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        // Delicate outer glow
        const outerRadius = Math.max(p.radius * 2.1, 1);
        const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, outerRadius);
        glowGrad.addColorStop(0, `${p.color.glow}${(p.alpha * 0.65).toFixed(3)})`);
        glowGrad.addColorStop(0.5, `${p.color.glow}${(p.alpha * 0.2).toFixed(3)})`);
        glowGrad.addColorStop(1, `${p.color.glow}0)`);

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, outerRadius, 0, Math.PI * 2);
        ctx.fill();

        // Subtle bright core
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(p.radius * 0.75, 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `${p.color.core}${(p.alpha * 0.8).toFixed(3)})`;
        ctx.fill();

        ctx.restore();
      }
    } else {
      ctx.clearRect(0, 0, width, height);
    }

    requestAnimationFrame(renderTrail);
  }

  requestAnimationFrame(renderTrail);
})();

