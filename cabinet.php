<?php
    //var_dump($_COOKIE);
    if ( !isset($_COOKIE['email']) OR trim($_COOKIE['email']) ==''){
        header("Location: index.html");
        exit; 
    }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="shortcut icon" href="favicon.png" type="image/png">
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!--Import materialize.css-->
    <link type="text/css" rel="stylesheet" href="node_modules/materialize-css/dist/css/materialize.min.css"  media="screen,projection"/>

    <link type="text/css" rel="stylesheet" href="css/style.css"/>
    <link type="text/css" rel="stylesheet" href="css/modal.css"/>
    <link type="text/css" rel="stylesheet" href="css/chips.css"/>
    <title>Track Your Bugs Cabinet</title>
</head>

<body>
    <div class="container">
        <a href="#" data-target="nav-mobile" class="top-nav sidenav-trigger waves-effect waves-light circle hide-on-large-only">
            <i class="material-icons">menu</i>
        </a>
    </div>
    <nav id="nav-mobile" class="sidenav sidenav-fixed">
        <div class="center-align">
            <h1 class="user-cabinet-header">Track Your Bugs</h1>
        </div>
        <ul>
            <li><a class="waves-effect waves-teal" id="nav_projects" href="#">Projects</a></li>
            <li><a class="waves-effect waves-teal" id="nav_user-information" href="#">User Information</a></li>
        </ul>
        <div class="center-align bottom-logout-btn">
            <button class="btn waves-effect waves-light" id="logout">
                Logout
            </button>
        </div>
    </nav>
    <main>
        <!-- projects container -->
        <div class="container" id="projects">
            <!-- projects Header -->
            <div class="row">
                <div class="col s12 center-align">
                    <h2 class="user-cabinet-header">Projects</h2>
                </div>
            </div>
            <!--/ projects Header -->
            <!-- projects Create -->
            <div class="row">
                <div class="input-field col l4 s4">
                    <input type="text" maxlength=25 name="p_name" id="project-name">
                    <label for="project-name">Project name</label>
                </div>
            
                <div class="input-field col l8 s8">
                    <textarea name="p_description" id="project-description" class="materialize-textarea"></textarea>
                    <label for="project-description">Project description</label>
                </div>
                <div class="col l12 s12 center">
                    <button class="btn waves-effect waves-light" id="project-create">
                        Create
                        <i class="material-icons right">done</i>
                    </button>
                </div>
            </div>
            <!--/ projects Create -->
            <!-- projects List -->
            <div class="row" id="projects-list">

            </div>
            <!--/ projects List -->
        </div>
        <!--/ projects container -->
        <!-- bugs container -->
        <div class="container hide" id="project-bugs">
            <!-- buds Header -->
            <div class="row">
                <div class="col s1 offset-s1">
                    <button class="back-btn waves-effect waves-light">
                        <i class="material-icons center">arrow_back</i>
                    </button>
                </div>
                <div class="col l10 s10 center-align">
                    <h2 class="user-cabinet-header" id="bugs-header"></h2>
                </div>
            </div>
            <!--/ bugs Header -->
            <!-- bugs add -->
            <div class="row">
                <div class="input-field col l4 s4">
                    <input type="text" maxlength=50 name="b_name" id="bug-name">
                    <label for="bug-name">Bug name</label>
                </div>
            
                <div class="input-field col l8 s8">
                    <textarea name="b_description" id="bug-description" class="materialize-textarea"></textarea>
                    <label for="bug-description">Bug description</label>
                </div>
                <div class="col l12 s12 center">
                    <button class="btn waves-effect waves-light" id="bug-add">
                        Add bug
                        <i class="material-icons right">done</i>
                    </button>
                </div>
            </div>
            <!--/ bugs add -->
            <!-- bugs Table -->
            <div class="row">
                <div class="col s12">
                    <table class="highlight">
                        <thead>
                        <tr class="table-head-row">
                            <th>Bug</th>
                            <th>Bug description</th>
                            <th>Status</th>
                            <th>Created</th>
                            <th>Updated</th>
                        </tr>
                        </thead>

                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
            <!--/ bugs Table -->
            <!-- Modal window of bug edition -->
            <div class="modal-wrap hide" id="bug-update-form">
                <div class="modal-window" style="width: fit-content;">
                    <div class="row">
                        <div class="col s12 right-align">
                            <button class="modal-close btn-small waves-effect waves-teal btn-flat circle">
                                <i class="material-icons tiny center">close</i>
                            </button>
                        </div>
                    </div>
                    <form>
                        <div class="row">
                            <div class="input-field col s12">
                                <input name="bug-name" id="modal-bug-name" type="text" maxlength="50">
                                <label class="active" for="modal-bug-name">Bug name</label>
                            </div>
                            <div class="input-field col s12">
                                <textarea name="bug-descr" id="modal-bug-descr" class="materialize-textarea"></textarea>
                                <label class="active" for="modal-bug-descr">Bug description</label>
                            </div>
                            <div class="col s12">
                                <p>Status</p>
                                <p>
                                    <label>
                                        <input name="status" type="radio" value="Open" class="modal-bug-status"/>
                                        <span>Open</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <input name="status" type="radio" value="Fixed" class="modal-bug-status"/>
                                        <span>Fixed</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <input name="status" type="radio" value="Closed" class="modal-bug-status"/>
                                        <span>Closed</span>
                                    </label>
                                </p>
                            </div>
                            <div class="col s12 center-align">
                                <button class="btn waves-effect waves-light" id="modal-bug-update">
                                    Update
                                    <i class="material-icons right">done</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <!--/ Modal window of bug edition -->
        </div>
        <!--/ bugs container -->
        <!-- user-information container -->
        <div class="container hide" id="user-information">
            <!-- user-information Header -->
            <div class="row">
                <div class="col s12 center-align">
                    <h2 class="user-cabinet-header">User Information</h2>
                </div>
            </div>
            <!--/ user-information Header -->
            <!-- user-information Update Form -->
            <div class="row">
                <div class="col s12">
                    <form>
                        <div class="row">
                            <div class="input-field col s6">
                                <input type="text" name="name" id="change-name">
                                <label for="change-name" class="active">Name</label>
                            </div>
                        
                            <div class="input-field col s6">
                                <input type="password" name="pass" id="change-pass">
                                <label for="change-pass" class="active">Password</label>
                            </div>

                            <div class="input-field col s12">
                                <input type="text" name="birthday" id="change-birthday" class="datepicker">
                                <label for="change-birthday" class="active">Birthday</label>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col s12">
                                <p>Sex</p>
                                <p>
                                    <label>
                                        <input type="radio" name="sex" value="male" class="change-sex">
                                        <span>Male</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <input type="radio" name="sex" value="female" class="change-sex">
                                        <span>Female</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <input type="radio" name="sex" value="other" class="change-sex">
                                        <span>Other</span>
                                    </label>
                                </p>
                            </div>
                        </div>
                        <div class="col s12 center-align">
                            <button class="btn waves-effect waves-light" id="change-submit">
                                Update
                                <i class="material-icons right">done</i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <!--/ user-information Update Form -->
        </div>
        <!--/ user-information container -->
    </main>

    <script src="script/ajax.js"></script>
    <script src="script/cabinet_navigation.js"></script>
    <script src="script/get_user_data.js"></script>
    <script src="script/projects.js"></script>
    <script src="script/bugs_listing.js"></script>
    <script src="script/logout.js"></script>
    <script src="script/chips.js"></script>
    <script src="script/modal.js"></script>
    <!--JavaScript at end of body for optimized loading-->
    <script type="text/javascript" src="node_modules/materialize-css/dist/js/materialize.min.js"></script>
</body>

</html> 