// Slider movement events

document.querySelector('.slider-read').onclick = function() {
    document.querySelector('.slider-container').style.marginLeft = '-298px';
};

document.querySelector('.slider-read-back').onclick = function() {
    document.querySelector('.slider-container').style.marginLeft = '0';
};