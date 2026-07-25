/* ─────────────────────────────────────────────────────────────
   JakMiris – auth.js
   Handles Login & Register form validation + AJAX to PHP backend
   ───────────────────────────────────────────────────────────── */

// ── Tab Switch ────────────────────────────────────────────────
function switchTab(tab) {
  document.getElementById('form-login').classList.toggle('hidden', tab !== 'login');
  document.getElementById('form-register').classList.toggle('hidden', tab !== 'register');
  document.getElementById('tab-login').classList.toggle('active', tab === 'login');
  document.getElementById('tab-register').classList.toggle('active', tab === 'register');
  clearAlerts();
}

// ── Password Visibility Toggle ────────────────────────────────
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  btn.textContent = isHidden ? '🙈' : '👁';
}

// ── Password Strength ─────────────────────────────────────────
function checkStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const regPassword = document.getElementById('reg-password');
if (regPassword) {
  regPassword.addEventListener('input', function () {
    const score = checkStrength(this.value);
    const fill = document.getElementById('strength-fill');
    const label = document.getElementById('strength-label');
    const levels = [
      { width: '0%',   bg: 'transparent', text: '' },
      { width: '25%',  bg: '#e53935',     text: t('strength.weak') },
      { width: '50%',  bg: '#fb8c00',     text: t('strength.fair') },
      { width: '75%',  bg: '#fdd835',     text: t('strength.strong') },
      { width: '100%', bg: '#43a047',     text: t('strength.vstrong') },
    ];
    const level = this.value.length === 0 ? levels[0] : levels[score];
    fill.style.width = level.width;
    fill.style.background = level.bg;
    label.textContent = level.text;
  });
}

// ── Validation Helpers ────────────────────────────────────────
function setError(fieldId, errorId, msg) {
  const field = document.getElementById(fieldId);
  const err   = document.getElementById(errorId);
  if (field)  field.classList.toggle('invalid', !!msg);
  if (err)    err.textContent = msg || '';
}

function clearAlerts() {
  ['login-alert', 'register-alert'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.className = 'auth-alert hidden'; el.textContent = ''; }
  });
}

function showAlert(id, msg, type) {
  const el = document.getElementById(id);
  if (!el) return;
  el.className = `auth-alert ${type}`;
  el.textContent = msg;
}

// ── Login Form ────────────────────────────────────────────────
const formLogin = document.getElementById('form-login');
if (formLogin) {
  formLogin.addEventListener('submit', async function (e) {
    e.preventDefault();
    clearAlerts();

    const email    = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    let valid = true;

    if (!email) {
      setError('login-email', 'err-login-email', t('err.login.email'));
      valid = false;
    } else {
      setError('login-email', 'err-login-email', '');
    }

    if (!password) {
      setError('login-password', 'err-login-password', t('err.login.password'));
      valid = false;
    } else {
      setError('login-password', 'err-login-password', '');
    }

    if (!valid) return;

    const btn = document.getElementById('btn-login');
    btn.disabled = true;
    btn.textContent = t('btn.login.loading');

    try {
      const res  = await fetch('php/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        showAlert('login-alert', t('alert.login.success'), 'success');
        setTimeout(() => { window.location.href = data.redirect || 'index.html'; }, 1200);
      } else {
        showAlert('login-alert', data.message || t('alert.login.invalid'), 'error');
      }
    } catch {
      showAlert('login-alert', t('err.connection'), 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = t('btn.login');
    }
  });
}

// ── Register Form ─────────────────────────────────────────────
const formRegister = document.getElementById('form-register');
if (formRegister) {
  formRegister.addEventListener('submit', async function (e) {
    e.preventDefault();
    clearAlerts();

    const name     = document.getElementById('reg-name').value.trim();
    const email    = document.getElementById('reg-email').value.trim();
    const phone    = document.getElementById('reg-phone').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirm  = document.getElementById('reg-confirm').value;
    const terms    = document.getElementById('reg-terms').checked;
    let valid = true;

    if (!name) {
      setError('reg-name', 'err-reg-name', t('err.reg.name')); valid = false;
    } else { setError('reg-name', 'err-reg-name', ''); }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRe.test(email)) {
      setError('reg-email', 'err-reg-email', t('err.reg.email')); valid = false;
    } else { setError('reg-email', 'err-reg-email', ''); }

    if (phone && !/^\+?[\d\s\-()]{7,15}$/.test(phone)) {
      setError('reg-phone', 'err-reg-phone', t('err.reg.phone')); valid = false;
    } else { setError('reg-phone', 'err-reg-phone', ''); }

    if (password.length < 8) {
      setError('reg-password', 'err-reg-password', t('err.reg.password')); valid = false;
    } else { setError('reg-password', 'err-reg-password', ''); }

    if (password !== confirm) {
      setError('reg-confirm', 'err-reg-confirm', t('err.reg.confirm')); valid = false;
    } else { setError('reg-confirm', 'err-reg-confirm', ''); }

    if (!terms) {
      document.getElementById('err-reg-terms').textContent = t('err.reg.terms'); valid = false;
    } else { document.getElementById('err-reg-terms').textContent = ''; }

    if (!valid) return;

    const btn = document.getElementById('btn-register');
    btn.disabled = true;
    btn.textContent = t('btn.register.loading');

    try {
      const res  = await fetch('php/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ name, email, phone, password }),
      });
      const data = await res.json();

      if (data.success) {
        showAlert('register-alert', t('alert.register.success'), 'success');
        formRegister.reset();
        setTimeout(() => switchTab('login'), 1800);
      } else {
        showAlert('register-alert', data.message || t('alert.register.fail'), 'error');
      }
    } catch {
      showAlert('register-alert', t('err.connection'), 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = t('btn.register');
    }
  });
}

// ── Social Login Placeholder ──────────────────────────────────
function socialLogin(provider) {
  alert(provider + t('social.soon'));
}
