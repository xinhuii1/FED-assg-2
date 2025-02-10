// Function to open the sign-up modal
function openSignUpModal(event) {
    event.preventDefault(); // Prevent default behavior (e.g., form submission or link navigation)

    // Fetch the sign-up modal content
    fetch('sign_up.html')
        .then(response => response.text())
        .then(html => {
            // Inject the fetched HTML into the modal placeholder
            document.getElementById('modal-placeholder').innerHTML = html;

            // Load any necessary scripts for the modal
            const modalScript = document.createElement('script');
            modalScript.src = 'modal.js'; // Script for modal functionality
            modalScript.onload = () => {
                console.log('Modal JS loaded');
            };
            document.body.appendChild(modalScript);

            // Load any additional scripts for the sign-up functionality
            const signUpScript = document.createElement('script');
            signUpScript.src = 'sign_up.js'; // Script for sign-up functionality
            signUpScript.onload = () => {
                console.log('Sign up JS loaded');
            };
            document.body.appendChild(signUpScript);

            // Trigger the modal animation or display logic
            Animation1('.full-screen-wrapper', '.modal-container');
        })
        .catch(error => {
            console.error('Error loading sign-up modal content:', error);
        });
}

// Function to open the login modal
function openLoginModal(event) {
    event.preventDefault(); // Prevent default behavior

    // Fetch the login modal content
    fetch('login.html')
        .then(response => response.text())
        .then(html => {
            // Inject the fetched HTML into the modal placeholder
            document.getElementById('modal-placeholder').innerHTML = html;

            // Load any necessary scripts for the modal
            const modalScript = document.createElement('script');
            modalScript.src = 'modal.js'; // Script for modal functionality
            modalScript.onload = () => {
                console.log('Modal JS loaded');
            };
            document.body.appendChild(modalScript);

            // Load any additional scripts for the login functionality
            const loginScript = document.createElement('script');
            loginScript.src = 'login.js'; // Script for login functionality
            loginScript.onload = () => {
                console.log('Login JS loaded');
            };
            document.body.appendChild(loginScript);

            // Trigger the modal animation or display logic
            Animation1('.full-screen-wrapper', '.modal-container');
        })
        .catch(error => {
            console.error('Error loading login modal content:', error);
        });
}

// Select the register button by its class
const registerButton = document.querySelector('.Register-button');

const anonymousHandler = function(event) {
    openSignUpModal(event)
};
// Add a click event listener to the register button


registerButton.addEventListener('click', anonymousHandler);

// Select the login button by its class
const loginButton = document.querySelector('.login-button');

// Add a click event listener to the login button
loginButton.addEventListener('click', function(event) {
    openLoginModal(event); // Open the login modal
});


