/**
 * Nexus One — Interactive Frontend Scripts
 * Clean, lightweight, modular JS.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year in Footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Drawer Navigation Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    // Close on link click
    document.querySelectorAll('.drawer-link, .drawer-links .btn').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 2.1 Dynamic Navbar Color Switcher (Frosted Glass on Hero vs Solid Dark on Rest of Site)
  const navbar = document.getElementById('navbar');
  const heroSection = document.getElementById('hero');

  function updateNavbarScrollState() {
    if (!navbar) return;
    const heroHeight = heroSection ? heroSection.offsetHeight - 90 : 500;
    if (window.scrollY > heroHeight) {
      navbar.classList.add('navbar-scrolled');
      navbar.classList.remove('navbar-on-hero');
    } else {
      navbar.classList.remove('navbar-scrolled');
      navbar.classList.add('navbar-on-hero');
    }
  }

  window.addEventListener('scroll', updateNavbarScrollState, { passive: true });
  updateNavbarScrollState();

  // 3. Hero Showcase Tab Switching & Auto-Rotation (ProjectOne Exact Feature)
  const showcaseTabs = document.querySelectorAll('.showcase-tab');
  const browserPanes = document.querySelectorAll('.browser-content-pane');
  const browserUrl = document.getElementById('browserUrl');
  const browserFrame = document.getElementById('browserFrame');

  const tabUrls = {
    'tab-leads': 'https://pipeline.nexusone.io/insurance-leads',
    'tab-callcenter': 'https://pipeline.nexusone.io/call-center-hub',
    'tab-support': 'https://pipeline.nexusone.io/24-7-customer-care',
    'tab-webdev': 'https://pipeline.nexusone.io/web-development',
    'tab-leadgen': 'https://pipeline.nexusone.io/lead-gen-funnels'
  };

  let currentTabIndex = 0;
  let autoRotateInterval = null;
  let isUserInteracting = false;

  function switchShowcaseTab(index) {
    if (!showcaseTabs[index]) return;
    
    showcaseTabs.forEach(t => t.classList.remove('active'));
    browserPanes.forEach(p => p.classList.remove('active'));

    const activeTab = showcaseTabs[index];
    const targetId = activeTab.getAttribute('data-target');
    const targetPane = document.getElementById(targetId);

    activeTab.classList.add('active');
    if (targetPane) {
      targetPane.classList.add('active');
    }

    if (browserUrl && tabUrls[targetId]) {
      browserUrl.innerHTML = `<span class="lock-icon">🔒</span> ${tabUrls[targetId]}`;
    }

    currentTabIndex = index;
  }

  showcaseTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      isUserInteracting = true;
      switchShowcaseTab(index);
    });
  });

  // Auto-rotate tabs every 4.5 seconds
  function startAutoRotation() {
    autoRotateInterval = setInterval(() => {
      if (!isUserInteracting) {
        let nextIndex = (currentTabIndex + 1) % showcaseTabs.length;
        switchShowcaseTab(nextIndex);
      }
    }, 4500);
  }

  startAutoRotation();

  // Pause on frame hover
  if (browserFrame) {
    browserFrame.addEventListener('mouseenter', () => {
      isUserInteracting = true;
    });

    browserFrame.addEventListener('mouseleave', () => {
      isUserInteracting = false;
    });

    // Subtle 3D mouse tilt
    browserFrame.addEventListener('mousemove', (e) => {
      const rect = browserFrame.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -2;
      const rotateY = ((x - centerX) / centerX) * 2;
      browserFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    browserFrame.addEventListener('mouseleave', () => {
      browserFrame.style.transform = '';
    });
  }

  // 4. Smooth Anchor Scrolling with Pill Navbar Offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. FAQ Accordion (ProjectOne Style)
  const faqToggles = document.querySelectorAll('.faq-toggle');
  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const parentCard = toggle.closest('.faq-card');
      const isOpen = parentCard.classList.contains('open');

      // Close all other open cards
      document.querySelectorAll('.faq-card').forEach(card => {
        card.classList.remove('open');
      });

      // Toggle current
      if (!isOpen) {
        parentCard.classList.add('open');
      }
    });
  });

  // 5. Contact Lead Form Submission
  const leadForm = document.getElementById('leadForm');
  const formSuccessBox = document.getElementById('formSuccessBox');
  const submitBtn = document.getElementById('submitBtn');

  if (leadForm && formSuccessBox) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Processing...</span>';
      }

      // Simulate rapid asynchronous API processing
      setTimeout(() => {
        leadForm.style.display = 'none';
        formSuccessBox.style.display = 'block';
        formSuccessBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 700);
    });
  }

  // 6. Currency Switcher in Pricing Section (USD / EUR / CAD / GBP)
  const currBtns = document.querySelectorAll('.curr-btn');
  const planPriceEl = document.getElementById('planPrice');
  const currencyCodeEl = document.getElementById('currencyCode');

  if (currBtns.length > 0 && planPriceEl && currencyCodeEl) {
    currBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        currBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const curr = btn.getAttribute('data-curr');
        const price = btn.getAttribute('data-price');

        planPriceEl.textContent = price;
        currencyCodeEl.textContent = curr;
      });
    });
  }

  // 7. Interactive Hero Mesh Shader Canvas Engine (Ultra-Vibrant & Fluid)
  const canvas = document.getElementById('heroShaderCanvas');
  const heroWrapper = document.getElementById('hero');
  
  if (canvas && heroWrapper) {
    const ctx = canvas.getContext('2d');
    let width = 0, height = 0;
    let t = 0;
    let mouseX = 0.5, mouseY = 0.5;
    let targetMouseX = 0.5, targetMouseY = 0.5;

    function resizeCanvas() {
      const rect = heroWrapper.getBoundingClientRect();
      width = canvas.width = rect.width || window.innerWidth;
      height = canvas.height = rect.height || 850;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('load', resizeCanvas);

    // Track mouse movement across hero section with fluid easing
    heroWrapper.addEventListener('mousemove', (e) => {
      const rect = heroWrapper.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) / width;
      targetMouseY = (e.clientY - rect.top) / height;
    });

    // 6 Fluid Mesh Luminous Orbs with dynamic trajectories on White Theme
    const orbs = [
      { basePhase: 0.0, speed: 0.007, r: 0.55, cx: 0.25, cy: 0.35, color: 'rgba(198, 253, 80, 0.45)', scaleX: 1.2, scaleY: 0.8 },
      { basePhase: 2.1, speed: 0.009, r: 0.65, cx: 0.78, cy: 0.40, color: 'rgba(56, 189, 248, 0.22)', scaleX: 0.9, scaleY: 1.3 },
      { basePhase: 4.2, speed: 0.006, r: 0.50, cx: 0.50, cy: 0.75, color: 'rgba(198, 253, 80, 0.35)', scaleX: 1.1, scaleY: 0.9 },
      { basePhase: 1.4, speed: 0.008, r: 0.48, cx: 0.15, cy: 0.80, color: 'rgba(52, 211, 153, 0.25)', scaleX: 1.0, scaleY: 1.1 },
      { basePhase: 3.5, speed: 0.005, r: 0.70, cx: 0.85, cy: 0.82, color: 'rgba(217, 249, 157, 0.40)', scaleX: 1.3, scaleY: 0.7 },
      { basePhase: 5.0, speed: 0.004, r: 0.40, cx: 0.45, cy: 0.20, color: 'rgba(240, 253, 244, 0.80)', scaleX: 0.8, scaleY: 0.8 }
    ];

    function renderShaderFrame() {
      t += 0.012;
      
      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Clean luminous white base
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // 1. Draw glowing fluid radial mesh gradients with luminous white contrast
      orbs.forEach(orb => {
        const motionX = orb.cx + Math.sin(t * orb.speed * 100 + orb.basePhase) * 0.10 + (mouseX - 0.5) * 0.12;
        const motionY = orb.cy + Math.cos(t * orb.speed * 85 + orb.basePhase) * 0.10 + (mouseY - 0.5) * 0.12;

        const posX = motionX * width;
        const posY = motionY * height;
        const radius = orb.r * Math.max(width, height);

        const grad = ctx.createRadialGradient(posX, posY, 0, posX, posY, radius);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(0.55, orb.color.replace(/[\d\.]+\)$/, '0.06)'));
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(posX, posY, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Interactive Cursor Glow Sphere
      const cursorX = mouseX * width;
      const cursorY = mouseY * height;
      const cursorRadius = 180;
      const cursorGrad = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, cursorRadius);
      cursorGrad.addColorStop(0, 'rgba(198, 253, 80, 0.35)');
      cursorGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.10)');
      cursorGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = cursorGrad;
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, cursorRadius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Subtle Vignette Pass
      const vigGrad = ctx.createRadialGradient(width * 0.5, height * 0.45, Math.min(width, height) * 0.3, width * 0.5, height * 0.45, Math.max(width, height) * 0.75);
      vigGrad.addColorStop(0, 'transparent');
      vigGrad.addColorStop(1, 'rgba(255, 255, 255, 0.65)');
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, width, height);

      // 4. Dynamic Animated Wireframe Sine-Wave Mesh Overlay
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.035)';
      ctx.lineWidth = 1;

      const numLines = 14;
      const stepY = height / (numLines + 1);

      for (let i = 1; i <= numLines; i++) {
        const baseY = i * stepY;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 25) {
          const wave1 = Math.sin((x * 0.003) + (t * 1.5) + (i * 0.4)) * 18;
          const wave2 = Math.cos((x * 0.006) - (t * 1.0) + (i * 0.6)) * 10;
          const distToMouse = Math.hypot(x - cursorX, baseY - cursorY);
          const mouseDistort = Math.max(0, (140 - distToMouse) / 140) * 20;

          const y = baseY + wave1 + wave2 + mouseDistort;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      requestAnimationFrame(renderShaderFrame);
    }

    renderShaderFrame();
  }
});
