document.getElementById('forms').addEventListener('submit', async function(e) {
  e.preventDefault();
  const username = document.getElementById('email').value;
  const password = document.getElementById('senha').value;

  try {
   const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok && data.token) {
      localStorage.setItem('token', data.token); 
      window.location.href = 'menu.html';
    } else {
      alert(data.error || 'Login inválido');
    }
  } catch (err) {
    alert('Erro ao conectar ao servidor');
  }
});