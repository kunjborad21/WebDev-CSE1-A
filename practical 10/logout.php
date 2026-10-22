<?php
// Practical 10: end the session safely.

session_start();
session_unset();     // remove all session variables
session_destroy();   // destroy the session itself

header("Location: login.html?logout=1");
exit;
?>
