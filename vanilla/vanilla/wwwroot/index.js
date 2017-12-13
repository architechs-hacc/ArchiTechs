checkLoginStatus();

document.getElementById('proceed').addEventListener('click', onProceed);

function checkLoginStatus() {
  // If user is logged in already, redirect to main.html
  if (window.localStorage.getItem('pipe-name')) {
    window.location.href = '/main.html';
  }
}

function onProceed() {
  window.localStorage.setItem('pipe-name', document.getElementById('name').value);
  window.localStorage.setItem('pipe-email', document.getElementById('email').value);

  window.location.href = '/main.html';
}