const form = document.querySelector('#loginForm');
const passwordInput = document.querySelector('#password');
const togglePassword = document.querySelector('#togglePassword');
const formMessage = document.querySelector('#formMessage');
const submitButton = form.querySelector('[type="submit"]');
const params = new URLSearchParams(window.location.search);

if (params.get('config') === 'missing') {
  formMessage.textContent = 'O acesso ainda não foi configurado na Vercel.';
}

togglePassword.addEventListener('click', () => {
  const show = passwordInput.type === 'password';
  passwordInput.type = show ? 'text' : 'password';
  togglePassword.textContent = show ? 'Ocultar' : 'Mostrar';
  togglePassword.setAttribute('aria-label', show ? 'Ocultar senha' : 'Mostrar senha');
  passwordInput.focus();
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  formMessage.textContent = '';
  if (!passwordInput.value) {
    formMessage.textContent = 'Digite a senha para continuar.';
    passwordInput.focus();
    return;
  }

  submitButton.disabled = true;
  submitButton.classList.add('is-loading');
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: passwordInput.value, next: params.get('next') || '/' }),
    });
    const result = await response.json();
    if (!response.ok) {
      formMessage.textContent = result.error === 'not_configured'
        ? 'O acesso ainda não foi configurado na Vercel.'
        : 'Senha incorreta. Tente novamente.';
      passwordInput.select();
      return;
    }
    window.location.assign(result.next || '/');
  } catch {
    formMessage.textContent = 'Não foi possível validar agora. Tente novamente.';
  } finally {
    submitButton.disabled = false;
    submitButton.classList.remove('is-loading');
  }
});
