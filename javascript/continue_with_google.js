function signIn(event) {
    event.preventDefault();

    // Get input values
    const userInput = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;

    if (!userInput || !password) {
        alert('Please fill in all fields.');
        return false;
    }

    const API_KEY = '6797a9b3f9d2bb2d72181e49';
    const DATABASE_URL = 'https://interactivedev-98b2.restdb.io/rest/usersdemo';

    fetch(DATABASE_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': API_KEY
        }
    })
    .then(response => {
        if (!response.ok) throw new Error(`Failed to fetch users. Status: ${response.status}`);
        return response.json();
    })
    .then(users => {
        const matchedUser = users.find(user =>
            (user.email === userInput || user.phone === userInput) && user.password === password
        );

        if (matchedUser) {
            localStorage.setItem('loginUser', matchedUser.email.split('@')[0]);
            localStorage.isLogin = true;
            openSuccessModal();
        } else {
            alert('Invalid email/phone number or password. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error during login:', error.message);
        alert('Login failed. Please try again later.');
    });
}
