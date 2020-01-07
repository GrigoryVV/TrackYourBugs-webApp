// Floating info messages that changing base alerts

function chips(message, type='chips-info', timeRemove=3000) {
    let chip = document.createElement('div');
    chip.classList.add('chips');
    chip.classList.add(type);
    chip.innerHTML = message;
    addChips(chip);
    setTimeout(function() {deleteChips(chip);}, timeRemove);
}
function deleteChips(chip) {
    chip.remove();
    let allChips = document.querySelectorAll('.chips-field .chips');
    if (allChips.length == 0) document.querySelector('.chips-field').remove();
}

function addChips(chip) {
    let chipsField = document.querySelector('.chips-field');
    if (!chipsField) {
        chipsField = document.createElement('div');
        chipsField.classList.add('chips-field');
        document.querySelector('body').prepend(chipsField);
    }
    chipsField.append(chip);
}