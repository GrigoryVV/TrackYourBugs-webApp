<?php
require_once 'config.php';

$b_id= trim($_POST['b_id']);
$b_name= trim($_POST['b_name']);
$b_description= trim($_POST['b_description']);
$b_update= trim($_POST['b_update']);
$b_status= trim($_POST['b_status']);

if ($b_id ==''){
    echo 2;
    die;
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "UPDATE bugs SET b_name='".$b_name."', b_description='".$b_description."', b_update='".$b_update."', b_status='".$b_status."' WHERE b_id='".$b_id."'";

if ($conn->query($sql) === TRUE) {
    echo 1;
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
?>