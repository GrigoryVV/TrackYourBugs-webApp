// Ajax request to get projects from database
let progressBar = document.createElement('div');
progressBar.classList.add('progress');
progressBar.innerHTML = '<div class="indeterminate"></div>';

document.querySelector('#projects-list').after(progressBar);

ajax('core/get_projects.php', 'post', getProjects, {});


// Function that processes the respond from server and creates project cards on the page
function getProjects(result) {
    result = JSON.parse(result);
    document.querySelector('.progress').remove();
    let projectContainer = document.querySelector('#projects-list');

    if (result == 0) return;

    for (let projectExample of result) {

        let projectCard = document.createElement('div');

        projectCard.classList.add('col', 'xl4', 's6', 'projects-wrap');

        projectCard.innerHTML = `
        <div data-p_id="${projectExample.p_id}" class="hoverable project-example">
            <p class="bold-text">${projectExample.p_name}</p>
            <p class="descr-text">${projectExample.p_description}</p>
            <p class="small-text">${projectExample.p_date} ${projectExample.p_creator}</p>
        </div>`;

        projectContainer.append(projectCard);
    }
}

// onclick event that adds new projects into database
document.querySelector('#project-create').onclick = function(event) {
    event.preventDefault();

    let pName = document.querySelector('#project-name').value;
    let pDescription = document.querySelector('#project-description').value;
    let pDate = new Date();
    pDate = `${pDate.getUTCFullYear()}-${pDate.getUTCMonth()}-${pDate.getUTCDate()} ${pDate.getUTCHours()}:${pDate.getUTCMinutes()}:${pDate.getUTCSeconds()}`;
    let pCreator = userEmail;
    
    let data = {
        "p_name" : pName,
        "p_description" : pDescription,
        "p_date" : pDate,
        "p_creator" : pCreator
    };
    // Function that processes server respond for creating project ajax request
    function createProject(result) {
        result = JSON.parse(result);
        let newProjectId = result.p_id;

        if (result == 2) {
            chips('Fill all fields', 'chips-info');
        } else if (result.p_id > 0) {
            chips("Project is created!", 'chips-success');

            let projectContainer = document.querySelector('#projects-list');
            let projectCard = document.createElement('div');
            
            projectCard.classList.add('col', 'xl4', 's6', 'projects-wrap');
            projectCard.innerHTML = `<div data-p_id="${newProjectId}" class="hoverable project-example"><p class="bold-text">${pName}</p><p class="descr-text">${pDescription}</p><p class="small-text">${pDate} ${pCreator}</p></div>`;
            
            projectContainer.append(projectCard);

            document.querySelector('#project-name').value = '';
            document.querySelector('#project-description').value = '';
            M.textareaAutoResize(document.querySelector('#project-description'));
            
        } else {
            chips('Something goes wrong :(', 'chips-error');
        }
    }
        
    ajax('core/create_project.php', 'post', createProject, data);
};