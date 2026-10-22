<?php
include 'auth_check.php';

// only admins allowed here
if ($_SESSION['role'] != "admin") {
    echo "<h2>Access Denied</h2><p>Only admins can open this page.</p>";
    echo "<a href='student_dashboard.php'>Go to Student Dashboard</a>";
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin Dashboard</title>
<style>
body { font-family: Arial; margin: 0; background-color: #f2f2f2; }
header { background-color: #333; color: white; padding: 15px; display: flex; justify-content: space-between; align-items: center; }
header a { color: white; }
main { background-color: white; padding: 20px; margin: 20px; }
</style>
</head>
<body>

<header>
<h1>Admin Dashboard</h1>
<a href="logout.php">Logout</a>
</header>

<main>
<h2>Welcome, <?php echo htmlspecialchars($_SESSION['name']); ?>!</h2>
<p>You are logged in as: <b><?php echo htmlspecialchars($_SESSION['role']); ?></b></p>
<p>Admin tools (student management, events) will be added in the next practicals.</p>
</main>

</body>
</html>
