<?php
require_once 'config.php';

$b_name = trim($_POST['b_name']);
$b_description = trim($_POST['b_description']);
$b_date = trim($_POST['b_date']);
$b_update = trim($_POST['b_update']);
$b_status = trim($_POST['b_status']);
$b_creator = trim($_POST['b_creator']);
$p_id = trim($_POST['p_id']);

if ($b_name =='' OR $b_description=='' OR $b_date=='' OR $b_update=='' OR $b_status=='' OR $b_creator=='' OR $p_id==''){
    echo 2;
    die;
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO bugs (b_name, b_description, b_date, b_update, b_status, b_creator, p_id) VALUES ('".$b_name."', '".$b_description."', '".$b_date."', '".$b_update."', '".$b_status."', '".$b_creator."', '".$p_id."')";

if ($conn->query($sql) === TRUE) {
    $sql_2 = "SELECT b_id FROM bugs WHERE b_name='".$b_name."' and b_date='".$b_date."'";
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