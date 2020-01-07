// Adding a logout function on the logout button due to changing cookie expire date
document.querySelector('#logout').onclick = function (event) {
    let c = document.cookie;
    console.log(c);
    let cookieDate = new Date();
    cookieDate.setTime(cookieDate.getTime() - (10 * 60 * 1000));
    let cookieExpires = cookieDate.toUTCString();
    document.cookie = `${c}; expires=${cookieExpires}; path=/`;
    location.reload();
};