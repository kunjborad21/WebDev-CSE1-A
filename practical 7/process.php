<?php
// Practical 7: this file runs on the SERVER when the form is submitted.

// Step 1: get the values sent from the form
$name = trim($_POST['name']);
$email = trim($_POST['email']);
$mobile = trim($_POST['mobile']);
$course = trim($_POST['course']);
$year = trim($_POST['year']);
$gender = trim($_POST['gender']);
$password = $_POST['password'];
$terms = isset($_POST['terms']) ? "Yes" : "No";

// Step 2: simple server side validation (in case JS was skipped)
$errors = array();

if ($name == "") {
    $errors[] = "Name is required.";
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Email is not valid.";
}

if (!preg_match("/^[0-9]{10}$/", $mobile)) {
    $errors[] = "Mobile number must be 10 digits.";
}

if (strlen($password) < 6) {
    $errors[] = "Password must be at least 6 characters.";
}

// Step 3: if there are errors, stop here and show them
if (count($errors) > 0) {
    echo "<h2>Registration Failed</h2>";
    echo "<ul>";
    foreach ($errors as $error) {
        echo "<li>" . htmlspecialchars($error) . "</li>";
    }
    echo "</ul>";
    echo '<a href="register.html">Go Back</a>';
    exit;
}

// Step 4: clean the data a little before saving (basic sanitize)
$name = htmlspecialchars($name);
$email = htmlspecialchars($email);
$course = htmlspecialchars($course);
$gender = htmlspecialchars($gender);

// Step 5: save the data into a CSV file
// fopen with "a" means "append" - add new row without deleting old ones
$file = fopen("submissions.csv", "a");

// if the file is empty, write the header row first
if (filesize("submissions.csv") == 0) {
    fputcsv($file, array("Name", "Email", "Mobile", "Course", "Year", "Gender", "Terms"));
}

fputcsv($file, array($name, $email, $mobile, $course, $year, $gender, $terms));
fclose($file);

// Step 6: show success message
echo "<h2>Registration Successful!</h2>";
echo "<p>Welcome, " . $name . "</p>";
echo '<a href="register.html">Back to Registration Page</a>';
?>
