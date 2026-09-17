import { Storage } from '../utils/storage.js';

export function renderPublicNavbar(activePath = '/') {
  const isLoggedIn = Storage.isLoggedIn();
  const user = isLoggedIn ? Storage.getUser() : null;

  return `
    <!-- Visually Hidden Skip to Main Content Link -->
    <a href="#main-content" class="skip-to-content">Skip to main content</a>

    <!-- Top Governance Utility Bar -->
    <div class="top-governance-bar">
      <div class="container top-gov-container">
        <div class="top-gov-left">
          <span style="font-weight: 800; color: #FFFFFF; letter-spacing: 0.02em;">Standards for a Stronger India</span>
          <span style="display: inline-block; width: 16px; height: 3px; background: linear-gradient(90deg, #FF9933, #FFFFFF, #138808); border-radius: 1px; vertical-align: middle; margin: 0 0.4rem;"></span>
          <span style="font-weight: 500; color: rgba(255,255,255,0.75);" class="gov-motto">Transparent • Efficient • Inclusive</span>
        </div>

        <div class="top-gov-right">
          <!-- Accessibility Icon & Font Controls -->
          <div class="accessibility-controls" aria-label="Accessibility Font Size Controls">
            <span title="Accessibility Options" style="font-size: 0.8rem; margin-right: 0.2rem; color: rgba(255,255,255,0.85); display: inline-flex; align-items: center;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
            </span>
            <button id="btn-font-dec" class="acc-btn" title="Decrease font size">A-</button>
            <button id="btn-font-reset" class="acc-btn active" title="Reset font size">A</button>
            <button id="btn-font-inc" class="acc-btn" title="Increase font size">A+</button>
          </div>

          <!-- High Contrast Mode Toggle -->
          <button id="btn-high-contrast" class="acc-btn" title="Toggle High Contrast Mode" style="padding: 0.15rem 0.55rem; font-size: 0.75rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.3rem;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0 0 20z" fill="currentColor"/></svg>
            High Contrast
          </button>

          <!-- Multilingual Dropdown -->
          <div class="gov-lang-picker">
            <div id="google_translate_element"></div>
          </div>

          <!-- Micro Indian Flag Accent -->
          <div style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.75rem; font-weight: 700; color: #FFFFFF;">
            <span style="display: inline-flex; width: 22px; height: 13px; border-radius: 2px; overflow: hidden; border: 1px solid rgba(255,255,255,0.3);">
              <span style="flex: 1; background: #FF9933;"></span>
              <span style="flex: 1; background: #FFFFFF; display: flex; align-items: center; justify-content: center;">
                <svg width="4" height="4" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="none" stroke="#082B4C" stroke-width="1.2"/><path d="M5 1L5 9M1 5L9 5" stroke="#082B4C" stroke-width="0.8"/></svg>
              </span>
              <span style="flex: 1; background: #138808;"></span>
            </span>
          </div>
        </div>
      </div>
      <!-- Subtle Tricolor Underline Line Accent -->
      <div class="tricolor-accent-line"></div>
    </div>

    <!-- Main Public Header -->
    <header class="public-navbar">
      <div class="container navbar-container">
        <!-- PRAMAN Brand Identity Logo -->
        <a href="/" class="brand-logo" title="PRAMAN — Indian Standards Decision Support">
          <img src="/assets/brand/praman-logo.svg" alt="PRAMAN / प्रमाण — Indian Standards Decision Support" height="40" class="brand-img" />
        </a>

        <!-- Center Navigation Links (Clean Direct Links) -->
        <nav class="navbar-links" aria-label="Main Navigation">
          <a href="/" class="nav-link ${activePath === '/' || activePath === '/index.html' ? 'active' : ''}">Home</a>
          <a href="/pages/standards.html" class="nav-link ${activePath.includes('/standards') ? 'active' : ''}">Standards</a>
          <a href="/pages/how-it-works.html" class="nav-link ${activePath.includes('/how-it-works') ? 'active' : ''}">How It Works</a>
          <a href="/pages/about.html" class="nav-link ${activePath.includes('/about') ? 'active' : ''}">About</a>
        </nav>

        <!-- Right Side Controls & CTAs -->
        <div class="navbar-actions">
          <!-- Global Search Trigger Button with Ctrl K -->
          <button class="navbar-search-btn" id="navbar-search-trigger" onclick="openGlobalSearchModal()" title="Search standards (Ctrl+K)" style="width: 150px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span class="search-btn-text" style="font-size:0.825rem;">Search...</span>
            <span class="search-kbd-badge">Ctrl K</span>
          </button>

          <!-- Location Selector Dropdown (Pan-India Context) -->
          <div class="navbar-location-wrapper">
            <select id="navbar-location-select" class="navbar-location-select" title="Select Procurement Region">
              <option value="All India">All India / Central Ministry</option>
              <option value="Delhi">Delhi (UT)</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Telangana">Telangana</option>
              <option value="Punjab">Punjab</option>
              <option value="Kerala">Kerala</option>
            </select>
          </div>

          ${isLoggedIn ? `
            <div class="user-profile-menu">
              <button class="user-profile-btn" id="user-profile-toggle" title="Officer Account Menu">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>${Storage.isAdmin() ? 'Central Admin' : (user.name || 'Officer')}</span>
                <span style="font-size:0.75rem; color: #64748B;">▾</span>
              </button>
              <div class="user-profile-dropdown" id="user-profile-dropdown">
                <a href="/pages/dashboard.html" class="dropdown-item">
                  <span class="dropdown-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></span> Dashboard Workspace
                </a>
                ${Storage.isAdmin() ? `
                  <a href="/pages/admin.html" class="dropdown-item" style="color: #0B3558; font-weight: 700; background: #F0F7FF;">
                    <span class="dropdown-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span> Admin Console
                  </a>
                ` : ''}
                <a href="/pages/profile.html" class="dropdown-item">
                  <span class="dropdown-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span> Profile &amp; Ministry
                </a>
                <a href="/pages/settings.html" class="dropdown-item">
                  <span class="dropdown-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></span> Settings
                </a>
                <button id="nav-btn-logout" class="dropdown-item" style="width: 100%; border: none; background: transparent; cursor: pointer; text-align: left; color: #DC2626;">
                  <span class="dropdown-icon" style="color: #DC2626;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></span> Sign Out
                </button>
              </div>
            </div>
          ` : `
            <a href="/pages/login.html" class="nav-link-login" style="font-weight:700; color: #0B3558; font-size:0.88rem; text-decoration:none; padding:0.45rem 0.75rem; white-space: nowrap;">Login</a>
          `}

          <a href="/pages/analyze.html" class="navbar-cta" style="white-space: nowrap;">
            Analyze Requirement →
          </a>
        </div>
      </div>
    </header>
  `;
}

