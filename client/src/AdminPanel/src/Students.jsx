import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'


function Students() {
  const [students, setStudents] = useState([]);
  const handleCall = (mobileNumber) => {
    window.location.href = `tel:${mobileNumber}`;
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <ul className="excel-list">
    <h1>Student Information</h1>
  <li className="header">
    <span className="cell">Name</span>
    <span className="cell">Roll No</span>
    <span className="cell">Mobile</span>
    <span className="cell">Email</span>
  </li>
  {Array.isArray(students) && students.map((student, index) => (
    <li key={index} className="row">
      <span className="cell">{student.name}</span>
      <span className="cell">{student.rollno}</span>
      <span className="cell" onClick={() => handleCall(student.mobile)}>
            {student.mobile}
          </span>
      <span className="cell">{student.email}</span>
    </li>
  ))}
</ul>

  );
}

export default Students;