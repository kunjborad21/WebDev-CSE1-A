<?php
// Practical 10: include this at the top of every page that needs login.

session_start();

$timeout = 900;   // 900 seconds = 15 minutes. Use 30 while testing to see the timeout quickly.

// 1. not logged in? send to login page
if (!isset($_SESSION['student_id'])) {
    header("Location: login.html?error=login");
    exit;
}

// 2. logged in but idle for too long? log them out
if (time() - $_SESSION['last_activity'] > $timeout) {
    session_unset();
    session_destroy();
    header("Location: login.html?timeout=1");
    exit;
}

// 3. still active, so reset the idle timer
$_SESSION['last_activity'] = time();
?>
