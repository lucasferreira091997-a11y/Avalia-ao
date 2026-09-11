const form = document.getElementById('feedbackForm');
const commentBox = document.getElementById('comment');
const counter = document.getElementById('counter');
const submitBtn = document.getElementById('submitBtn');

// Contador regressivo de caracteres
commentBox.addEventListener('input', () => {
  const remaining = 140 - commentBox.value.length;
  counter.textContent = remaining;
});

// Envio assíncrono via Fetch
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  submitBtn.textContent = 'Enviando...';
  submitBtn.disabled = true;

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      alert('Obrigado! Sua avaliação foi enviada com sucesso.');
      form.reset();
      counter.textContent = '140';
    } else {
      alert('Ocorreu um erro ao enviar sua avaliação. Tente novamente.');
    }
  } catch (error) {
    alert('Erro de conexão. Verifique sua rede e tente novamente.');
  } finally {
    submitBtn.textContent = 'Enviar avaliação';
    submitBtn.disabled = false;
  }
});