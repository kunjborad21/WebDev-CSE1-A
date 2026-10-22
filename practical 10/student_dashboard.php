<?php
include 'auth_check.php';

// only students allowed here (admins use their own dashboard)
if ($_SESSION['role'] != "student") {
    echo "<h2>Access Denied</h2><a href='admin_dashboard.php'>Go to Admin Dashboard</a>";
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Student Dashboard</title>
<style>
body { font-family: Arial; margin: 0; background-color: #f2f2f2; }
header { background-color: #333; color: white; padding: 15px; display: flex; justify-content: space-between; align-items: center; }
header a { color: white; }
main { background-color: white; padding: 20px; margin: 20px; }
ul { line-height: 1.8; }
</style>
</head>
<body>

<header>
<h1>Student Dashboard</h1>
<a href="logout.php">Logout</a>
</header>

<main>
<h2>Welcome, <?php echo htmlspecialchars($_SESSION['name']); ?>!</h2>
<p>You are logged in as: <b><?php echo htmlspecialchars($_SESSION['role']); ?></b></p>

<ul>
<li><a href="attendance.html">Attendance</a></li>
<li><a href="fees.html">Fees</a></li>
<li><a href="assignment.html">Assignments</a></li>
<li><a href="announcements.html">Announcements</a></li>
</ul>
</main>

</body>
</html>
