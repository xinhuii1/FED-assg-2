function signIn(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const userInput = document.getElementById('email-input').value; // Can be email or phone number
    const password = document.getElementById('password-input').value;

    // Validation: Ensure input fields are not empty
    if (!userInput || !password) {
        alert('Please fill in all fields.');
        return false;
    }

    // Define your restdb.io API endpoint and API key
    const API_KEY = '67a4eec1fd5d5864f9efe119';
    const DATABASE_URL = 'https://mokesell-0891.restdb.io/rest/user-profile'; // Make sure this points to your correct collection

    // Headers for the GET request
    const headers = {
        'Content-Type': 'application/json',
        'x-apikey': API_KEY
    };

    // Fetch all users from the database
    fetch(DATABASE_URL, {
        method: 'GET',
        headers: headers
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch users. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(users => {
            console.log('Users retrieved from database:', users);
            
            // Search for a matching user
            const matchedUser = users.find(user =>
                (user.gmail === userInput || user.phoneNumber === userInput) && user.password === password
            );

            if (matchedUser) {
                console.log('Login successful!', matchedUser);

                // Save login status and user information
                localStorage.setItem('loginUser', matchedUser.gmail.split('@')[0]); // Save username
                localStorage.isLogin = true;

                // Redirect to a success modal or dashboard
                openSuccessModal();
                localStorage.setItem("userid", matchedUser.userId)
            } else {
                alert('Invalid email/phone number or password. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error during login:', error.message);
            alert('Login failed. Please try again later.');
        });
}

function openSuccessModal() {
    fetch('success_signup.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('modal-placeholder').innerHTML = html;

            // Load modal scripts
            const script = document.createElement('script');
            script.src = 'modal.js';
            document.body.appendChild(script);

            const script2 = document.createElement('script');
            script2.src = 'success_signup.js';
            document.body.appendChild(script2);

            Animation1('.full-screen-wrapper', '.modal-container');
        });
}

function openSignUpModal() {
    event.preventDefault(); // Prevent default link behavior

    // Fetch and display the signup modal
    fetch('sign_up.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch sign_up.html. Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            const modalPlaceholder = document.querySelector('.full-screen-wrapper');
            modalPlaceholder.innerHTML = html;

            // Dynamically load required scripts for the signup modal
            const script = document.createElement('script');
            script.src = 'sign_up.js';
            script.onload = () => {
                console.log('Sign-up script loaded');
            };
            document.body.appendChild(script);
        })
        .catch(error => {
            console.error('Error fetching signup modal:', error.message);
        });
}

function openSuccessModal(){
    fetch('success_login.html')
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
            script2.src = 'success_login.js';
            script2.onload = () => {
                console.log('Success dialog JS loaded');
            }
            document.body.appendChild(script2);
            Animation1('.full-screen-wrapper', '.modal-container');
        });
}
