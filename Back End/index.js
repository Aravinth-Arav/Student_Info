const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3017;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'av12345678',
  database: 'student_details'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});
app.use(bodyParser.json());

// POST endpoint to add student details
app.post('/addStudent', (req, res) => {
  const { Id, full_name, age, email, department, phone_number } = req.body;

  if (!Id || !full_name || !age || !email || !department || !phone_number) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const query = 'INSERT INTO student_user (Id, full_name, age, email, department, phone_number) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [Id, full_name, age, email, department, phone_number], (err, result) => {
    if (err) {
      console.error('Error adding student:', err);
      return res.status(500).json({ message: 'Error adding student' });
    }
    return res.status(201).json({ message: 'Student added successfully' });
  });
});

// PUT endpoint to update student details
app.put('/updateStudent/:id', (req, res) => {
  const studentId = req.params.id;
  const { full_name, age, email, department, phone_number } = req.body;
  if (!full_name || !age || !email || !department || !phone_number) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const query = 'UPDATE student_user SET full_name = ?, age = ?, email = ?, department = ?, phone_number = ? WHERE Id = ?';
  db.query(query, [full_name, age, email, department, phone_number, studentId], (err, result) => {
    if (err) {
      console.error('Error updating student:', err);
      return res.status(500).json({ message: 'Error updating student' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    return res.status(200).json({ message: 'Student updated successfully' });
  });
});

// GET endpoint to retrieve all students
app.get('/getStudents', (req, res) => {
  const query = 'SELECT Id, full_name, age, email, department, phone_number FROM student_user';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching students:', err);
      return res.status(500).json({ message: 'Error fetching students' });
    }
    return res.status(200).json(results);
  });
});

// DELETE endpoint to delete a student
app.delete('/deleteStudent/:id', (req, res) => {
  const studentId = req.params.id;
  const query = 'DELETE FROM student_user WHERE Id = ?';
  db.query(query, [studentId], (err, result) => {
    if (err) {
      console.error('Error deleting student:', err);
      return res.status(500).json({ message: 'Error deleting student' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    return res.status(200).json({ message: 'Student deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
