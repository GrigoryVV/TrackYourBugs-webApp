// Code that initializes datepicker element from materialize lib
document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.datepicker');
    let curentDate = new Date();
    let options ={
        autoClose : true,
        format : 'yyyy-mm-dd',
        yearRange : [1900, curentDate.getUTCFullYear()]
    };
    let instances = M.Datepicker.init(elems, options);
});


// Code that prepares data and sends ajax requests after filling the sign-up form
document.querySelector('#signup-submit').onclick = function(event) {
    event.preventDefault();
    let validState = document.querySelectorAll('.explaining'); // Validation cheking due to finding all error messages
    if (validState.length > 0) {
        chips('Fill with correct values', 'chips-error');
    } else {
        let name = document.querySelector('#signup-name').value;
        let pass = document.querySelector('#signup-pass').value;
        let email = document.querySelector('#signup-email').value;
        let birthday = document.querySelector('#signup-birthday').value;
        let sex = document.querySelectorAll('.signup-sex');
        for (let i = 0; i < sex.length; i++) {
            if (sex[i].checked) {
                sex = sex[i].value;
                break;
            }
        }
        let data = {
            "name" : name,
            "pass" : pass,
            "email" : email,
            "birthday" : birthday,
            "sex" : sex
        };
         
        ajax('core/signup.php', 'post', signUp, data);
    }
};

// Function that processes server respond on registration ajax request
function signUp(result) {
    console.log(result);
    if (result == 2) {
        chips('Fill all fields', 'chips-info');
    } else if (result == 1) {
        chips("You're registred!", 'chips-success');
        setTimeout(closeModal, 3000);
        document.querySelector('#signup-name').value = '';
        document.querySelector('#signup-pass').value = '';
        document.querySelector('#signup-pass-checker').value = '';
        document.querySelector('#signup-email').value = '';
        document.querySelector('#signup-birthday').value = '';
    } else {
        chips('Something goes wrong :(', 'chips-error');
    }
}

// Checking the agreement with rules
document.querySelector('#rules-agreed').onchange = function() {
    if (this.checked) {
        document.querySelector('#signup-submit').classList.remove('disabled');
    } else {
        document.querySelector('#signup-submit').classList.add('disabled');
    }
};

// Code that prepares data and sends ajax requests after filling the sign-in (login) form
document.querySelector('#signin-submit').onclick = function(event) {
    event.preventDefault();
    let pass = document.querySelector('#signin-pass').value;
    let email = document.querySelector('#signin-email').value;
    
    let data = {
        "pass" : pass,
        "email" : email,
    };
     
    ajax('core/login.php', 'post', login, data);
};

// Function that processes server respond on login ajax request
function login(result) {
    // console.log(result);
    if (result == 2) {
        chips('Fill all fields', 'chips-info');
    } else if (result == 0) {
        chips('Account is undefined...', 'chips-error');
    } else {
        console.log(result);
        result = JSON.parse(result);
        let cookieDate = new Date();
        cookieDate.setTime(cookieDate.getTime() + (8*60*60*1000));
        let cookieExpires = cookieDate.toUTCString();
        document.cookie = `email=${result.email}; expires=${cookieExpires}; path=/`;
        location.href = 'cabinet.php';
    }
}