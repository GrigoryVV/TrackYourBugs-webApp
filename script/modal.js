// Modal window functionality

document.querySelectorAll('.modal-show').forEach(element => {
    element.onclick = showModal;
});

document.querySelectorAll('.modal-close').forEach(element => {
    element.onclick = closeModal;
});

document.querySelectorAll('.modal-wrap').forEach(element => {
    element.onmousedown = function(event) {
        if (event.target == this) {
            closeModal();
        }
    };
});

// Function that opens modal window
function showModal() {
    let modalId = this.dataset.modal;
    
    document.querySelector(modalId).classList.remove('hide'); 
    document.onkeydown = function (event) {
        if (event.key == 'Escape') {
            closeModal();
        }
    };
}

// Function that closes modal window
function closeModal() {
    document.querySelectorAll('.modal-wrap').forEach(element => {
        element.classList.add('hide');
    });
    document.onkeydown = null;
}

