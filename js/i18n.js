/* ─────────────────────────────────────────────────────────────
   JakMiris – i18n.js
   Dual-language (English / Malay) support for the auth pages.
   Usage:  t('key')          → translated string
           applyLang()       → refresh all [data-i18n] elements
           toggleLang()      → flip language and re-render
   ───────────────────────────────────────────────────────────── */

const LANGS = {
  en: {
    /* page */
    'page.title'              : 'Login – JakMiris',
    'page.tagline'            : 'Heritage of Borneo, modern choice.',
    /* header nav */
    'nav.home'                : 'Home',
    'nav.bisnes'              : 'Business',
    'nav.profile'             : 'Profile',
    'nav.aboutus'             : 'About Us',
    /* lang toggle */
    'lang.btn'                : 'MY | <span class="lang-active">EN</span>',
    /* tabs */
    'tab.login'               : 'Log In',
    'tab.register'            : 'Register',
    /* login form */
    'label.login.email'       : 'Email / Username',
    'placeholder.login.email' : 'example@email.com',
    'label.login.password'    : 'Password',
    'placeholder.login.pw'    : 'Enter your password',
    'remember'                : 'Remember me',
    'forgot'                  : 'Forgot password?',
    'btn.login'               : 'Log In',
    'or'                      : 'or',
    'social.google'           : 'Continue with Google',
    'social.facebook'         : 'Continue with Facebook',
    /* register form */
    'label.reg.name'          : 'Full Name',
    'placeholder.reg.name'    : 'Your Full Name',
    'label.reg.email'         : 'Email',
    'label.reg.phone'         : 'Phone Number',
    'label.reg.password'      : 'Password',
    'placeholder.reg.pw'      : 'At least 8 characters',
    'label.reg.confirm'       : 'Confirm Password',
    'placeholder.reg.confirm' : 'Repeat password',
    'terms.text'              : 'I agree to the',
    'terms.link1'             : 'Terms & Conditions',
    'terms.and'               : 'and',
    'terms.link2'             : 'Privacy Policy',
    'btn.register'            : 'Create Account',
    /* strength labels */
    'strength.weak'           : 'Weak',
    'strength.fair'           : 'Fair',
    'strength.strong'         : 'Strong',
    'strength.vstrong'        : 'Very Strong',
    /* validation errors */
    'err.login.email'         : 'Please enter your email or username.',
    'err.login.password'      : 'Please enter your password.',
    'err.reg.name'            : 'Full name is required.',
    'err.reg.email'           : 'Please enter a valid email address.',
    'err.reg.phone'           : 'Invalid phone number format.',
    'err.reg.password'        : 'Password must be at least 8 characters.',
    'err.reg.confirm'         : 'Passwords do not match.',
    'err.reg.terms'           : 'You must agree to the terms.',
    'err.connection'          : 'Connection error. Please try again.',
    /* button loading states */
    'btn.login.loading'       : 'Signing in…',
    'btn.register.loading'    : 'Creating account…',
    /* alerts */
    'alert.login.success'     : '✓ Login successful! Redirecting…',
    'alert.register.success'  : '✓ Account created! Please log in.',
    'alert.login.invalid'     : 'Invalid email or password.',
    'alert.register.fail'     : 'Registration failed. Please try again.',
    /* social placeholder */
    'social.soon'             : ' integration coming soon!',
  },

  my: {
    /* page */
    'page.title'              : 'Log Masuk – JakMiris',
    'page.tagline'            : 'Warisan Borneo, pilihan moden.',
    /* header nav */
    'nav.home'                : 'Halaman Utama',
    'nav.bisnes'              : 'Bisnes',
    'nav.profile'             : 'Profil',
    'nav.aboutus'             : 'Tentang Kami',
    /* lang toggle */
    'lang.btn'                : '<span class="lang-active">MY</span> | EN',
    /* tabs */
    'tab.login'               : 'Log Masuk',
    'tab.register'            : 'Daftar',
    /* login form */
    'label.login.email'       : 'E-mel / Nama Pengguna',
    'placeholder.login.email' : 'contoh@email.com',
    'label.login.password'    : 'Kata Laluan',
    'placeholder.login.pw'    : 'Masukkan kata laluan',
    'remember'                : 'Ingat saya',
    'forgot'                  : 'Lupa kata laluan?',
    'btn.login'               : 'Log Masuk',
    'or'                      : 'atau',
    'social.google'           : 'Teruskan dengan Google',
    'social.facebook'         : 'Teruskan dengan Facebook',
    /* register form */
    'label.reg.name'          : 'Nama Penuh',
    'placeholder.reg.name'    : 'Nama Penuh Anda',
    'label.reg.email'         : 'E-mel',
    'label.reg.phone'         : 'Nombor Telefon',
    'label.reg.password'      : 'Kata Laluan',
    'placeholder.reg.pw'      : 'Sekurang-kurangnya 8 aksara',
    'label.reg.confirm'       : 'Sahkan Kata Laluan',
    'placeholder.reg.confirm' : 'Ulang kata laluan',
    'terms.text'              : 'Saya bersetuju dengan',
    'terms.link1'             : 'Terma &amp; Syarat',
    'terms.and'               : 'dan',
    'terms.link2'             : 'Dasar Privasi',
    'btn.register'            : 'Buat Akaun',
    /* strength labels */
    'strength.weak'           : 'Lemah',
    'strength.fair'           : 'Sederhana',
    'strength.strong'         : 'Kuat',
    'strength.vstrong'        : 'Sangat Kuat',
    /* validation errors */
    'err.login.email'         : 'Sila masukkan e-mel atau nama pengguna.',
    'err.login.password'      : 'Sila masukkan kata laluan.',
    'err.reg.name'            : 'Nama penuh diperlukan.',
    'err.reg.email'           : 'Sila masukkan e-mel yang sah.',
    'err.reg.phone'           : 'Format nombor telefon tidak sah.',
    'err.reg.password'        : 'Kata laluan sekurang-kurangnya 8 aksara.',
    'err.reg.confirm'         : 'Kata laluan tidak sepadan.',
    'err.reg.terms'           : 'Anda mesti bersetuju dengan terma.',
    'err.connection'          : 'Ralat sambungan. Sila cuba lagi.',
    /* button loading states */
    'btn.login.loading'       : 'Sedang masuk…',
    'btn.register.loading'    : 'Mendaftar…',
    /* alerts */
    'alert.login.success'     : '✓ Berjaya log masuk! Mengalihkan…',
    'alert.register.success'  : '✓ Akaun berjaya dibuat! Sila log masuk.',
    'alert.login.invalid'     : 'E-mel atau kata laluan tidak sah.',
    'alert.register.fail'     : 'Pendaftaran gagal. Sila cuba lagi.',
    /* social placeholder */
    'social.soon'             : ' akan datang!',
  },
};

