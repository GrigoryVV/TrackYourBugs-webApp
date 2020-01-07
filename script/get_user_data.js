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

// Code that gets user data from server via email as a key value
let userEmail = getCookie('email');
// console.log(userEmail);
ajax('core/get_user_data.php', 'post', getUserData, {"email" : userEmail});

// Code that updates user data on server due to ajax request
document.querySelector('#change-submit').onclick = function(event) {
    event.preventDefault();
    let sex = document.querySelectorAll('.change-sex');
    for (let i = 0; i < sex.length; i++) {
        if (sex[i].checked) {
            sex = sex[i].value;
            break;
        }
    }
    let updateData = {
        "email" : userEmail,
        "name" : document.querySelector('#change-name').value,
        "pass" : document.querySelector('#change-pass').value,
        "birthday": document.querySelector('#change-birthday').value,
        "sex" : sex
    }; 
    ajax('core/update_user_data.php', 'post', updateUserData, updateData);
};

// Function that finds a value for a cookie name
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function getUserData(result) {
    result = JSON.parse(result);
    // console.log(result);
    document.querySelector('#change-name').value = result.name;
    document.querySelector('#change-pass').value = result.password;
    document.querySelector('#change-birthday').value = result.birthday;
    let sex = document.querySelectorAll('.change-sex');
    for (let i = 0; i < sex.length; i++) {
        if (sex[i].value == result.sex) {
            sex[i].checked = true;
            break;
        }
    }
    M.updateTextFields();
}

function updateUserData(result) {
    // console.log(result);
    if (result == 1) {
        chips('Data is successfuly updated', 'chips-success');
        // alert('Data is successfuly updated');
    } else {
        chips('Update error', 'chips-error');
        // alert('Update error');
    }
}