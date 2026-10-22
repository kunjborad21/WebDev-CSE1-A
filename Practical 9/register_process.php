<?php
// Practical 9: save the registration into the MySQL database safely.

include 'db.php';   // gives us the $conn connection from Practical 8

// Step 1: get the values from the form
$name     = trim($_POST['name']);
$email    = trim($_POST['email']);
$mobile   = trim($_POST['mobile']);
$course   = trim($_POST['course']);
$year     = trim($_POST['year']);
$password = $_POST['password'];

// Step 2: server side validation (same rules as the JavaScript)
$errors = array();

if (!preg_match("/^[a-zA-Z ]{3,30}$/", $name)) {
    $errors[] = "Name must be 3-30 letters.";
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Email is not valid.";
}
if (!preg_match("/^[0-9]{10}$/", $mobile)) {
    $errors[] = "Mobile number must be 10 digits.";
}
if ($course == "" || $year == "") {
    $errors[] = "Please select course and year.";
}
if (strlen($password) < 6) {
    $errors[] = "Password must be at least 6 characters.";
}

// Step 3: if validation failed, show errors and stop
if (count($errors) > 0) {
    echo "<h2>Registration Failed</h2><ul>";
    foreach ($errors as $error) {
        echo "<li>" . htmlspecialchars($error) . "</li>";
    }
    echo "</ul><a href='register.html'>Go Back</a>";
    exit;
}

// Step 4: duplicate email check
// the ? is a placeholder, it keeps the query safe from SQL injection
$check = mysqli_prepare($conn, "SELECT student_id FROM students WHERE email = ?");
mysqli_stmt_bind_param($check, "s", $email);
mysqli_stmt_execute($check);
mysqli_stmt_store_result($check);

if (mysqli_stmt_num_rows($check) > 0) {
    echo "<h2>Registration Failed</h2>";
    echo "<p>This email is already registered.</p>";
    echo "<a href='register.html'>Go Back</a>";
    exit;
}

// Step 5: hash the password (never store the real password)
$hashed = password_hash($password, PASSWORD_DEFAULT);

// Step 6: insert the new student
$insert = mysqli_prepare($conn,
    "INSERT INTO students (name, email, mobile, course, year, password) VALUES (?, ?, ?, ?, ?, ?)");
mysqli_stmt_bind_param($insert, "ssssis", $name, $email, $mobile, $course, $year, $hashed);

if (mysqli_stmt_execute($insert)) {
    echo "<h2>Registration Successful!</h2>";
    echo "<p>Welcome, " . htmlspecialchars($name) . "</p>";
    echo "<a href='login.html'>Go to Login</a>";
} else {
    echo "<h2>Something went wrong.</h2>";
    echo "<a href='register.html'>Go Back</a>";
}
?>
