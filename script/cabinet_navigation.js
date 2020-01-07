let sectionProjects = document.querySelector('#projects');
let sectionUserInfo = document.querySelector('#user-information');
let sectionBugs = document.querySelector('#project-bugs');
let allBugRows;

document.querySelector('#nav_projects').onclick = function(event) {
    event.preventDefault();

    allBugRows = document.querySelectorAll('tr');
    for (let row of allBugRows) {
        if (row.classList.contains('table-head-row')) {
        } else {
            row.remove();
        }
    }

    if (sectionProjects.classList.contains('hide')) {
        sectionProjects.classList.remove('hide');
        sectionUserInfo.classList.add('hide');
        sectionBugs.classList.add('hide');
    }
};

document.querySelector('#nav_user-information').onclick = function(event) {
    event.preventDefault();
    
    allBugRows = document.querySelectorAll('tr');
    for (let row of allBugRows) {
        if (row.classList.contains('table-head-row')) {
        } else {
            row.remove();
        }
    }

    if (sectionUserInfo.classList.contains('hide')) {
        sectionUserInfo.classList.remove('hide');
        sectionProjects.classList.add('hide');
        sectionBugs.classList.add('hide');
    }
};

document.querySelector('.back-btn').onclick = function(event) {
    event.preventDefault();

    allBugRows = document.querySelectorAll('tr');
    for (let row of allBugRows) {
        if (row.classList.contains('table-head-row')) {
        } else {
            row.remove();
        }
    }

    if (sectionProjects.classList.contains('hide')) {
        sectionProjects.classList.remove('hide');
        sectionUserInfo.classList.add('hide');
        sectionBugs.classList.add('hide');
    }
}

// Initialization of nav button in medium and small screens
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
});
