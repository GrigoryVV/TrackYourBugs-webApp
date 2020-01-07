let expSteps = document.querySelectorAll('.explainer-step');
let expImgs = document.querySelectorAll('.explainer-img');

expSteps.forEach(elem => {
    elem.onmouseenter = () => {showImg(elem);};
});

function showImg(element) {
    for (let step of expSteps) {
        step.classList.remove('step-active');
    }
    element.classList.add('step-active');
    for (let img of expImgs) {
        if (element.dataset.step === img.dataset.step) {
            img.classList.remove('hide');
        } else {
            img.classList.add('hide');
        }
    }
}
