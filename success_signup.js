function closeModalAndRedirect() {
    //Close modal
    const modal = document.querySelector('.full-screen-wrapper');
    const modalContainer = document.querySelector('.modal-container');
    modal.style.opacity = '0';
    modalContainer.style.top = '-100%';
    document.body.style.overflow = 'auto';
    
    //set login status
    localStorage.isLogin = true;
    //window.location.href = 'homepage.html';
}