export function initNavbarEvents() {
  // Logout handler
  const logoutBtn = document.getElementById('nav-btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      Storage.logout();
      window.location.href = '/pages/login.html';
    });
  }

  // Sticky Scroll Class Handler
  const publicNavbar = document.querySelector('.public-navbar');
  if (publicNavbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 15) {
        publicNavbar.classList.add('navbar-scrolled');
      } else {
        publicNavbar.classList.remove('navbar-scrolled');
      }
    });
  }

  // Font Size Accessibility Controls
  const btnDec = document.getElementById('btn-font-dec');
  const btnReset = document.getElementById('btn-font-reset');
  const btnInc = document.getElementById('btn-font-inc');

  if (btnDec && btnReset && btnInc) {
    btnDec.addEventListener('click', () => {
      document.documentElement.style.fontSize = '92%';
      setActiveAccBtn(btnDec);
    });
    btnReset.addEventListener('click', () => {
      document.documentElement.style.fontSize = '100%';
      setActiveAccBtn(btnReset);
    });
    btnInc.addEventListener('click', () => {
      document.documentElement.style.fontSize = '108%';
      setActiveAccBtn(btnInc);
    });
  }

  function setActiveAccBtn(activeBtn) {
    if (btnDec && btnReset && btnInc) {
      [btnDec, btnReset, btnInc].forEach(b => b.classList.remove('active'));
      activeBtn.classList.add('active');
    }
  }

  // High Contrast Toggle
  const contrastBtn = document.getElementById('btn-high-contrast');
  if (contrastBtn) {
    contrastBtn.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
    });
  }

  // Language selector dictionary translation
  const langSelect = document.getElementById('gov-lang-select');
  const translations = {
    en: {
      analyzeBtn: 'Analyze Requirement →',
      exploreBtn: 'Explore Standards',
      heroTitle: 'Find the Right <span class="hero-highlight">Indian Standard</span> for Every Procurement Requirement.'
    },
    hi: {
      analyzeBtn: 'आवश्यकता का विश्लेषण करें →',
      exploreBtn: 'मानक खोजें',
      heroTitle: 'प्रत्येक खरीद आवश्यकता के लिए सही <span class="hero-highlight">भारतीय मानक</span> खोजें।'
    },
    bn: {
      analyzeBtn: 'প্রয়োজনীয়তা বিশ্লেষণ করুন →',
      exploreBtn: 'মানকসমূহ খুঁজুন',
      heroTitle: 'প্রতিটি ক্রয়ের জন্য সঠিক <span class="hero-highlight">ভারতীয় মানক</span> খুঁজুন।'
    },
    ta: {
      analyzeBtn: 'தேவையை ஆராயுங்கள் →',
      exploreBtn: 'தரநிலைகளை ஆராயுங்கள்',
      heroTitle: 'ஒவ்வொரு கொள்முதல் தேவைக்கும் சரியான <span class="hero-highlight">இந்திய தரநிலையை</span> கண்டறியவும்.'
    },
    te: {
      analyzeBtn: 'అవసరాన్ని విశ్లేషించండి →',
      exploreBtn: 'ప్రమాణాలను అన్వేషించండి',
      heroTitle: 'ప్రతి కొనుగోలు అవసరానికి సరైన <span class="hero-highlight">భారతీయ ప్రమాణాన్ని</span> కనుగొనండి.'
    },
    mr: {
      analyzeBtn: 'गरजेचे विश्लेषण करा →',
      exploreBtn: 'मानके शोधा',
      heroTitle: 'प्रत्येक खरेदी गरजेसाठी योग्य <span class="hero-highlight">भारतीय मानक</span> शोधा.'
    },
    pa: {
      analyzeBtn: 'ਲੋੜ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ →',
      exploreBtn: 'ਮਿਆਰਾਂ ਦੀ ਖੋਜ ਕਰੋ',
      heroTitle: 'ਹਰ ਖਰੀਦ ਦੀ ਲੋੜ ਲਈ ਸਹੀ <span class="hero-highlight">ਭਾਰਤੀ ਮਿਆਰ</span> ਲੱਭੋ।'
    }
  };

  function applyTranslation(lang) {
    const dict = translations[lang] || translations.en;
    const s1Title = document.querySelector('#hero-slide-1 .hero-title');
    if (s1Title) s1Title.innerHTML = dict.heroTitle;
    document.querySelectorAll('#hero-slide-1 .btn-hero-primary').forEach(el => { el.innerText = dict.analyzeBtn; });
    document.querySelectorAll('#hero-slide-1 .btn-hero-secondary').forEach(el => { el.innerText = dict.exploreBtn; });
  }

  if (langSelect) {
    const savedLang = localStorage.getItem('praman_lang') || 'en';
    langSelect.value = savedLang;
    applyTranslation(savedLang);
    langSelect.addEventListener('change', (e) => {
      const selected = e.target.value;
      localStorage.setItem('praman_lang', selected);
      applyTranslation(selected);
    });
  }
}

