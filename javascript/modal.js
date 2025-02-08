window.onload = () => {
    document.querySelector('.full-screen-wrapper').classList.add('loaded');
};

function closeModal() {
    const modal = document.querySelector('.full-screen-wrapper');
    const modalContainer = document.querySelector('.modal-container');

    modal.style.opacity = '0';
    modalContainer.style.top = '-100%';
    document.body.style.overflow = 'auto';
}

function Animation1(modalSelector, containerSelector) {
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
