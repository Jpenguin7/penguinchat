// Sign up
function signup() {
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;
  const file = document.getElementById('profile-pic').files[0];

  if (!username || !password || !file) {
    alert('Please fill all fields!');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    localStorage.setItem('penguinUser', JSON.stringify({
      username,
      password,
      pic: e.target.result
    }));
    alert('Account created! You can now log in.');
    window.location.href = 'index.html';
  };
  reader.readAsDataURL(file);
}

// Profile pic preview
if (document.getElementById('profile-pic')) {
  document.getElementById('profile-pic').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        const preview = document.getElementById('preview');
        preview.src = evt.target.result;
        preview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });
}

// Login
function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  const storedUser = JSON.parse(localStorage.getItem('penguinUser'));

  if (storedUser && storedUser.username === username && storedUser.password === password) {
    localStorage.setItem('loggedIn', 'true');
    window.location.href = 'chat.html';
  } else {
    alert('Invalid login!');
  }
}

// Chat send message
function sendMessage() {
  const msgBox = document.getElementById('message');
  const chatBox = document.getElementById('chat-box');
  const user = JSON.parse(localStorage.getItem('penguinUser'));

  if (msgBox.value.trim() === '') return;

  const msgDiv = document.createElement('div');
  msgDiv.innerHTML = `<img src="${user.pic}" style="width:30px; height:30px; border-radius:50%;"> <strong>${user.username}:</strong> ${msgBox.value}`;
  chatBox.appendChild(msgDiv);

  msgBox.value = '';
}
