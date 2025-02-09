function openSignUpModal(){
    event.preventDefault();
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

function openContinueWithGoogleModal(){
    fetch('continue_with_google.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('modal-placeholder').innerHTML = html;

            const script = document.createElement('script');
            script.src = 'modal.js'; 
            script.onload = () => {
                console.log('External JS loaded');
            };
            document.body.appendChild(script); 
            const script2 = document.createElement('script');
            script2.src = 'continue_with_google.js'; 
            script2.onload = () => {
                console.log('Continue with google dialog JS loaded');
            }
            document.body.appendChild(script2);
            Animation1('.full-screen-wrapper', '.modal-container');
        });
}

function openSuccessModal(){
    fetch('success_login.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('modal-placeholder').innerHTML = html;

            const script = document.createElement('script');
            script.src = 'modal.js';  
            script.onload = () => {
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