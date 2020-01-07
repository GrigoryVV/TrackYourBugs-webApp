let inputs = document.querySelectorAll('input[data-rule]');
let passChecker = document.querySelector('#signup-pass-checker');
let passPrimary = document.querySelector('#signup-pass');

// Event listener that checks validation type and validates all forms
for (let input of inputs) {
    input.addEventListener('blur', function() {
        let vlaidationType = this.dataset.rule;
        switch(vlaidationType) {
            case 'name':
                if (this.value.length > 2) {
                    inputIsValid(this);
                    if (document.querySelector('.name-explaining') !== null) {
                        document.querySelector('.name-explaining').remove();
                    }
                } else {
                    invalidExplanation(this, vlaidationType);
                    inputIsInvalid(this);
                }
                break;
            case 'email':
                let regEmail = /^[\w\d\.-]+\@[\w\d-]{2,}\.[a-z]{2,}$/i;
                if (regEmail.test(this.value)) {
                    inputIsValid(this);
                    if (document.querySelector('.email-explaining') !== null) {
                        document.querySelector('.email-explaining').remove();
                    }
                } else {
                    invalidExplanation(this, vlaidationType);
                    inputIsInvalid(this);
                }
                break;
            case 'pass':
                let regPass = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
                if (regPass.test(this.value)) {
                    inputIsValid(this);
                    if (document.querySelector('.pass-explaining') !== null) {
                        document.querySelector('.pass-explaining').remove();
                    }
                } else {
                    invalidExplanation(this, vlaidationType);
                    inputIsInvalid(this);
                }
                break;
            case 'date':
                let regDate = /^\d\d\d\d-[0-1]\d-[0-3]\d$/;
                if (regDate.test(this.value) || this.value == '') {
                    inputIsValid(this);
                    if (document.querySelector('.date-explaining') !== null) {
                        document.querySelector('.date-explaining').remove();
                    }
                } else {
                    invalidExplanation(this, vlaidationType);
                    inputIsInvalid(this);
                }
                break;
        }
    });
}

// Event listener that matches paswords during registration
passChecker.addEventListener('blur', function() {
    if (this.value === passPrimary.value) {
        inputIsValid(this);
        if (document.querySelector('.pass-check-explaining') !== null) {
            document.querySelector('.pass-check-explaining').remove();
        }
    } else {
        invalidExplanation(this, 'pass-check');
        inputIsInvalid(this);
    }
});


function inputIsValid(htmlElement) {
    htmlElement.classList.remove('valid-input');
    htmlElement.classList.remove('invalid-input');
    htmlElement.classList.add('valid-input');
}

function inputIsInvalid(htmlElement) {
    htmlElement.classList.remove('valid-input');
    htmlElement.classList.remove('invalid-input');
    htmlElement.classList.add('invalid-input');
}

// Function that creates info messages when some input doesn't pass validation
function invalidExplanation(element, ruleType) {
    let explaining = document.createElement('div');
    explaining.classList.add('explaining');
    let singleExplaining = document.querySelector(`.${ruleType}-explaining`);
    if (!singleExplaining) {
        explaining.classList.add(`${ruleType}-explaining`);
        if (ruleType === 'name') {
            explaining.innerHTML = 'Name should be longer than 2 characters';
        } else if (ruleType === 'email') {
            explaining.innerHTML = 'Please type a correct email';
        } else if (ruleType === 'pass') {
            explaining.innerHTML = '<div>Password should be longer than 6 and less than 20 characters and contain at least:</div><ul><li>- one number (0-9)</li><li>- one lowercase letter (a-z)</li><li>- one uppercase letter (A-Z)</li><li>- one special symbol (!@#$%^&*)</li></ul><div>You can use only latin letters!</div>';
        } else if (ruleType === 'date') {
            explaining.innerHTML = 'Please check if date typed in correct form: YYYY-MM-DD';
        } else if (ruleType === 'pass-check') {
            explaining.innerHTML = "Passwords don't match!";
        } else {
            explaining.innerHTML = 'Something went wrong :(';
        }
        element.after(explaining);
    }
}