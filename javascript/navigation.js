
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.login-button');
    const registerButton = document.querySelector('.Register-button');
    const phoneLoginButton = document.querySelector('.phone-login-button');
    const phoneRegisterButton = document.querySelector('.phone-Register-button');
    
   
    if(localStorage.isLogin == null){                                               //check if login ornot
        loginButton.addEventListener('click', openLoginModal)
        registerButton.addEventListener('click', openSignUpModal)
        phoneLoginButton.addEventListener('click', openLoginModal)
        phoneRegisterButton.addEventListener('click', openSignUpModal)
    } 
    else {
        loginButton.style.display = 'initial';                                     //Ensure the button is visible
        loginButton.textContent = 'Logout';                                        //Change the content to log out
        loginButton.addEventListener('click', logout)                              //Make it clickable
        
        
        registerButton.style.display = 'none';                                     //Remove register button
        phoneRegisterButton.style.display = 'none';

        const userDisplay = document.createElement('h1');
        userDisplay.style.marginLeft = '10px'
        userDisplay.style.display = 'inline-block';
        userDisplay.style.fontSize = '14px';
        userDisplay.style.color = 'white';
        userDisplay.style.backgroundColor = '#53589A';
        userDisplay.style.padding = '15px';
        userDisplay.style.borderRadius = '50%';
        userDisplay.style.lineHeight = '25px';
        userDisplay.textContent = localStorage.loginUser ;                               // Show the current username
        const lastDiv = document.querySelector(".navigation-container div:last-of-type");//Last div child using css selector
        lastDiv.appendChild(userDisplay);
        
    }
})

function openLoginModal(){
    fetch('login.html')
        .then(response => response.text())  
        .then(html => {
            document.getElementById('modal-placeholder').innerHTML = html;

            const script = document.createElement('script');
            script.src = 'modal.js';  
            script.onload = () => {
                console.log('Modal JS loaded');
            };
            document.body.appendChild(script); 
            const script2 = document.createElement('script');
            script2.src = 'login.js'; 
            script2.onload = () => {
                console.log('Login JS loaded');
            }
            document.body.appendChild(script2);
            Animation1('.full-screen-wrapper', '.modal-container');
        });
}

function openSignUpModal(){
    fetch('sign_up.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('modal-placeholder').innerHTML = html;

            const script = document.createElement('script');
            script.src = 'modal.js'; 
            script.onload = () => {
                console.log('Modal JS loaded');
            };

            document.body.appendChild(script); 
            const script2 = document.createElement('script');
            script2.src = 'sign_up.js';
            script2.onload = () => {
                console.log('Sign up JS loaded');
            }
            document.body.appendChild(script2);
            Animation1('.full-screen-wrapper', '.modal-container');
        });
}

function logout(){
    localStorage.removeItem('isLogin');
    localStorage.removeItem('loginUser')
    alert('Logout success')
    window.location.reload();
}
