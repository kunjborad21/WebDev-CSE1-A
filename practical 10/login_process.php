<?php
// Practical 10: check email + password and start a session.

session_start();
include 'db.php';

$email = trim($_POST['email']);
$password = $_POST['password'];

// Step 1: find the student with this email
$stmt = mysqli_prepare($conn, "SELECT student_id, name, password, role FROM students WHERE email = ?");
mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt);
mysqli_stmt_bind_result($stmt, $id, $name, $hashedPassword, $role);

if (mysqli_stmt_fetch($stmt)) {

    // Step 2: compare typed password with the hashed password in the database
    if (password_verify($password, $hashedPassword)) {

        // Step 3: new session id after login (stops session fixation attacks)
        session_regenerate_id(true);

        // Step 4: remember who is logged in
        $_SESSION['student_id'] = $id;
        $_SESSION['name'] = $name;
        $_SESSION['role'] = $role;
        $_SESSION['last_activity'] = time();   // used for the timeout

        // Step 5: role based redirect
        if ($role == "admin") {
            header("Location: admin_dashboard.php");
        } else {
            header("Location: student_dashboard.php");
        }
        exit;
    }
}

// wrong email OR wrong password: same message for both (safer)
header("Location: login.html?error=wrong");
exit;
?>
