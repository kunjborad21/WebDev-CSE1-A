-- Practical 10: run this ONCE in phpMyAdmin (studenthub_db > SQL tab > Go)
ALTER TABLE students ADD role VARCHAR(10) NOT NULL DEFAULT 'student';

-- To make yourself an admin: first register normally, then run this
-- (change the email to the one you registered with):
-- UPDATE students SET role = 'admin' WHERE email = 'your@email.com';
