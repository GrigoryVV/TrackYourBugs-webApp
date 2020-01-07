<?php
require_once 'config.php';

$p_name = trim($_POST['p_name']);
$p_description = trim($_POST['p_description']);
$p_date = trim($_POST['p_date']);
$p_creator = trim($_POST['p_creator']);

if ($p_name =='' OR $p_description=='' OR $p_date=='' OR $p_creator==''){
    echo 2;
    die;
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO projects (p_name, p_description, p_date, p_creator) VALUES ('".$p_name."', '".$p_description."', '".$p_date."', '".$p_creator."')";

if ($conn->query($sql) === TRUE) {
    $sql_2 = "SELECT p_id FROM projects WHERE p_name='".$p_name."' and p_date='".$p_date."'";
    $result = $conn->query($sql_2);

    if ($result->num_rows > 0) {
        // output data of each row
        $row = $result->fetch_assoc();
        echo json_encode($row);
    } else {
        echo "0";
    }
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>