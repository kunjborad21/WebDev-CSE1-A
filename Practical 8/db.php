<?php
// Practical 8: this file connects our website to the MySQL database.
// Every PHP file that needs the database will "include" this file.

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "studenthub_db";

$conn = mysqli_connect($host, $user, $pass, $dbname);

// if connection fails, stop and show a clear message
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