/* ── State ───────────────────────────────────────────────────── */
let currentLang = localStorage.getItem('jm_lang') || 'my';

/* ── Core lookup ─────────────────────────────────────────────── */
function t(key) {
  return LANGS[currentLang]?.[key] ?? LANGS['en']?.[key] ?? key;
}

/* ── Apply translations to DOM ───────────────────────────────── */
function applyLang() {
  document.documentElement.lang = currentLang === 'my' ? 'ms' : 'en';
  document.title = t('page.title');

  /* text content */
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });

  /* placeholders */
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPh);
  });

  /* terms label – contains links so rebuilt as HTML */
  const termsSpan = document.getElementById('terms-text');
  if (termsSpan) {
    termsSpan.innerHTML =
      `${t('terms.text')} <a href="#">${t('terms.link1')}</a> ${t('terms.and')} <a href="#">${t('terms.link2')}</a>`;
  }

  /* language toggle button */
  const langBtn = document.getElementById('lang-btn');
  if (langBtn) langBtn.innerHTML = t('lang.btn');
}

/* ── Toggle ──────────────────────────────────────────────────── */
function toggleLang() {
  currentLang = currentLang === 'en' ? 'my' : 'en';
  localStorage.setItem('jm_lang', currentLang);
  applyLang();
}

document.addEventListener('DOMContentLoaded', applyLang);
