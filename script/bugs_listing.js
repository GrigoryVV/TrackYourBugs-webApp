// Code for bugs listing

let allProjects;
let pId;
let pName;

document.querySelector('#projects-list').addEventListener('mouseenter', function() {
    allProjects = document.querySelectorAll('.project-example');
    
    for (let project of allProjects) {
        project.onclick = openBugs;
    }
});

document.querySelector('#bug-add').onclick = function(event) {
    event.preventDefault();

    let bName = document.querySelector('#bug-name').value;
    let bDescription = document.querySelector('#bug-description').value;
    let bDate = new Date();
    bDate = `${bDate.getUTCFullYear()}-${bDate.getUTCMonth()}-${bDate.getUTCDate()} ${bDate.getUTCHours()}:${bDate.getUTCMinutes()}:${bDate.getUTCSeconds()}`;
    let bCreator = userEmail;
    
    let data = {
        "b_name" : bName,
        "b_description" : bDescription,
        "b_date" : bDate,
        "b_update" : bDate,
        "b_status" : "Open",
        "b_creator" : bCreator,
        "p_id" : pId
    };

    // Function that processes server respond for creating project ajax request
    function createBug(result) {

        resultJSON = JSON.parse(result);
        let newBugId = resultJSON.b_id;

        if (result == 2) {

            chips('Fill all fields', 'chips-info');
        } else if (resultJSON.b_id != 0) {
            chips("Bug is created!", 'chips-success');

            let bugsContainer = document.querySelector('tbody');

            let bugRow = document.createElement('tr');
            bugRow.dataset.b_id = newBugId;
            bugRow.dataset.modal = '#bug-update-form';
            bugRow.classList.add('modal-show');
            bugRow.classList.add('bug-row');
        
            bugRow.innerHTML = `
            <td>${bName}</td>
            <td>${bDescription}</td>
            <td>Open</td>
            <td>${bDate}</td>
            <td>${bDate}</td>
            `;
            
            bugsContainer.append(bugRow);

            document.querySelector('#bug-name').value = '';
            document.querySelector('#bug-description').value = '';
            M.textareaAutoResize(document.querySelector('#bug-description'));
        } else {
            chips('Something goes wrong :(', 'chips-error');
        }
    }
        
    ajax('core/create_bug.php', 'post', createBug, data);
};

function openBugs() {
    pId = this.dataset.p_id;
    pName = this.children[0].innerText;
    document.querySelector('#bugs-header').innerText = `"${pName}" Bugs`;

    if (sectionBugs.classList.contains('hide')) {
        sectionBugs.classList.remove('hide');
        sectionProjects.classList.add('hide');
        sectionUserInfo.classList.add('hide');
    }

    document.querySelector('table').after(progressBar);
    
    ajax('core/get_bugs.php', 'post', getBugs, {"p_id" : pId});
}

function getBugs(result) {
    result = JSON.parse(result);
    document.querySelector('.progress').remove();

    let bugsContainer = document.querySelector('tbody');

    if (result == 0) return;

    for (let bug of result) {
        let bugRow = document.createElement('tr');
        bugRow.classList.add('bug-row');
        bugRow.dataset.b_id = bug.b_id;
        bugRow.dataset.modal = '#bug-update-form';
        bugRow.classList.add('modal-show');

        bugRow.innerHTML = `
        <td>${bug.b_name}</td>
        <td>${bug.b_description}</td>
        <td>${bug.b_status}</td>
        <td>${bug.b_date}</td>
        <td>${bug.b_update}</td>
        `;
        
        bugsContainer.append(bugRow);
    }
}

// Edit the bugs

document.querySelector('table').addEventListener('mouseenter', function() {
    let allBugs = document.querySelectorAll('.bug-row');
    
    for (let bug of allBugs) {
        bug.addEventListener('click', editBug);
    }
});

function editBug() {
    let bugTableCells = this.children;
    let bId = this.dataset.b_id;

    let modalId = this.dataset.modal;
    
    document.querySelector(modalId).classList.remove('hide'); 
    document.onkeydown = function (event) {
        if (event.key == 'Escape') {
            closeModal();
        }
    };

    document.querySelector('#modal-bug-name').value = bugTableCells[0].innerText;
    document.querySelector('#modal-bug-descr').value = bugTableCells[1].innerText;

    M.textareaAutoResize(document.querySelector('#modal-bug-descr'));

    for (let elem of document.querySelectorAll('.modal-bug-status')) {
        if (elem.value === bugTableCells[2].innerText) {
            elem.checked = true;
        }
    }

    M.updateTextFields();

    document.querySelector('#modal-bug-update').onclick = (e) => {
        e.preventDefault();
        updateBug(bId);
    };
}

function updateBug(bugId) {

    let status;

    for (let elem of document.querySelectorAll('.modal-bug-status')) {
        if (elem.checked) {
            status = elem.value;
        }
    }
    
    let bName = document.querySelector('#modal-bug-name').value;
    let bDescription = document.querySelector('#modal-bug-descr').value;
    let bUpdate = new Date();
    bUpdate = `${bUpdate.getUTCFullYear()}-${bUpdate.getUTCMonth()}-${bUpdate.getUTCDate()} ${bUpdate.getUTCHours()}:${bUpdate.getUTCMinutes()}:${bUpdate.getUTCSeconds()}`;

    let updatedData = {
        "b_id" : bugId,
        "b_name" : bName,
        "b_description" : bDescription,
        "b_update" : bUpdate,
        "b_status" : status
    };

    function updBugRespHandler(result) {
        if (result == 1) {
            chips('Bug data is successfuly updated', 'chips-success');
            
            let bugToUpdate = document.querySelector(`tr[data-b_id="${bugId}"]`);
            let cellsToUpdate = bugToUpdate.children;
            cellsToUpdate[0].innerText = bName;
            cellsToUpdate[1].innerText = bDescription;
            cellsToUpdate[2].innerText = status;
            cellsToUpdate[4].innerText = bUpdate;

            closeModal();
        } else {
            chips('Update error', 'chips-error');
        }
    }
    
    ajax('core/update_bug_data.php', 'post', updBugRespHandler, updatedData);
}