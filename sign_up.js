function togglePassword(fieldId, iconId) {
    const passwordField = document.getElementById(fieldId); // Selects the password input field by its ID
    const eyeIcon = document.getElementById(iconId);        // Selects the eye icon by its ID

    if (passwordField.type === 'password') {
        passwordField.type = 'text';                        // Change it to 'text', making the characters visible
        eyeIcon.classList.remove('fa-eye');                // Switch the eye icon to 'slash'
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';                   // Hide the password
        eyeIcon.classList.remove('fa-eye-slash');          // Switch the icon back to 'eye'
        eyeIcon.classList.add('fa-eye');
    }
}


function signUp(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email-input').value.trim();
    const password = document.getElementById('password-input').value.trim();
    const confirmPassword = document.getElementById('confirm-password-input').value.trim();
    const phone = document.getElementById('phone-input').value.trim();

    // Email Validation
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email)) {
        alert("Invalid email address!");
        return;
    }

    // Phone Validation
    /*if (!/^\+?\d{10,15}$/.test(phone)) {
        alert("Invalid phone number!\n\nPhone numbers must be 10-15 digits, optionally starting with '+'");
        return;
    }*/

    // Password Validation
    if (!/^[\w!@#$%^&*]{7,14}$/.test(password)) {
        alert(
            "Invalid password!\n\nPassword must be:\n" +
            "✔ 7-14 characters\n" +
            "✔ Can include letters, numbers, and special characters (!@#$%^&*)"
        );
        return;
    }

    // Confirm Password Match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Prepare the user data for restdb.io
    const userData = { "username": username,"gmail": email, "password": password, "phoneNumber": phone };

    // Replace with your restdb.io API endpoint and API key
    const API_KEY = '67a4eec1fd5d5864f9efe119'; 
    const DATABASE_URL = 'https://mokesell-0891.restdb.io/rest/user-profile';

    // Headers for the request
    const headers = {
        'Content-Type': 'application/json',
        'x-apikey': API_KEY
    };

    console.log('Sending request to:', DATABASE_URL); // Debugging
    console.log('Request body:', userData); // Debugging

    // Send a POST request to restdb.io
    fetch(DATABASE_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(userData)
    })
        .then(response => {
            console.log('Response status:', response.status); // Debugging
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(err => {
                    throw new Error(`Failed to create user. Status: ${response.status}. Message: ${err.message}`);
                });
            }
        })
        .then(data => {
            console.log('User created successfully!', data);

            // Save user data to localStorage (optional)
            localStorage.setItem('loginUser', username); // Save username
            localStorage.isLogin = true; // Update login status

            // Show success message or redirect

            localStorage.setItem("userid", data.userId);
            console.log(localStorage.getItem("userid"));
            openSuccessModal();
        })
        .catch(error => {
            console.error('Error:', error.message);
            alert('Signup failed. Please try again.');
        });
}


function openContinueWithGoogleModal() {
    event.preventDefault();                                                        // Prevent default behavior, refreshing

    fetch('continue_with_google.html')
        .then(response =>response.text())                                          // Get the HTML content as a string
        .then(html => {
            const modalPlaceholder = document.getElementById('modal-placeholder'); //Get the ID
            modalPlaceholder.innerHTML = html;                                     //Insert vthe contents into the ID
            Animation1('.full-screen-wrapper', '.modal-container');
        });
}

function openSuccessModal(){
    fetch('success_signup.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('modal-placeholder').innerHTML = html;
            const script = document.createElement('script');                       //Creatng script to contain js
            script.src = 'modal.js';  
            script.onload = () => {                                                //onload ensures that your code runs only after the content has been added
                console.log('External JS loaded');                                 
            };
            document.body.appendChild(script); 
            const script2 = document.createElement('script');
            script2.src = 'success_signup.js';
            script2.onload = () => {
                console.log('Success dialog JS loaded');
            }
            document.body.appendChild(script2);
            Animation1('.full-screen-wrapper', '.modal-container');
        });
}