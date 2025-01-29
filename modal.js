window.onload = () => {
    document.querySelector('.full-screen-wrapper').classList.add('loaded');  //Select the id and make it an element
};

function closeModal(){
    const modal = document.querySelector('.full-screen-wrapper');            //Hides the modal to make it transparent
    const loginContainer = document.querySelector('.modal-container');       //Moves the modal off-screen
    
    modal.style.opacity = '0';
    loginContainer.style.top = '-100%'; 
    document.body.style.overflow = 'auto'; 
    
    window.history.back();//Restore back the scroll function
}   

function Animation1(modalSelector, containerSelector) {
    const modal = document.querySelector(modalSelector);
    const modalContainer = document.querySelector(containerSelector);

    modal.style.opacity = '0';                                               // Start animation
    modalContainer.style.top = '-100%';

    setTimeout(() => {
        modalContainer.style.transition = 'top 0.8s ease';
        modal.style.opacity = '1';
        modalContainer.style.top = '50%';                                   //shifting the whole object
        modalContainer.style.transform = 'translate(-50%, -50%)';           //shifting it such that 100% is the object width not the screen
    }, 100);

    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
}