<?php
require_once 'config.php';

$p_id= trim($_POST['p_id']);

if ($p_id ==''){
    echo 2;
    die;
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT * FROM bugs WHERE p_id='".$p_id."'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    $array = array();
    while ($row = $result->fetch_assoc()) {
        $array[] = $row;
    }
    echo json_encode($array);
} else {
    echo "0";
}
$conn->close();
?>