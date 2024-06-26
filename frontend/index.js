document.getElementById('loginButton')?.addEventListener('click', () => {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
  
    fetch('/api/index', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.redirect) {
            window.location.href = data.redirect;
          } else {
            document.getElementById('heading').textContent = data.message;
          }
    });
  });
  
  document.getElementById('signupButton')?.addEventListener('click', () => {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById("confirm-password").value;

    if(confirm!=password){
        window.alert("passwords do not match");
        return;
    }
  
    fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
    if(data.message === "User registered successfully"){
        document.getElementById('heading').textContent = data.message;
        document.getElementById("signupBox").innerHTML = "";
        document.getElementById("signupBox").style.border = "none";

        const elem = document.createElement("p");
        elem.textContent = "Now you can close this tab and login";
        document.body.appendChild(elem);
    }else{
        window.alert(data.message);
    }
    });
  });
  