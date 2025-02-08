document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.querySelector('.login-button');
    const registerButton = document.querySelector('.Register-button');

    // Check if user is logged in
    if (localStorage.isLogin) {
        loginButton.textContent = 'Logout';
        loginButton.addEventListener('click', logout);
        registerButton.style.display = 'none';

        // Show logged-in username
        const userDisplay = document.createElement('h1');
        userDisplay.textContent = localStorage.loginUser;
        userDisplay.style.color = 'white';
        userDisplay.style.backgroundColor = '#53589A';
        userDisplay.style.padding = '10px';
        userDisplay.style.borderRadius = '50%';
        document.querySelector(".navigation-container div:last-of-type").appendChild(userDisplay);
    } else {
        loginButton.addEventListener('click', openLoginModal);
        registerButton.addEventListener('click', openSignUpModal);
    }
});

// Function to open the sign-up modal
function openSignUpModal(event) {
    event.preventDefault();

    fetch('sign_up.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('modal-placeholder').innerHTML = html;
            loadScript('modal.js');
            loadScript('sign_up.js');
            animateModal('.full-screen-wrapper', '.modal-container');
        })
        .catch(error => console.error('Error loading sign-up modal content:', error));
}

// Function to open the login modal
function openLoginModal(event) {
    event.preventDefault();

    fetch('login.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('modal-placeholder').innerHTML = html;
            loadScript('modal.js');
            loadScript('login.js');
            animateModal('.full-screen-wrapper', '.modal-container');
        })
        .catch(error => console.error('Error loading login modal content:', error));
}

// Function to logout
function logout() {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('loginUser');
    alert('Logout successful');
    window.location.reload();
}

// Function to dynamically load scripts
function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
}

// Function to animate modal
function animateModal(modalSelector, containerSelector) {
    const modal = document.querySelector(modalSelector);
    const modalContainer = document.querySelector(containerSelector);

    modal.style.opacity = '0';
    modalContainer.style.top = '-100%';

    setTimeout(() => {
        modalContainer.style.transition = 'top 0.8s ease';
        modal.style.opacity = '1';
        modalContainer.style.top = '50%';
        modalContainer.style.transform = 'translate(-50%, -50%)';
    }, 100);

    document.body.style.overflow = 'hidden';
}
